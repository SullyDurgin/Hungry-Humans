import { Review } from '../models/review.js'


function index(req, res) {
	Review.find({})
		.then((reviews) => {
			res.render('reviews/index', {
				reviews,
				title: 'list',
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect(`/reviews/${req.user.review._id}`)
		})
}



function createReview(req, res) {
	Review.findById(req.user.review._id)
		.then((review) => {
			review.reviews.push(req.body)
			review.save().then(() => {
				res.redirect(`/reviews/${req.user.review._id}`)
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect(`/reviews/${req.user.review._id}`)
		})
}

function deleteReview(req, res) {
	Review.findById(req.user.review._id)
		.then((review) => {
			review.reviews.remove({ _id: req.params.id })
			review.save().then(() => {
				res.redirect(`/reviews/${req.user.review._id}`)
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect(`/reviews/${req.user.review._id}`)
		})
}

export {index, createReview, deleteReview }