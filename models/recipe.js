import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
	name: String,
	ingredients: String,
	instructions: String,
	owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
	reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
})

const Recipe = mongoose.model('recipe', recipeSchema)

export { Recipe }
