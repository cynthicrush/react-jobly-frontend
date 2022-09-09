import React from "react";
import CompanyCard from "./CompanyCard";

function CompanyList({ companies }) {
    return (
        <div className="CompanyList">
            {companies.map(c => (
                <CompanyCard
                    key={c.handle}
                    handle={c.handle}
                    name={c.name}
                    description={c.description}
                    logoUrl={c.logoUrl}
                />
            ))}
        </div>
    )
}

export default CompanyList
