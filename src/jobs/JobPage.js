import React, { useEffect, useState } from "react";
import JoblyApi from "../api/Api";
import JobList from "./JobList";
import SearchForm from "../SearchForm";

function JobPage() {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        async function getJobs() {
            let jobs = await JoblyApi.getAllJobs()
            setJobs(jobs)
        }
        getJobs()
    })

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title)
        setJobs(jobs)
    }

    return (
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm content={search} />
            {jobs.length
                ? <JobList jobs={jobs} />
                : <p className="lead">Sorry! No results.</p>
            }
        </div>
    )
}

export default JobPage
