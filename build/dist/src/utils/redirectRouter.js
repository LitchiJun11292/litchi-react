import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default ({ to }) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
};
//# sourceMappingURL=redirectRouter.js.map