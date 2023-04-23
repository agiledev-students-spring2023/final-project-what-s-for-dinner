import React from "react";
import "./UtensilThumb.css";
import { Card, CardContent } from "@mui/material";

const UtensilThumb = (props) => {
  return (
    <article className="UtensilThumb">
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: (theme) => theme.spacing(3),
        }}
      >
        <div
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Card
            sx={{
              flexBasis: "calc(50% - 2%)",
              marginBottom: "20px",
            }}
          >
            <CardContent>
              <div
                sx={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: (theme) => theme.spacing(2),
                }}
              >
                {props.details.utensil_title}
              </div>
              <img
                src={props.details.image_url}
                alt={props.details.utensil_title}
              />
              <div
                sx={{
                  fontSize: 14,
                  marginBottom: (theme) => theme.spacing(2),
                }}
              >
                {props.details.description}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
};

export default UtensilThumb;
