import React, { useState, useEffect } from "react";
import "./UtensilThumb.css";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import Img1 from './images/img1.jpeg';
import Img2 from './images/img2.jpeg';
import Img3 from './images/img3.jpeg';
import Img4 from './images/img4.jpeg';
import Img5 from './images/img5.jpeg';
import Img6 from './images/img6.jpeg';
import Img7 from './images/img7.jpeg';
import Img8 from './images/img8.jpeg';
import Img9 from './images/img9.jpeg';
import Img10 from './images/img10.jpeg';

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
  const [cards, setCards] = useState([
    {
      img: Img4,
      title: props.details.utensil_name,
      description: props.details.utensil_description
    },
    {
      img: Img2,
      title: props.details.utensil_name,
      description: props.details.utensil_description
    },
    {
      img: Img3,
      title: props.details.utensil_name,
      description: props.details.utensil_description
    }
  ]);
  
  const classes = useStyles();
  
  const handleCardClick = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };
  
  return (
    <article className="UtensilThumb">
      <div className={classes.root}>
        <div className={classes.cardContainer}>
          {cards.map((card, index) => (
            <Card key={index} className={classes.card} onClick={() => handleCardClick(index)}>
              <CardContent>
                <div className={classes.cardTitle}>
                  {card.title}
                </div>
                <img
                  src={card.img}
                  alt={card.title}
                />
                <div className={classes.cardContent}>
                  {card.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </article>
  );
};

// make this function available to be imported into another module
export default UtensilThumb;