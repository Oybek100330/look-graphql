import { users } from '#data/users.js'
import { orders } from '#data/orders.js'
import { foods } from '#data/foods.js'

export default {
	addFood: (_, { foodName, foodImg }) => {

		try {
			let newFood = {
				food_id: foods.length + 1,
				food_name: foodName,
				food_img: foodImg
			}

			foods.push(newFood)

			return {
				status: 200,
				message: "The food has succesfully added!",
				data: newFood
			}
		} catch(error) {
			return {
				status: 400,
				message: error.message
			}
		}
	},

	changeFood: (_, { foodId, foodName }) => {
		try {
			let found = foods.find(food => food.food_id == foodId)
			if(!found) throw new Error("There is no such order!")

			found.food_name = foodName

			return {
				status: 200,
				message: "The food has succesfully updated!",
				data: found
			}
		} catch(error) {
			return {
				status: 400,
				message: error.message
			}
		}
	},

	deleteFood: (_, { foodId }) => {
		try {
			let index = foods.findIndex(food => food.food_id == foodId)
			if(index == -1) throw new Error("There is no such order!")

			let deletedFood = foods.splice(index, 1)

			return {
				status: 200,
				message: "The order has succesfully deleted!",
				data: deletedFood
			}

		} catch(error) {
			return {
				status: 400,
				message: error.message
			}
		}
	},

	Query: {
		foods: (_, { foodId }) => {
			return foods.filter(food => foodId ? food.food_id == foodId : true)
		},
	},

	Food: {
		foodId:   parent => parent.food_id,
		foodName: parent => parent.food_name,
		foodImg:  parent => parent.food_img,
	},
}