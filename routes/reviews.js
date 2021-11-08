import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', reviewsCtrl.index)

router.post('/:id/reviews', isLoggedIn, reviewsCtrl.createReview)

router.delete('/reviews/:id', isLoggedIn, reviewsCtrl.deleteReview)

export { router }