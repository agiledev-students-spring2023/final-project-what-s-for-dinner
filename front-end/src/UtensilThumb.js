import React,  { useState, useEffect } from "react";
import "./UtensilThumb.css";
import { makeStyles } from "@material-ui/core/styles";
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
const UtensilThumb = (props) => {
  
  const classes = useStyles();

  return (
    <article className="UtensilThumb">
      <div className={classes.root}>
        <div className={classes.cardContainer}>
              <Card className={classes.card}>
                <CardContent>
                    <div className={classes.cardTitle}>
                      {props.details.recipe_title}
                    </div>
                      <img
                        src={item1.strMealThumb}
                        alt={props.details.recipe_title}
                      />
                    <div className={classes.cardContent}>
                      {props.details.recipe_description}
                    </div>
                </CardContent>
              </Card>

            <Card className={classes.card}>
              <CardContent>
                  <div className={classes.cardTitle}>
                    {props.details.recipe_title}
                  </div>
                    <img
                      src={item2.strMealThumb}
                      alt={props.details.recipe_title}
                    />
                  <div className={classes.cardContent}>
                    {props.details.recipe_description}
                  </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </article>
  );
};

// make this function available to be imported into another module
export default UtensilThumb;