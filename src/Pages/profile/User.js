import React, { useState, useEffect } from 'react';
import './user.css'; // Ensure the file path is correct
import profileImage1 from '../../assets/img/userAvatar/1.jpg'; // Sample profile images
import profileImage2 from '../../assets/img/userAvatar/2.jpg'; // Sample profile images
import profileImage3 from '../../assets/img/userAvatar/3.jpg'; // Sample profile images
import profileImage4 from '../../assets/img/userAvatar/4.jpg'; // Sample profile images
import profileImage5 from '../../assets/img/userAvatar/5.jpg'; // Sample profile images
import profileImage6 from '../../assets/img/userAvatar/6.jpg'; // Sample profile images
import profileImage7 from '../../assets/img/userAvatar/7.jpg'; // Sample profile images
import profileImage8 from '../../assets/img/userAvatar/8.jpg'; // Sample profile images
import { useSelector, useDispatch } from "react-redux";
import { updateProfileImage } from '../../store/slices/user';

function User() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser.currentUser);
    const profileImage = useSelector(state => state.currentUser.profileImage);

    const [editMode, setEditMode] = useState(false);
    const [age, setAge] = useState('24');
    const [email, setEmail] = useState(currentUser ? currentUser.email : ''); // Use email from Redux store
    const [phone, setPhone] = useState('01013378866');
    const [totalScore, setTotalScore] = useState('20');
    const [selectedImage, setSelectedImage] = useState(profileImage || profileImage1); // Default profile image or from Redux

    useEffect(() => {
        if (currentUser) {
            setEmail(currentUser.email); // Update email state when currentUser changes
        }
    }, [currentUser]);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleImageChange = (image) => {
        setSelectedImage(image);
        dispatch(updateProfileImage(image)); // Update profile image in Redux
    };

    return (
        <div className="Appp">
            <main className="contentt">
                <div className="cardd">
                    <section className="left-sectionn">
                        <div className="photoo">
                            <img src={selectedImage} alt="Profile" />
                            {editMode && (
                                <div className="image-selectionn">
                                    <p>Choose Profile Avatar:</p>
                                    <div className="image-optionss">
                                        <img
                                            src={profileImage1}
                                            alt="Profile 1"
                                            onClick={() => handleImageChange(profileImage1)}
                                            className="option-imagee"
                                        />
                                        <img
                                            src={profileImage2}
                                            alt="Profile 2"
                                            onClick={() => handleImageChange(profileImage2)}
                                            className="option-imagee"
                                        />
                                        <img
                                            src={profileImage3}
                                            alt="Profile 3"
                                            onClick={() => handleImageChange(profileImage3)}
                                            className="option-imagee"
                                        />
                                        <img
                                            src={profileImage4}
                                            alt="Profile 4"
                                            onClick={() => handleImageChange(profileImage4)}
                                            className="option-imagee"
                                        />
                                        <img
                                            src={profileImage5}
                                            alt="Profile 5"
                                            onClick={() => handleImageChange(profileImage5)}
                                            className="option-imagee"
                                        />
                                        <img
                                            src={profileImage6}
                                            alt="Profile 6"
                                            onClick={() => handleImageChange(profileImage6)}
                                            className="option-imagee"
                                        />
                                        <img
                                            src={profileImage7}
                                            alt="Profile 7"
                                            onClick={() => handleImageChange(profileImage7)}
                                            className="option-imagee"
                                        />
                                        <img
                                            src={profileImage8}
                                            alt="Profile 8"
                                            onClick={() => handleImageChange(profileImage8)}
                                            className="option-imagee"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                    <section className="right-sectionn">
                        <div className="intro-cardd">
                            {editMode ? (
                                <>
                                    <label>Age:</label>
                                    <input
                                        type="text"
                                        value={age}
                                        onChange={handleAgeChange}
                                        className="inputFieldd"
                                    />
                                    <label>Email:</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className="inputFieldd"
                                    />
                                    <label>Phone:</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        className="inputFieldd"
                                    />
                                </>
                            ) : (
                                <>
                                    <p>Player: {currentUser.username}</p>
                                    <div className="personall-info">
                                        <p>Age: {age}</p>
                                        <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
                                        <p>Phone: {phone}</p>
                                        <p>Total Score: {totalScore}</p>
                                    </div>
                                </>
                            )}
                            <button className="buttonn" onClick={toggleEditMode}>
                                {editMode ? 'Save ' : 'Edit Profile'}
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default User;
