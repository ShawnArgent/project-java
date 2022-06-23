import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../util/auth';

const initialFormState = {
  firstName: '',
  lastName: '',
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
          <label class="label" htmlFor="firstName">
            First Name
          </label>
          <div class="control">
            <input
              autoFocus
              disabled={loading}
              class="input"
              id="firstName"
              type="text"
              placeholder="Enter firstName"
              name="firstName"
              value={formState.firstname.value}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="field">
          <label class="label" htmlFor="lastName">
            Last Name
          </label>
          <div class="control">
            <input disabled={loading} class="input" id="lastName" type="lastName" name="lastName" placeholder="Enter lastName" value={formState.password.value} onChange={handleInputChange} />
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
