import React, { useState } from "react";
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    width: 200,
    margin: theme.spacing(2),
    position: "relative",
    border: "2px solid transparent",
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
  const [selected, setSelected] = useState(false);

  const handleUtensilClick = () => {
    if (selected) {
      props.handleDeleteUtensil(props.details.id);
    } else {
      props.handleAddUtensil(props.details.id);
    }
    setSelected(!selected);
  };

  return (
    <article
      className={`UtensilThumb${selected ? " selected" : ""}`}
      onClick={handleUtensilClick}
    >
      <div className={classes.root}>
        <div className={classes.cardContainer}>
          <Card className={classes.card} style={{borderColor: selected ? '#4CAF50' : 'transparent'}}>
            <CardContent>
              <div className={classes.cardTitle}>
                {props.details.utensil_title}
              </div>
              <div className="imageWrapper">
                <img
                  src={props.details.image_url}
                  alt={props.details.utensil_title}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
};

export default UtensilThumb;
