import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
	name: String,
	favorite: Boolean,
	owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
})

const Recipe = mongoose.model('recipe', recipeSchema)

export { Recipe }
