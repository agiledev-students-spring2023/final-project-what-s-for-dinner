import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import "./RecipeDetails.css"

const RecipeDetails = prop => {
    const [item, setItem] = useState();
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const {recipeId} = useParams();
    const baseUrl = 'http://localhost:3000';
    const images = '/api/images/';
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
              const response = await fetch(`${baseUrl}/recipes/${recipeId}`);
              const data = await response.json();
              console.log("just data", data);
              console.log("Before setItem(): ", data);
              setItem(data.recipe[0]);
              console.log("After setItem(): ", item);
            } catch (error) {
              console.error(error);
            }
          };
      
          if (recipeId !== " ") {
            fetchRecipe();
          }
    }, [recipeId]);

    useEffect(() => {
        console.log("item after update: ", item);
      }, [item]);

    const handleCommentChange = e => {
        setComment(e.target.value);
    };

    const handleRatingChange = e => {
        setRating(parseInt(e.target.value));
    };

    const handleSubmit = e => {
        e.preventDefault();
        // TODO: submit the comment and rating to the server
        console.log("Comment:", comment);
        console.log("Rating:", rating);
    };

    return(
        <>

        {
            (!item) ? "" : <div className="content">
                <img src={`${baseUrl}${images}${item.Image_Name}.jpg`} alt={item._id} />
                <div className="title">
                    <h1>{item.Title}</h1>   
                </div>
                <div className="ingredients">
                    <h2>Ingredients</h2>
                    {item.Cleaned_Ingredients}
                </div>
                <div className="instructions">
                    <h2>Instructions</h2>
                    <h4>{item.Instructions}</h4>
                </div>

                <div className="comments">
                    <h2>Comments</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="comment">Comment:</label>
                            <textarea 
                                id="comment"
                                name="comment"
                                value={comment}
                                onChange={handleCommentChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating:</label>
                            <input 
                                type="number"
                                id="rating"
                                name="rating"
                                min="0"
                                max="5"
                                value={rating}
                                onChange={handleRatingChange}
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>

            </div>
        }
        </>
    )
}

export default RecipeDetails