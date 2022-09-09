import React, { useEffect, useState } from "react";
import JoblyApi from "../api/Api";
import CompanyList from "./CompanyList";
import SearchForm from "../SearchForm";


function CompanyPage() {
    const [companies, setCompanies] = useState([])

    useEffect(function getCompaniesOnMount() {
        search()
    }, [])

    useEffect(() => {
        async function getCompanies() {
            let companies = await JoblyApi.getAllCompanies()
            setCompanies(companies)
        }
        getCompanies()
    })

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name)
        setCompanies(companies)
    }

    return (
        <div className="CompanyPage col-md-8 offset-md-2">
            <SearchForm content={search} />
            {companies.length
                ? <CompanyList companies={companies} />
                : <p className="lead">Sorry! No results.</p>
            }
            
        </div>
    )
}

export default CompanyPage
