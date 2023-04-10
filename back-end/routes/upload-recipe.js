const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require("multer");

// Set up multer middleware to handle file upload
const upload = multer();

const uploadrecipeFilePath = path.join(__dirname, '../tmp_data/upload-recipe.txt');
  
// Route to upload a recipe
router.post("/upload-recipe", async (req, res) => {
    try {
        const newRecipe = ({
            title: req.body.title,
            description: req.body.description,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients,
            // image: req.file ? req.file.filename : ''
        })
        // const newRecipe = req.body;

        // Save image to disk and add filename to recipe object
        if (req.file) {
            const extension = path.extname(req.file.originalname);
            const filename = `${Date.now()}${extension}`;
            fs.writeFileSync(path.join(__dirname, '../public/images', filename), req.file.buffer);
            newRecipe.image = filename;
        }
        // const image = req.file;
        // if (image) {
        //     const filename = "";
        //     fs.writeFileSync(uploadrecipeFilePath, image.buffer);
        //     newRecipe.image = filename;
        // }

        const fileContent = fs.readFileSync(uploadrecipeFilePath, 'utf-8');
        const recipes = fileContent ? JSON.parse(fileContent) : [];
        recipes.push(newRecipe);
        fs.writeFileSync(uploadrecipeFilePath, JSON.stringify(recipes), 'utf8');
        res.status(200).json({ message: 'Recipe uploaded successfully.' });

        // const recipe = fileContent.split('\n').filter((line) => line.trim() !== '').map(line => JSON.parse(line));
        // fs.writeFileSync(uploadrecipeFilePath, `${fileContent}\n${JSON.stringify(newRecipe)}`, 'utf8');
        // res.status(200).json({ message: 'Recipe uploaded successfully.' });
// });
    } catch (error) {
        console.error('Error Uploading Recipe:', error);
        res.status(500).json({ error: 'Failed to Upload Recipe' });
    }
});
  

module.exports = router;

// const express = require('express');
// const multer  = require('multer');
// const fs = require('fs');

// const app = express();
// const upload = multer();

//  Define endpoint for uploading recipe data
// app.post('/upload-recipe', upload.single('image'), (req, res) => {
//    Get recipe data from request body
//   const recipe = req.body;

//    Save recipe image to disk
//   const image = req.file;
//   if (image) {
//     const filename = `${Date.now()}-${image.originalname}`;
//     fs.writeFileSync(`./uploads/${filename}`, image.buffer);
//     recipe.image = filename;
//   }
