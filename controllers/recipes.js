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
	req.body.owner = req.user.profile._id
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
				}
			)
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
				// the person that created the recipe is trying to edit the recipe
				req.body.review = !!req.body.review
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
				// the person that created the recipe is NOT the person trying to delete the recipe
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

export { index, create, show, edit, update, deleteRecipe as delete, createReview }
