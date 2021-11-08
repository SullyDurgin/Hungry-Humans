import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/recipes - GET
router.get('/', recipesCtrl.index)

// localhost:3000/recipes/:id - GET
router.get('/:id', recipesCtrl.show)

// localhost:3000/recipes/:id/edit
router.get('/:id/edit', recipesCtrl.edit)

// localhost:3000/recipes - POST
router.post('/', isLoggedIn, recipesCtrl.create)

// localhost:3000/recipes/:id - PUT
router.put('/:id', isLoggedIn, recipesCtrl.update)

// localhost:3000/recipes/:id - DELETE
router.delete('/:id', isLoggedIn, recipesCtrl.delete)

router.post('/:id/reviews', isLoggedIn, recipesCtrl.createReview)

export { router }
