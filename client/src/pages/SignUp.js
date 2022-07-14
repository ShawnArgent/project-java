import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../util/mutations';
import { useAuth } from '../util/auth';


function SignUp(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(CREATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    useAuth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

 
  return (
    <div>
      <hr />
      <form className="box" onSubmit={handleFormSubmit}>
        <div className="field">
          <label className="label" htmlFor="firstName">
            First Name
          </label>
          <div className="control">
            <input
            className='input'
              id="firstName"
              type="firstName"
              placeholder="Enter First Name"
              name="firstName"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="lastName">
            Last Name
          </label>
          <div className="control">
            <input className="input" id="lastName" type="lastName" name="lastName" placeholder="Enter Last Name" value={formState.password.value} onChange={handleChange} />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="new-email">
            Email
          </label>
          <div className="control">
            <input className="input" id="new-email" type="email" name="email" placeholder="Enter email"  onChange={handleChange} />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="new-password">
            Password
          </label>
          <div className="control">
            <input className="input" id="new-password" 
            type="password" name="password" 
            placeholder="Enter password" 
             onChange={handleChange} />
          </div>
        </div>

        <div>
          <button className="button is-normal is-info" type="submit">
            Submit
          </button>
        </div>
        <div className="content">
          <p>
            Already have an account? <a href=" /login">Login Here</a>
          </p>
        </div>
      </form>
    </div>
  );
}
export default SignUp;