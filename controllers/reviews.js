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
