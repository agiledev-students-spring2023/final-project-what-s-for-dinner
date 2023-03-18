import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./Recipes.css";

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
    width: "45%",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: theme.spacing(2)
  },
  cardContent: {
    fontSize: 14,
    marginBottom: theme.spacing(2)
  },
}));
const Recipes = (props) => {
  const classes = useStyles();
  const imgSrc = `https://picsum.photos/200?id=${props.id}`
  return (
    <div className={classes.root}>
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardContent>
            <div className={props.recipe_title}></div>
            <div className={classes.cardContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
              est vel velit blandit bibendum vel id dui. Praesent porta massa
              eget mauris maximus, ac aliquet nisi accumsan.
            </div>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.cardTitle}> Taco Salad</div>
            <div className={classes.cardContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed vitae est vel velit blandit bibendum vel id dui.
              Praesent porta massa eget mauris maximus, ac aliquet nisi
              accumsan.
            </div>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.cardTitle}>Kung Pao Chicken</div>
            <div className={classes.cardContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
              est vel velit blandit bibendum vel id dui. Praesent porta massa
              eget mauris maximus, ac aliquet nisi accumsan.
            </div>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.cardTitle}>Kung Pao Chicken</div>
            <div className={classes.cardContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
              est vel velit blandit bibendum vel id dui. Praesent porta massa
              eget mauris maximus, ac aliquet nisi accumsan.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Recipes;