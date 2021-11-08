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


const profileSchema = new mongoose.Schema(
	{
		name: String,
		avatar: String,
		reviews: [reviewSchema]
	},
	{
		timestamps: true,
	}
)

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
