import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../helpers/Alert";

function LoginForm({ login }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [formErrors, setFormErrors] = useState([])
    const history = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        let result = await login(formData)
        if (result.success) {
            history('/companies')
        } else {
            setFormErrors(result.errors)
        }
    }

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(data => ({ ...data, [name]: value}))
    }

    return (
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">Sign Up</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input 
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    name="password"
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

                            <button 
                                type="submit"
                                className="btn btn-primary float-right"
                                onSubmit={handleSubmit}
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
