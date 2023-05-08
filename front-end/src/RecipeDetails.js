import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import "./RecipeDetails.css"

const RecipeDetails = (props) => {
    const [item, setItem] = useState();
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const {recipeId} = useParams();
    const baseUrl = process.env.REACT_APP_SERVER;
    const username = props.user.username;
    const images = '/api/images/';
    const [cleanedIngredients, setCleanedIngredients] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
              const response = await fetch(`${baseUrl}/recipes/${recipeId}`);
              const data = await response.json();
              console.log("just data", data);
              console.log("Before setItem(): ", data);
              setItem(data.recipe[0]);
              console.log("After setItem(): ", item);
              setAverageRating(data.recipe[0].Rating);
              console.log("After setItem(): ", data.recipe[0].Rating);
            } catch (error) {
              console.error(error);
            }
          };
      
          if (recipeId !== " ") {
            fetchRecipe();
          }
    }, [recipeId, baseUrl]);

    useEffect(() => {
        console.log("item after update: ", item);
      }, [item]);

    const handleCommentChange = e => {
        setComment(e.target.value);
    };


    
    useEffect(() => {
      if (item) {
        const ing = item.Cleaned_Ingredients;
        console.log(ing)
        const clean1 = ing.replace(/"/g, ' inches');
        //const jsonString = JSON.stringify(clean1.map(item => item.replace(/"/g, '\\"')));
        //return JSON.parse(jsonString.replace(/'/g, '"'));
        //const cleanedIngredients =jsonString.replace(/'/g, '"');
        console.log(clean1.replace(/'/g, "\""))
        const ingredientsArr = JSON.parse(clean1.replace(/'/g, "\""))
        const ingredientsList = ingredientsArr.map((ingredient) => {
          return ingredient.replace(/"/g, "").replace(/"/g, "\"");
        });
        
        setCleanedIngredients(ingredientsList);
      }
    }, [item]);
    

    const handleRatingChange = e => {
        setRating(parseInt(e.target.value));
    };
    const sendComment = async () => {
        try {
          const response = await fetch(`${baseUrl}/reviews`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipeId: item._id,
              username: username, 
              comment,
              rating,
            }),
          });
          const data = await response.json();
          console.log(data.message); // log the response from the server
          setComment(""); // clear the input fields
          setRating(0);
        } catch (error) {
          console.error(error);
        }
      };
      const handleSaveRecipe = async () => {
        if (!props.user || !props.user.success) {
          alert("Please sign in to save a recipe.");
          return;
        }
        try {
          const response = await fetch(`${baseUrl}/save-recipe/${recipeId}?username=${username}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipeId: item._id,
              username: username,
            }),
          });
          const data = await response.json();
          console.log(data.message); // log the response from the server
        } catch (error) {
          console.error(error);
        }
      }; 
    const handleSubmit = e => {
      if (!props.user || !props.user.success) {
        alert("Please sign in to leave a comment.");
        return;
      }
        e.preventDefault();
        sendComment();
        // TODO: submit the comment and rating to the server
        console.log("User:", username);
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
                  {cleanedIngredients.length > 0 && (
                  <ul>
                    {cleanedIngredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                )}
                </div>
                <div className="instructions">
                    <h2>Instructions</h2>
                    <h4>{item.Instructions}</h4>
                </div>
                <div className="Reviews">
                    <h2>Reviews</h2>
                    <p>Average Rating: {averageRating}</p>
                    {item.Comments.map((comment, index) => (
                        <div key={index}>
                        <h3>{comment.username}</h3>
                        <p>{comment.comment}</p>
                        <p>Rating: {comment.rating}</p>
                        </div>
                    ))}
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

                <div className="add-saved-recipes">
                <button onClick={handleSaveRecipe}>Save Recipe</button>

                </div>

            </div>
        }
        </>
    )
}

export default RecipeDetails