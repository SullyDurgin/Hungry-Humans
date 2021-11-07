import { Recipe } from '../models/recipe.js'

function index(req, res) {
	Recipe.find({})
		.then((recipes) => {
			res.render('recipes/index', {
				recipes,
				title: 'recipe index',
			})
		})
		.catch((error) => {
			console.log(error)
			res.redirect('/recipes')
		})
}

export { index }
