import LoginForm from "@components/Login/LoginForm.jsx";
import "@pages/Login/Login.css";

/**
 * Renders the Login page.
 * @returns {JSX.Element} The Login component.
 */
const Login = () => {
  return (
    <div className="login">
      <LoginForm />
    </div>
  );
};

export default Login;
