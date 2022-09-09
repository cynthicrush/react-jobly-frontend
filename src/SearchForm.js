import React, { useState } from "react";

function SearchForm({ content }) {
    const [seachTerm, setSearchTerm] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        content(seachTerm.trim() || undefined)
        setSearchTerm(seachTerm.trim())
    }

    function handleChange(event) {
        setSearchTerm(event.target.value)
    }

    return(
        <div className="SearchForm mb-4">
            <form className="fomr-inline" onSubmit={handleSubmit}>
                <input 
                    className="form-control form-control-lg flex-grow-1"
                    name='searchTerm'
                    value={seachTerm}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-lg btn-primary">Search</button>
            </form>
        </div>
    )
}

export default SearchForm
