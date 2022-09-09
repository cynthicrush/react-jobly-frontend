import React, { useContext, useState } from "react";
import JoblyApi from "../api/Api";
import UserContext from "../auth/UserContext";
import Alert from "../helpers/Alert";

function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: '',
    })
    const [formErrors, setFormError] = useState([])
    const [saveConfirmed, setSaveConfirmed] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        let data = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        }

        let username = formData.username
        let updateUserProfile

        try{
            updateUserProfile = await JoblyApi.saveProfile(username, data)
        } catch (errors) {
            setFormError(errors)
            return
        }

        setFormData(d => ({...d, password: ''}))
        setFormError([])
        setSaveConfirmed(true)
        setCurrentUser(updateUserProfile)
    }


    function handleChange(event) {
        const { name, value } = event.target
        setFormData(data => ({
            ...data,
            [name]: value,
        }))
        setFormError([])
    }

    return (
        <div className="ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
            <div className="Card">
                <div className="card-body">
                    <form>
                        {saveConfirmed
                            ? <Alert type='success' messages={['Changes saved!']} />
                            : null
                        }
                        <div className="form-group">
                            <label>Username</label>
                            <p className="form-control-plaintext">{formData.username}</p>
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input 
                                name='firstName'
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input 
                                name='lastName'
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                name='email'
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm password to make changes:</label>
                            <input 
                                name='password'
                                type='password'
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {formErrors.length
                            ? <Alert type='danger' messages={formErrors} />
                            : null
                        }

                        <button className="btn btn-primary btn-block mt-4" onClick={handleSubmit}>Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm
