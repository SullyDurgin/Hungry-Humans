import { Profile } from '../models/profile.js'

function index(req, res) {
	Profile.find({})
		.then((profiles) => {
			res.render('profiles/index', {
				profiles,
        title: "Profiles"
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect(`/profiles/${req.user.profile._id}`)
		})
}

function show(req, res) {
	Profile.findById(req.params.id)
		.then((profile) => {
			Profile.findById(req.user.profile._id).then((self) => {
				const isSelf = self._id.equals(profile._id)
				res.render('profiles/show', {
					profile,
					title: `${profile.name}'s Recipes`,
					self,
					isSelf,
				})
    })
  })
		.catch((err) => {
			console.log(err)
			res.redirect(`/profiles/${req.user.profile._id}`)
		})
}

function createReview(req, res) {
	console.log('creating review for', req.params.id)
	console.log(req.body)
	Recipe.findById(req.params.id, function (error, recipe) {
		recipe.tickets.push(req.body)
		recipe.save(function (err) {
			res.redirect(`/recipes/${recipe._id}`)
		})
	}).catch((err) => {
		console.log(err)
		res.redirect(`/recipes/${recipe._id}`)
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

export { index, show, createReview, deleteReview}
