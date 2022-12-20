import { Result } from "antd";

import "./ErrorMessage.css";

const ErrorMessage = () => {
  return (
    <div className="error-message">
      <Result
        status="warning"
        title="There are some problems with your operation."
      />
    </div>
  );
};

export default ErrorMessage;
