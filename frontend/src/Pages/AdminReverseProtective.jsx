import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";

const AdminReverseProtectiveCheck = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isVerifiedAdmin = useSelector((state) => state.user.isVerifiedAdmin);
  
    useEffect(() => {
      if (isVerifiedAdmin) {
        console.log("Admin is verified. Redirecting to home page.");
        navigate('/admin/users'); 
      }
    }, [isVerifiedAdmin, location, navigate]);
  
    return !isVerifiedAdmin ? <>{children}</> : null;
  };
  
  export default AdminReverseProtectiveCheck;
  