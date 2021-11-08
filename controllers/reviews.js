
import { Review } from '../models/review.js'

function index(req, res) {
	Review.find({})
		.then((reviews) => {
			res.render('reviews/index', {
				title: 'Available Reviews',
				reviews,
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/reviews')
		})
}

function newReview(req, res) {
	Review.find({}, function (err, reviews) {
		res.render('reviews/new', {
			title: 'Add Review',
			reviews,
		})
	})
}


function createReview(req, res) {
	Review.findById(req.params.id, function (error, review) {
		review.review.push(req.body)
		console.log(review)
		review.save(function (err) {
			res.redirect(`/reviews/${review._id}`)
		})
	})
}

export {
  index,
  newReview as new,
  createReview,
  
}