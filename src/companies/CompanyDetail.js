import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/Api";
import JobList from "../jobs/JobList";

function CompanyDetail() {
    const { handle } = useParams()
    const [company, setCompany] = useState([])

    useEffect(() => {
        async function getCompany() {
            let company = await JoblyApi.getCompany(handle)
            setCompany(company)
        }
        getCompany()
    }, [handle])

    return (
        <div className="CompanyDetail col-md-8 offset-md-2">
            <h4>HELLO{company.name}</h4>
            <p>{company.description}</p>
            {company ? <JobList jobs={company.jobs} /> : <></>}
        </div>
    )
}

export default CompanyDetail
