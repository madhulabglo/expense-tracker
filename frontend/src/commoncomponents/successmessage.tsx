import React from "react";
import { Alert } from "react-bootstrap";

const SuccessMessage: React.FC = () => {

    // setTimeout(() => setSuccessMessage(null), 10000);
  return (
    <div>
      {/* <Alert
        variant="success"
        onClose={() => setSuccessMessage(null)}
        dismissible
      >
        {successMessage}
      </Alert> */}
    </div>
  );
};
export default SuccessMessage;
