import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../APIs/Config";
import SuccessModal from "../../Components/dashboard/SuccessModal/SuccessModal.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import './SignUp.css';

const nameRegex = /^[a-zA-Z][a-zA-Z0-9-_.]{2,23}$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z\-]+\.)+([a-zA-Z]{3,})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function SignUp() {
    const navigate = useNavigate();
    const [signForm, setSignForm] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [signFormErrors, setSignFormErrors] = useState({
        username: null,
        email: null,
        password: null,
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [error, setError] = useState(null)

    const handleFormChange = (event) => {
        if (event.target.name === 'username') {
            setSignForm({
                ...signForm,
                username: event.target.value
            });

        }
        if (event.target.name === 'email') {
            setSignForm({
                ...signForm,
                email: event.target.value
            });

        }
        if (event.target.name === 'password') {
            setSignForm({
                ...signForm,
                password: event.target.value
            });
        }
    }
    const handleFormErrors = (event) => {
        if (event.target.name === 'username') {
            setSignFormErrors({
                ...signFormErrors,
                username:
                    event.target.value.length === 0
                        ? "This field is required"
                        : !nameRegex.test(event.target.value)
                            ? "Invalid username"
                            : null,
            });
        }
        if (event.target.name === 'email') {
            setSignFormErrors({
                ...signFormErrors,
                email:
                    event.target.value.length === 0
                        ? "This field is required"
                        : !emailRegex.test(event.target.value)
                            ? "Invalid email format"
                            : null,
            });
        }
        if (event.target.name === 'password') {
            setSignFormErrors({
                ...signFormErrors,
                password:
                    event.target.value.length === 0
                        ? "This field is required"
                        : !passwordRegex.test(event.target.value)
                            ? `Password must be at least 8 characters long, contain lowercase, uppercase, 
                            digit, and special characters (@$!%*?&)`
                            : null,
            });
        }
    }
    const handleSubmit = (event) => {
        console.log('Submitting form with data:', signForm);
        event.preventDefault();
        axiosInstance
            .post("/Account/Register", signForm)
            .then((result) => {
                console.log(result);
                setShowSuccessModal(true);
            })
            .catch((error) =>
                console.log(error)
                // setError(error.response)
            );
    }
    return (
        <>
            <h3 className="Mapy">Welcome to Mappy</h3>
            <div className="formDiv">
                <h2 className="mb-4 text-center sign-up">Create Account</h2>
                <form onSubmit={handleSubmit} onClick={handleFormErrors} >
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control py-2" id="username" aria-describedby="username"
                            value={signForm.userName}
                            onChange={(event) => {
                                handleFormChange(event);
                                handleFormErrors(event);
                            }}
                            name="username"
                            required
                        />
                        {signFormErrors.username && (
                            <div className="form-text text-danger">
                                {signFormErrors.username}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control py-2" id="email" aria-describedby="email"
                            value={signForm.email}
                            onChange={(event) => {
                                handleFormChange(event);
                                handleFormErrors(event);
                            }}
                            name="email"
                            required
                        />
                        {signFormErrors.email && (
                            <div className="form-text text-danger">
                                {signFormErrors.email}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control py-2" id="password" aria-describedby="password"
                            value={signForm.password}
                            onChange={(event) => {
                                handleFormChange(event);
                                handleFormErrors(event);
                            }}
                            name="password"
                            placeholder="8+ characters"
                            required
                        />
                        {signFormErrors.password && (
                            <div className="form-text text-danger">
                                {signFormErrors.password}
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <button id="center"
                            type="submit"
                            className="btn btn-primary mt-3 py-2 padBtnSign"
                            disabled={signFormErrors.username || signFormErrors.email || signFormErrors.password ? true : false}>Sign up</button>
                        <></>
                        {error && <div class="alert alert-danger" role="alert">
                            <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "#58151c" }} />&nbsp;&nbsp;{error}
                        </div>}
                    </div>
                </form>
                <hr className="mt-4 mx-5" />
                <h6 className="text-center">Already have an account?&nbsp;<NavLink to="/Login">Login</NavLink></h6>
            </div>
            {showSuccessModal && (
                <SuccessModal
                    show={showSuccessModal}
                    onClose={() => setShowSuccessModal(false)}
                    onLoginClick={() => navigate('/Login')}
                />
            )}
        </>
    )
}
export default SignUp;