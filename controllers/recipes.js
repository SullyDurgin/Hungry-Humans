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

function newRecipe(req, res) {
	res.render('recipes/new', {
		title: 'Add Recipe',
	})
}

function create(req, res) {
	req.body.owner = req.user.profile._id
		req.body.ingredients = req.body.ingredients
			.split(',')
			.map((ingredient) => ingredient.trim())
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
		.populate('owner')
		.exec(function (err, recipe) {
			console.log(recipe)
			console.log(recipe.owner)
			let total = 0
			recipe.reviews.forEach(function (review) {
				total += review.rating
			})
			let averageReviewScore = (total / recipe.reviews.length).toFixed(1)
			res.render('recipes/show', {
				title: `${recipe.name}'s Details`,
				averageReviewScore,
				recipe,
			})
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
			if (recipe.owner.equals(req.user.profile._id)) {
				req.body.ingredients = req.body.ingredients
					.split(',')
					.map((ingredient) => ingredient.trim())
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
			if (recipe.owner.equals(req.user.profile._id)) {
				// the person that created the recipe is trying to delete the recipe
				recipe.delete().then(() => {
					res.redirect('/recipes')
				})
			} else {
				throw new Error('Not Your Recipe to Delete')
			}
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/recipes')
		})
}

function createReview(req, res) {
	console.log('creating review for', req.params.id)
	console.log(req.body)
	Recipe.findById(req.params.id, function (error, recipe) {
		recipe.reviews.push(req.body)
		recipe.save(function (error) {
			res.redirect(`/recipes/${recipe._id}`)
		})
	})
}

function deleteReview(req, res) {
	Profile.findById(req.user.profile._id)
		.then((profile) => {
			profile.Reviews.remove({ _id: req.params.id })
			profile.save().then(() => {
				res.redirect(`/profiles/${req.user.profile._id}`)
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect(`/profiles/${req.user.profile._id}`)
		})
}

function randomRecipe(req, res) {
	console.log('recipe random')
	Recipe.count().exec(function (err, count) {
		let random = Math.floor(Math.random() * count)
		Recipe.findOne()
			.skip(random)
			.exec(function (err, result) {
				res.redirect(302, `/recipes/${result._id}`)
			})
	})
}

export {
	index,
	create,
	show,
	edit,
	update,
	deleteRecipe as delete,
	createReview,
	deleteReview,
	randomRecipe,
	newRecipe as new,
}
