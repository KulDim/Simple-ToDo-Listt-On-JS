import { useState } from "react"

const options = ["all", "complete", "incomplete"]

function Search(){
    const [searchMode, setSearchMode] = useState("all")
    const [search, setSearch] = useState("")

    return <div>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
        <select name="searchMode" id="searchMode" onChange={(e) => setSearchMode(e.target.value)}>
            {options.map((option, id) => {
                return <option key={id} value={option}>{option}</option>
            })}
        </select>
    </div>
}

export default Search