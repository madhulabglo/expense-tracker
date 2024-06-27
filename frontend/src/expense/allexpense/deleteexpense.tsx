import React, { useState } from "react";
import { EditExpenseProps } from "../../types/expenseTypes";

import { useAppDispatch } from "../../redux/hooks/storehooks";
import { deleteExpense } from "../../redux/actions/expenseactions";

const DeleteExpense: React.FC<EditExpenseProps> = ({
  expense,
  setModal,
  triggerapi,
  setTriggerapi,
}) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false);

  const handleNo = () => {
    setModal((prev) => ({ ...prev, delete: false }));
  };

  // const handleYes = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await expenseDeleteApi(
  //       expense?._id,
  //       localstorage_data?.token
  //     );
  //     // setList((prev)=>({...prev,results:prev?.results?.filter((ele)=>ele?._id !== expense?._id)}))
  //     // setList((prev)=>({...prev,results:response?.filter((ele)=>ele?._id !== expense?._id)}))
  //     setTriggerapi(!triggerapi);
  //     setLoading(false);
  //     setModal((prev) => ({ ...prev, delete: false }));
  //   } catch (error) {
  //     console.log(error, "error");
  //     setLoading(false);
  //   }
  // };

  const handleYes = async () => {
    setLoading(true);
    try {
      await dispatch(deleteExpense(expense?._id));
      setModal((prev) => ({ ...prev, delete: false })); // Close the modal
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
        {loading ? "Loading..." : "yes"}
      </button>
      <button className="delete-no-button" onClick={handleNo}>
        No
      </button>
    </div>
  );
};

export default DeleteExpense;
