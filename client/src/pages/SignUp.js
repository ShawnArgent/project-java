import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../util/auth';

const initialFormState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

export default function SignUp() {
  const { isLoggedIn, signup, loading, error } = useAuth();
  const [formState, setFormState] = useState(initialFormState);

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
    signup(formState);
  };

  if (isLoggedIn) {
    // navigate to the home page
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <hr />
      <form class="box" onSubmit={handleSubmit}>
        <div class="field">
          <label class="label" htmlFor="first name">
            First Name
          </label>
          <div class="control">
            <input
              autoFocus
              disabled={loading}
              class="input"
              id="first name"
              type="text"
              placeholder="Enter first name"
              name="first name"
              value={formState.firstname.value}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="field">
          <label class="label" htmlFor="last name">
            Last Name
          </label>
          <div class="control">
            <input disabled={loading} class="input" id="last name" type="last name" name="last name" placeholder="Enter last name" value={formState.password.value} onChange={handleInputChange} />
          </div>
        </div>

        <div class="field">
          <label class="label" htmlFor="new-email">
            Email
          </label>
          <div class="control">
            <input disabled={loading} class="input" id="new-email" type="email" name="email" placeholder="Enter email" value={formState.password.value} onChange={handleInputChange} />
          </div>
        </div>

        <div class="field">
          <label class="label" htmlFor="new-password">
            Password
          </label>
          <div class="control">
            <input disabled={loading} class="input" id="new-password" type="password" name="password" placeholder="Enter password" value={formState.password.value} onChange={handleInputChange} />
          </div>
        </div>

        <div>
          <button class="button is-info" disabled={loading} type="submit">
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
        <div class="content">
          <p>
            Already have an account? <a href=" /login">Login Here</a>
          </p>
        </div>
      </form>
    </div>
  );
}
