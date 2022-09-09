import React, { useContext, useEffect, useState } from "react";
import UserContext from "../auth/UserContext";

function JobCard({ title, salary, equity, companyName, id }) {
    const [applied, setApplied] = useState()
    const { hasAppliedToJob, applyToJob} = useContext(UserContext)

    useEffect(() => {
        setApplied(hasAppliedToJob(id))
    }, [id, hasAppliedToJob])

    async function handleClick(event) {
        event.preventDefault()
        if(hasAppliedToJob(id)) return
        applyToJob(id)
        setApplied(true)
    }

    return (
        <div className="JobCard card">
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
                {companyName}
                <div><small>Salary: {salary}</small></div>
                <div><small>Equity: {equity}</small></div>
                <button 
                    className="btn btn-danger font-weight-bold text-uppsercase float-right"
                    onClick={handleClick}
                    disabled={applied}
                >
                {applied ? 'Applied' : 'Apply'}
                </button>
            </div>
        </div>
    )
} 

export default JobCard
