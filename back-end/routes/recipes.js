const express = require('express');
const axios = require('axios');

const router = express.Router();
router.get("/recipes", async function (req, res) {
  try{
    const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=a"
    );
    res.json(response.data);
  } catch (error){
    console.error(error);
    res.status(500).send("Could not fetch recipes - error");
  }
  
});

module.exports = router;