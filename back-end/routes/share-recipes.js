const express = require("express");
const router = express.Router();
const Recipe = require('../models/recipes.js');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({ storage: storage });


router.post('/', async (req,res) => {
    try{
        const recipe = new Recipe({
            Title: req.body.title,
            Instructions: req.body.instructions,
            Ingredients: req.body.ingredients,
            Image: req.file.path
        })

        await recipe.save();
        res.status(200).json({ message: `Recipe successfully uploaded` });
    }
    catch (error) {
        console.error('Error Uploading Recipe:', error);
        res.status(500).json({ error: 'Failed to Upload Recipe' });
    }

})

module.exports = router;
  
//const bodyParser = require('body-parser');
//const fs = require('fs');
//const path = require('path');
//const uploadrecipeFilePath = path.join(__dirname, '../tmp_data/upload-recipe.txt');
//router.use(bodyParser.json());


// Route to upload a recipe
// router.post("/", async (req, res) => {
//     try {
//         const newRecipe = ({
//             title: req.body.title,
//             description: req.body.description,
//             instructions: req.body.instructions,
//             ingredients: req.body.ingredients,
//             image: req.file ? req.file.filename : ''
//         })
//         // const newRecipe = req.body;

//         // Save image to disk and add filename to recipe object
//         if (req.file) {
//             const extension = path.extname(req.file.originalname);
//             const filename = `${Date.now()}${extension}`;
//             fs.writeFileSync(path.join(__dirname, '../public/images', filename), req.file.buffer);
//             newRecipe.image = filename;
//         }

//         const image = req.file;
//         if (image) {
//             const filename = "";
//             fs.writeFileSync(uploadrecipeFilePath, image.buffer);
//             newRecipe.image = filename;
//         }

//         const fileContent = fs.readFileSync(uploadrecipeFilePath, 'utf-8');
//         const recipes = fileContent ? JSON.parse(fileContent) : [];
//         recipes.push(newRecipe);
//         fs.writeFileSync(uploadrecipeFilePath, JSON.stringify(recipes), 'utf8');
//         res.status(200).json({ message: 'Recipe uploaded successfully.' });

//     } catch (error) {
//         console.error('Error Uploading Recipe:', error);
//         res.status(500).json({ error: 'Failed to Upload Recipe' });
//     }
// });
  



