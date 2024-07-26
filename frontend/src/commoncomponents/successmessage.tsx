import React, { useEffect } from "react";

interface SuccessMessageProps {
  message: string | null | undefined;
  clearMessage: () => void;
  setMessageDisplay: React.Dispatch<React.SetStateAction<boolean>>; 
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  clearMessage,
  setMessageDisplay
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
        setMessageDisplay(false); // Set this after clearing the message
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage, setMessageDisplay]);

  if (!message) return null; 

  return (
    <div className="alert alert-success" role="alert" style={{ marginTop: "10%" }}>
      {message}
    </div>
  );
};

export default SuccessMessage;
