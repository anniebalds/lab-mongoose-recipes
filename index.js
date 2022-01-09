const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {

  //Iteration 3
  Recipe.insertMany(data)
  .then(recipe => {
    recipe.forEach(recipe => console.log(recipe.title));
    modifyRecipe();
    deleteRecipe()
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  
  //Iteration 4
  async function modifyRecipe() {
    try {
      const query = { title: 'Rigatoni alla Genovese' };
      const toUpdate = await Recipe.findOneAndUpdate(
        query, { duration: 100 }, { new: true }
        );
      console.log('Updated: ', toUpdate.title, 'to duration: ', toUpdate.duration);
    } catch (err) {
      console.error(err);
      process.exit();
    }
  }

  //Iteration 5
  async function deleteRecipe() {
    try {
      const deleteRec = await Recipe.deleteOne(
      { title: 'Carrot Cake' }
      ); 
      console.log('deleted? ', deleteRec);
    } catch (err) {
      console.error(err);
      process.exit()
    }
  }