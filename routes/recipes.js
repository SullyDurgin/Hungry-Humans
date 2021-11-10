import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


// localhost:3000/recipes - GET
router.get('/', recipesCtrl.index)

router.get('/random', isLoggedIn, recipesCtrl.randomRecipe)

router.get('/new', isLoggedIn, recipesCtrl.new)

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

router.delete('/:id/reviews', isLoggedIn, recipesCtrl.delete)







export { router }
