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
		recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
	},
	{
		timestamps: true,
	}
)

const Review = mongoose.model('Review', reviewSchema)

export { Review }
