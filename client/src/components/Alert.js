import { Alert } from "antd";

import { useAppContext } from "../context/appContext";

const InputAlert = () => {
    const { alertType, alertText } = useAppContext();

    return <Alert className="alert" message={alertText} type={alertType} />;
};
export default InputAlert;
