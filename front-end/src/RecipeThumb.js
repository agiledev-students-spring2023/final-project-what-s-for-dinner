import React,  { useState, useEffect } from "react";
import "./RecipeThumb.css";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom"
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(3)
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%"
  },
  card: {
    flexBasis: "calc(50% - 2%)",
    marginBottom: "20px"
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: theme.spacing(2)
  },
  cardContent: {
    fontSize: 14,
    marginBottom: theme.spacing(2)
  }
}));
const RecipeThumb = (props) => {
  const [item1, setItem1] = useState();
  const [item2, setItem2] = useState();

  useEffect(() => {
    const getRecipe = async () => {
      const url1 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${52996 + props.details.id}`;
      const url2 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${52770 + props.details.id}`;
    
      const response1 = fetch(url1);
      const response2 = fetch(url2);
    
      Promise.all([response1, response2])
        .then(([res1, res2]) => {
          return Promise.all([res1.json(), res2.json()]);
        })
        .then(([data1, data2]) => {
          setItem1(data1.meals[0]);
          setItem2(data2.meals[0]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }; 
    getRecipe();
  }, []);
  const classes = useStyles();

  return (
    <article className="recipeThumb">
      <div className={classes.root}>
        <div className={classes.cardContainer}>
          {item1 && (
              <Card className={classes.card}>
                <CardContent>
                  <Link to={`/${52996 + props.details.id}`}>
                    <div className={classes.cardTitle}>
                      {props.details.recipe_title}
                    </div>
                    {item1.strMealThumb && (
                      <img
                        src={item1.strMealThumb}
                        alt={props.details.recipe_title}
                      />
                    )}
                    <div className={classes.cardContent}>
                      {props.details.recipe_description}
                    </div>
                  </Link>
                </CardContent>
              </Card>
            )}
          {item2 && (
            <Card className={classes.card}>
              <CardContent>
                <Link to={`/${52770 + props.details.id}`}>
                  <div className={classes.cardTitle}>
                    {props.details.recipe_title}
                  </div>
                  {item1.strMealThumb && (
                    <img
                      src={item2.strMealThumb}
                      alt={props.details.recipe_title}
                    />
                  )}
                  <div className={classes.cardContent}>
                    {props.details.recipe_description}
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </article>
  );
};

// make this function available to be imported into another module
export default RecipeThumb;