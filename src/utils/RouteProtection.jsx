import { Navigate, Outlet } from "react-router-dom";

// Role-Based Protected Route Component
const ProtectedRoute = ({ allowedRoles }) => {
  const jwttoken = localStorage.getItem("jwtToken"); // Check if user is authenticated
  const firebaseToken = localStorage.getItem("firebaseToken"); // Check if user is authenticated
  // const role = localStorage.getItem("authrole"); // Get user role from storage
  // console.log("role in  private route", role);
  // if (!jwttoken || !firebaseToken) {
  //   console.log("token exists ");
  //   return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  // }
  // console.log("checking role after this ");
  // if (!allowedRoles.includes(role)) {
  //   console.log("role not matched");
  //   return <Navigate to="/" replace />; // Redirect unauthorized users
  // }

  return <Outlet />; // Render the requested route if authorized
};
export default ProtectedRoute;
