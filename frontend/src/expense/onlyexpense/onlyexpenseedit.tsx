import React, { useState } from "react";

import {
  onlyExpense,
  onlyExpenseEditProps,
} from "../../types/onlyexpenseTypes";
import { patchOnlyExpense } from "../../redux/actions/onlyexpenseactions";
import { useAppDispatch } from "../../redux/hooks/storehooks";

const OnlyExpenseEdit: React.FC<onlyExpenseEditProps> = ({
  expense,
  setModal,
  // list,
  // setList,
  triggerapi,
  setTriggerapi,
  roommates,
  setSuccessMessage,
  setMessageDisplay
}) => {
  const [editExpense, setEditExpense] = useState<onlyExpense>(expense);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setEditExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMoreFields = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newField = { name: "", amount: "" };
    setEditExpense((prev) => ({
      ...prev,
      amount_details: [...prev.amount_details, newField],
    }));
  };

  const handleMoreFieldsChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditExpense((prev) => {
      const newAmountDetails = [...prev.amount_details];
      newAmountDetails[index] = { ...newAmountDetails[index], [name]: value };
      return { ...prev, amount_details: newAmountDetails };
    });
  };

  const handleDeleteField = (id: number) => {
    setEditExpense((prev) => ({
      ...prev,
      amount_details: prev.amount_details.filter(
        (field, index) => index !== id
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(patchOnlyExpense(editExpense, expense?._id));
      setModal((prev) => ({ ...prev, edit: false })); // Close the modal
      setSuccessMessage(response?.success)
      setMessageDisplay(true)
      setTriggerapi(!triggerapi); // Trigger the fetch action
    } catch (error) {
      console.error("Failed to add expense:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Name <span>*</span>
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          name="name"
          onChange={handleChange}
          required
          style={{ height: "45px" }}
          value={editExpense?.name}
        >
          {roommates?.map((ele) => (
            <option value={ele?.name}>{ele?.name}</option>
          ))}
        </select>
        <label>
          Enter Date <span>*</span>
        </label>
        <input
          name="date"
          id="date"
          placeholder="Enter date"
          type="date"
          onChange={handleChange}
          value={editExpense?.date?.slice(0, 10)}
          required
        />
        <label>
          Enter Description <span>*</span>
        </label>
        <input
          name="description"
          id="description"
          placeholder="Enter description"
          type="text"
          onChange={handleChange}
          value={editExpense?.description}
          required
        />
        <label>
          Enter Amount <span>*</span>
        </label>
        <input
          name="amount"
          id="amount"
          placeholder="Enter amount"
          type="number"
          onChange={handleChange}
          value={editExpense?.amount}
          required
        />
        <div className="more-fields">
          <button
            className="btn btn-text text-success btn-sm float-end"
            onClick={handleMoreFields}
          >
            <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Add
          </button>
        </div>
        {editExpense?.amount_details?.length > 0 &&
          editExpense.amount_details.map((field, index) => (
            <div key={index} className="extra-field">
              <label>Name</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="name"
                onChange={(e) => handleMoreFieldsChange(index, e)}
                style={{
                  height: "45px",
                  marginLeft: "-2rem",
                  width: "60%",
                  display: "flex",
                }}
                value={field?.name}
              >
                {roommates?.map((ele) => (
                  <option value={ele?.name}>{ele?.name}</option>
                ))}
              </select>
              <label>Amount</label>
              <input
                name="amount"
                placeholder="Enter amount"
                type="number"
                onChange={(e) => handleMoreFieldsChange(index, e)}
                value={field.amount}
                required
              />
              <button
                type="button"
                className="btn btn-text text-danger btn-sm float-end"
                onClick={() => handleDeleteField(index)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        <button className="add-expense-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default OnlyExpenseEdit;
