import React from "react"

const Ingredient = ({data}) =>{
    console.log(data);
    return(
        <div>
            <div className="card" key = {data.id} >
                <img src={'https://s3.amazonaws.com/grazecart/michiganfarmtofamily/images/1675868471_63e3b9379576f.JPG'} alt = {data.name} />
                <h2>{data.name}</h2>
                <h3>Possible units: {data.possibleUnits[0]}, {data.possibleUnits[1]}</h3>


            </div>

        </div>
    )
}

export default Ingredient