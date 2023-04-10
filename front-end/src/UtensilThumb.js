import React from "react";
import "./UtensilThumb.css";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(3),
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
  card: {
    flexBasis: "calc(50% - 2%)",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    fontSize: 14,
    marginBottom: theme.spacing(2),
  },
}));

const UtensilThumb = (props) => {
  const classes = useStyles();

  return (
    <article className="UtensilThumb">
      <div className={classes.root}>
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <CardContent>
            <div className={classes.cardTitle}>{props.details.utensil_title}</div>
              <img src={props.details.image_url} alt={props.details.utensil_title} />
              <div className={classes.cardContent}>{props.details.description}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
};

export default UtensilThumb;
