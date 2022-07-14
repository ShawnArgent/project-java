import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../util/auth";
import "../index.css";
const initialFormState = {
  email: "",
  password: "",
};

export default function Login() {
  const { isLoggedIn, login, loading, error } = useAuth();
  const [formState, setFormState] = useState(initialFormState);
  const location = useLocation();

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    login(formState);
  };

  if (isLoggedIn) {
    // navigate to page user was redirected from or the home page.
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <div>
      <hr />
      <form className="box">
        <div className="column is-vcentered" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                disabled={loading}
                id="email"
                type="email"
                name="email"
                placeholder="Enter email"
                value={formState.email.value}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                disabled={loading}
                id="new-password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={formState.password.value}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <button
              className="button is-normal is-info "
              disabled={loading}
              type="submit"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
          <div className="content">
            <p>
              Don't have an account? <a href=" /signup">Sign up Here</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
