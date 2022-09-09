import React from "react";
import { Link } from 'react-router-dom'

function CompanyCard({name, handle, description, logo_url}) {
    return (
        <Link className="CompanyCard card" to={`/companies/${handle}`}>
            <div className="card-body">
                <h6 className="card-title">
                    {name}
                    {logo_url && <img src={logo_url} alt={name} className='float-right ml-5' />}
                </h6>
                <p><small>{description}</small></p>
            </div>
        </Link>
    )
}

export default CompanyCard;
