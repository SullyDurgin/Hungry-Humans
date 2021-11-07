import { Recipe } from '../models/recipe.js'

function index(req, res) {
	Recipe.find({})
		.then((recipes) => {
			res.render('recipes/index', {
				title: 'Available Recipes',
				recipes,
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/recipes')
		})
}

function create(req, res) {
	req.body.author = req.user.profile._id
	req.body.favorite = !!req.body.favorite
	Recipe.create(req.body)
		.then((recipe) => {
			res.redirect('/recipes')
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/recipes')
		})
}

function show(req, res) {
	Recipe.findById(req.params.id)
		.populate('author')
		.then((recipe) => {
			res.render('recipes/show', {
				recipe,
				title: 'Show Recipes',
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/recipes')
		})
}

function unfavorite(req, res) {
	recipe
		.findById(req.params.id)
		.then((recipe) => {
			recipe.favorite = !recipe.favorite
			recipe.save().then(() => {
				res.redirect(`/recipes/${recipe._id}`)
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/recipes')
		})
}

function edit(req, res) {
	Recipe.findById(req.params.id)
		.then((recipe) => {
			res.render('recipes/edit', {
				title: 'Edit Recipe',
				recipe,
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/recipes')
		})
}

function update(req, res) {
	Recipe.findById(req.params.id)
		.then((recipe) => {
			if (recipe.author.equals(req.user.profile._id)) {
				// the person that created the recipe is trying to edit the recipe
				req.body.favorite = !!req.body.favorite
				recipe.updateOne(req.body, { new: true }).then(() => {
					res.redirect(`/recipes/${recipe._id}`)
				})
			} else {
				throw new Error('Not Your Recipe to Edit')
			}
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/recipes')
		})
}

function deleteRecipe(req, res) {
	Recipe.findById(req.params.id)
		.then((recipe) => {
			if (recipe.author.equals(req.user.profile._id)) {
				// the person that created the recipe is trying to delete the recipe
				recipe.delete().then(() => {
					res.redirect('/recipes')
				})
			} else {
				// the person that created the recipe is NOT the person trying to delete the recipe
				throw new Error('Not Your Recipe to Delete')
			}
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/recipes')
		})
}

export { index, create, show, unfavorite, edit, update, deleteRecipe as delete }
