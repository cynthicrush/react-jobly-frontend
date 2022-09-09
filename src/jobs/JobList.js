import React from "react";
import JobCard from "./JobCard";

function JobList({ jobs }) {
    
    return jobs ? (
        <div className="JobList">
            {jobs.map(job => (
                <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                />
            ))}
        </div>
    ) : (<></>)
}

export default JobList
