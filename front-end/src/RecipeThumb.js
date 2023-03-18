import React from "react";
import "./RecipeThumb.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
    justifyContent: "center"
  },
  card: {
    minWidth: 275,
    margin: "1%",
    width: "45%"
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
  const classes = useStyles();
  const imgSrc = `https://picsum.photos/200?id=${props.details.id}`; // tack on this animal's id to the query

  return (
    <article className="recipeThumb">
      <div className={classes.root}>
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.cardTitle}> {props.details.title} </div>
              <img alt={props.details.title} src={imgSrc} />
              <div className={classes.cardContent}>{props.recipe_detail}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
};

// make this function available to be imported into another module
export default RecipeThumb;