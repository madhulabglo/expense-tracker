import React, { useState } from "react";

import { onlyExpenseEditProps } from "../../types/onlyexpenseTypes";
import { useAppDispatch } from "../../redux/hooks/storehooks";
import { deleteOnlyExpense } from "../../redux/actions/onlyexpenseactions";

const OnlyExpensDelete: React.FC<onlyExpenseEditProps> = ({
  expense,
  setModal,
  triggerapi,
  setTriggerapi,
  setSuccessMessage,
  setMessageDisplay
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleNo = () => {
    setModal((prev) => ({ ...prev, delete: false }));
  };

  const handleYes = async () => {
    setLoading(true);
    try {
      const response =await dispatch(deleteOnlyExpense(expense?._id));
      setModal((prev) => ({ ...prev, delete: false })); // Close the modal
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
      <p>Are you sure do you want to delete the expense ?</p>
      <button className="delete-yes-button" onClick={handleYes}>
        {loading ? "Loading.." : "yes"}
      </button>
      <button className="delete-no-button" onClick={handleNo}>
        No
      </button>
    </div>
  );
};

export default OnlyExpensDelete;
