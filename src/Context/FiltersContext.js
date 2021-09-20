// Store selected filters and options
// Store loading state
// Devansh Kaloti
import React, {useState} from "react"
const FiltersContext = React.createContext()

function FiltersContextProvider(props) {
    const [ filtersObj, setFiltersObj ] = useState()
    const [ filtersList2, setFiltersList ] = useState({})
    const [ loading, setLoading ] = useState(true)

    function changeLoading(newVal) {
        setLoading(newVal)
    }

    function updateFiltersList (field, newOptionsList){
        let newFilters = {...filtersList2}
        newFilters[field] = newOptionsList
        setFiltersList(newFilters)
    }

    return (
        <FiltersContext.Provider value={{ filtersObj, setFiltersObj, filtersList2, updateFiltersList, loading, changeLoading}}>
            {props.children}
        </FiltersContext.Provider>
    )
}

export {FiltersContextProvider, FiltersContext}