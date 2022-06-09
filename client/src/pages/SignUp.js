import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../util/auth";

// This signup form is intentionally minimalist to reduce effort required to
// customize it to your app's needs. See the excellent best practices guide for
// sign informs on web.dev https://web.dev/sign-in-form-best-practices/

// TODO: customize styles or import styles with favorite css approach


const initialFormState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const { isLoggedIn, signup, loading, error } = useAuth();
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (error) {
      // TODO: replace window alert with custom alert.
      alert(error);
    }
  }, [error]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    signup(formState);
  };

  if (isLoggedIn) {
    // navigate to the home page
    return <Navigate to="/" replace />
  }
  return (
    <div>
      <hr />
      <form class="box signup-form" onSubmit={handleSubmit}>
        <div class="field">
          <label class="label" htmlFor="firstname" >Firstname</label>
          <div class="control">
          <input
            autoFocus
            disabled={loading}
            class="input"
            id="firstname"
            type="text"
            placeholder="Enter firstname"
            name="firstname"
            value={formState.firstname.value}
            onChange={handleInputChange}
          />
          </div>
        </div>

        <div class="field">
          <label class="label" htmlFor="lastname">Lastname</label>
          <div class="control">
          <input
            autoFocus
            disabled={loading}
            class="input"
            id="lastname"
            type="text"
            placeholder="Enter lastname"
            name="lastname"
            value={formState.lastname.value}
            onChange={handleInputChange}
          />
          </div>
        </div>

        <div class="field">
          <label class="label" htmlFor="email" >Email</label>
          <div class="control">
          <input
            disabled={loading}
            class="input"
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formState.email.value}
            onChange={handleInputChange}
          />
          </div>
        </div>

        <div class="field">
          <label class="label" htmlFor="new-password" >Password</label>
          <div class="control">
          <input
            disabled={loading}
            class="input"
            id="new-password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formState.password.value}
            onChange={handleInputChange}
          />
          </div>
        </div>

        <div >
          <button class="button is-info" disabled={loading} type="submit">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
      <div class=" box signup-p">
        <p>Already have an account? <a href=" /login">Login Here</a></p>
      </div>
    </div>
  
  );
}
