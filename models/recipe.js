import mongoose from 'mongoose'

const Schema = mongoose.Schema


const reviewSchema = new Schema(
	{
		content: String,
		rating: {
			type: Number,
			min: 1,
			max: 5,
			default: 5,
		},
	},
	{
		timestamps: true,
	}
)


const recipeSchema = new Schema({
	name: String,
	ingredients: Array,
	instructions: String,
	image: String,
	owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
	reviews: [reviewSchema],
})


const Recipe = mongoose.model('recipe', recipeSchema)

export { Recipe }
