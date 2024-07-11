import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [loginFormErrors, setLoginFormErrors] = useState({
    email: null,
    password: null,
  });

  const { loading, error, currentUser } = useSelector(state => state.currentUser);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    });
  };

  const handleFormErrors = (event) => {
    const { name, value } = event.target;
    setLoginFormErrors({
      ...loginFormErrors,
      [name]: value.length === 0 ? "This field is required" : null
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(loginForm));
  };

  // Redirect after successful login
  if (currentUser !== null) {
    navigate('/');
  }

  return (
    <>
      <h3 className="Mapy">Welcome to Mappy</h3>
      <div className="formDiv">
        <form onSubmit={handleSubmit} onClick={handleFormErrors}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              className="form-control py-2"
              id="email"
              value={loginForm.email}
              onChange={handleFormChange}
              onBlur={handleFormErrors}
              name="email"
              required
              autoComplete="off"
            />
            <div className="form-text text-danger">
              {loginFormErrors.email}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control py-2"
              id="password"
              value={loginForm.password}
              onChange={handleFormChange}
              onBlur={handleFormErrors}
              name="password"
              required
              autoComplete="off"
            />
            <div className="form-text text-danger">
              {loginFormErrors.password}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary mt-3 py-2 padBtnLog"
              disabled={loginFormErrors.email || loginFormErrors.password || loading}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faCircleNotch} spin />&nbsp;&nbsp;Loading...
                </>
              ) : (
                'Login'
              )}
            </button>
            <br />

            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '5px' }} />
                {error}
              </div>
            )}

          </div>
        </form>

        <hr className="mt-4 mx-5" />
        <h6 className="text-center">Don't have an account?&nbsp;<NavLink to="/SignUp">Sign up</NavLink></h6>
      </div>
    </>
  );
}

export default Login;
