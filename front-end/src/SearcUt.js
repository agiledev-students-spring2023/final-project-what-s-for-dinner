import React, { useState, useEffect } from "react"

const SearchUt = prop => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [keyword, setKeyword] = useState('null');
    const [recipes, setRecipies] = useState([]);
    const [show, setShow] = useState(false);

    const getSearch = e =>{
        e.preventDefault()
        setKeyword(search)
        setSearch('')
    }

    const updateSearch = e =>{
        setSearch(e.target.value)
        console.log(search)
    }

    const getUtensils = async () => {
        axios("https://my.api.mockaroo.com/utensils?key=1fd5b940")
        .then((response) => {
          // extract the data from the server response
          setData(response.data);
          setUtensils(data[keyword-1]);
          setShow(true)
        })
    }


    useEffect(() =>{
        getUtensils();
    }, [keyword]);

    return(
        <div>
            <form onSubmit={getSearch}>
                <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button">
                    Search
                </button>
            </form>
            <div>
                {
                    show ?<Utensils data = {utensils} /> : "Recipe Not Found"
                }
            </div>
        </div>
    )
}

export default SearchUt;