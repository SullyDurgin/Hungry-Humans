import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, reviewsCtrl.index)

router.get('/new', isLoggedIn, reviewsCtrl.new)

router.post('/:id/reviews', isLoggedIn, reviewsCtrl.createReview)

export { router }
