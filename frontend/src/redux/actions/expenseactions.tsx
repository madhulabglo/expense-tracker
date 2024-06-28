// src/features/user/userActions.ts
import { Dispatch } from "redux";
import {
  FETCH_EXPENSE_REQUEST,
  FETCH_EXPENSE_SUCCESS,
  FETCH_EXPENSE_FAILURE,
  POST_EMAIL_REQUEST,
  POST_EMAIL_SUCCESS,
  POST_EMAIL_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  FETCH_PAGINATION_EXPENSE_REQUEST,
  FETCH_PAGINATION_EXPENSE_SUCCESS,
  FETCH_PAGINATION_EXPENSE_FAILURE,
  FETCH_EXPENSE_POST_REQUEST,
  FETCH_EXPENSE_POST_SUCCESS,
  FETCH_EXPENSE_POST_FAILURE,
  FETCH_EXPENSE_PATCH_REQUEST,
  FETCH_EXPENSE_PATCH_SUCCESS,
  FETCH_EXPENSE_PATCH_FAILURE,
  FETCH_EXPENSE_DELETE_REQUEST,
  FETCH_EXPENSE_DELETE_SUCCESS,
  FETCH_EXPENSE_DELETE_FAILURE
} from "../constant/expenseconstant";
import { HTTP } from "../../api/baseurl";
import {
  ExpenseResponse,
  ExpenseResponseWithoutPagination,
  ExpenseFormData,
  Expense,
} from "../../types/expenseTypes";


const localstorage_data = JSON.parse(localStorage.getItem("data") as string);

export const fetchExpenseRequest = () => ({
  type: FETCH_EXPENSE_REQUEST,
});

export const fetchExpenseSuccess = (
  allexpense: ExpenseResponseWithoutPagination
) => ({
  type: FETCH_EXPENSE_SUCCESS,
  payload: allexpense,
});

export const fetchExpenseFailure = (error: string) => ({
  type: FETCH_EXPENSE_FAILURE,
  payload: error,
});

export const fetchExpenseWithoutPagination = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchExpenseRequest());

    try {
      const token = localstorage_data?.token; // Replace with your actual token

      const response = await fetch(`${HTTP}/api/expenses/getallexpense`, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include your token here
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();
      dispatch(fetchExpenseSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(fetchExpenseFailure((error as Error).message));
    }
  };
};

export const fetchPaginationExpenseRequest = () => ({
  type: FETCH_PAGINATION_EXPENSE_REQUEST,
});

export const fetchPaginationExpenseSuccess = (allexpense: ExpenseResponse) => ({
  type: FETCH_PAGINATION_EXPENSE_SUCCESS,
  payload: allexpense,
});

export const fetchPaginationExpenseFailure = (error: string) => ({
  type: FETCH_PAGINATION_EXPENSE_FAILURE,
  payload: error,
});

export const fetchExpenseWithPagination = (
  page: number,
  limit: number,
  fromdate: string,
  todate: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPaginationExpenseRequest());

    try {
      const token = localstorage_data?.token; // Replace with your actual token

      const response = await fetch(
        `${HTTP}/api/expenses/getexpense?page=${page}&limit=${limit}&fromdate=${fromdate}&todate=${todate}`,
        {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include your token here
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();
      dispatch(fetchPaginationExpenseSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(fetchPaginationExpenseFailure((error as Error).message));
    }
  };
};

export const expnesPostRequest = () => ({
  type: FETCH_EXPENSE_POST_REQUEST,
});

export const expensePostSuccess = (expensedata:Expense ) => ({
  type: FETCH_EXPENSE_POST_SUCCESS,
  payload: expensedata,
});

export const expensePostFailure = (error: string) => ({
  type: FETCH_EXPENSE_POST_FAILURE,
  payload: error,
});

export const postExpense = (expensedata: ExpenseFormData) => {
  return async (dispatch: Dispatch) => {
    dispatch(expnesPostRequest());

    try {
      const token = localstorage_data?.token;
      const response = await fetch(`${HTTP}/api/expenses/addexpense`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expensedata),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();
      dispatch(expensePostSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(expensePostFailure((error as Error).message));
    }
  };
};

export const expnesPatchRequest = () => ({
  type: FETCH_EXPENSE_PATCH_REQUEST,
});

export const expensePatchSuccess = (expensedata: Expense) => ({
  type: FETCH_EXPENSE_PATCH_SUCCESS,
  payload: expensedata,
});

export const onlyExpensePatchFailure = (error: string) => ({
  type:FETCH_EXPENSE_PATCH_FAILURE,
  payload: error,
});

export const patchExpense = (expensedata: Expense, id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(expnesPatchRequest());

    try {
      const token = localstorage_data?.token;
      const response = await fetch(`${HTTP}/api/expenses/updateexpense/${id}/`, {
        method: "PATCH",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expensedata),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();
      dispatch(expensePatchSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(onlyExpensePatchFailure((error as Error).message));
    }
  };
};

export const expnesDeleteRequest = () => ({
  type: FETCH_EXPENSE_DELETE_REQUEST,
});

export const expenseDeleteSuccess = (expensedata: Expense) => ({
  type: FETCH_EXPENSE_DELETE_SUCCESS,
  payload: expensedata,
});

export const expenseDeleteFailure = (error: string) => ({
  type: FETCH_EXPENSE_DELETE_FAILURE,
  payload: error,
});

export const deleteExpense = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(expnesDeleteRequest());

    try {
      const token = localstorage_data?.token;
      const response = await fetch(`${HTTP}/api/expenses/deleteexpense/${id}/`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();
      dispatch(expenseDeleteSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(expenseDeleteFailure((error as Error).message));
    }
  };
};


export const postEmailRequest = () => ({
  type: POST_EMAIL_REQUEST,
});

export const postEmailSuccess = (logindata: any) => ({
  type: POST_EMAIL_SUCCESS,
  payload: logindata,
});

export const PostEmailFailure = (error: any) => ({
  type: POST_EMAIL_FAILURE,
  payload: error,
});

export const postEmailAddress = (logindata: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(postEmailRequest());

    try {
      const response = await fetch(`${HTTP}/api/otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(logindata),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();
      dispatch(postEmailSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(PostEmailFailure((error as Error).message));
    }
  };
};

export const postOtpRequest = () => ({
  type: VERIFY_OTP_REQUEST,
});

export const postOtpSuccess = (otpdata: any) => ({
  type: VERIFY_OTP_SUCCESS,
  payload: otpdata,
});

export const postOtpFailure = (error: any) => ({
  type: VERIFY_OTP_FAILURE,
  payload: error,
});

export const postOtpVerification = (loginData: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(postOtpRequest());

    try {
      const response = await fetch(`${HTTP}/api/otp/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData; // Throw the entire error object
      }

      const otpdata = await response.json();
      dispatch(postOtpSuccess(otpdata));
    } catch (error) {
      dispatch(postOtpFailure(error));
    }
  };
};
