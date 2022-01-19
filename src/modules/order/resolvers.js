import { users } from '#data/users.js'
import { orders } from '#data/orders.js'
import { foods } from '#data/foods.js'



export default {
	Mutation: {
		addOrder: (_, { user_id, food_id, count }) => {

			let indexUser = users.findIndex(user => user.user_id == user_id)
			if(indexUser == -1) throw new Error("There is no such user!")
			let indexFood = foods.findIndex( food => food.food_id == food_id)
			if(indexFood == -1) throw new Error("There is no such food!")

			try {
				let newOrder = {
					order_id: orders.length + 1,
					user_id,
					food_id,
					count
				}
	
				orders.push(newOrder)
	
				return {
					status: 200,
					message: "The order has succesfully added!",
					data: newOrder
				}
			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},

		changeOrder: (_, { orderId, foodId, count }) => {
			try {
				let found = orders.find(order => order.order_id == orderId)
				if(!found) throw new Error("There is no such order!")

				let indexFood = foods.findIndex( food => food.food_id == foodId)
				if(indexFood == -1) throw new Error("There is no such food!")

				found.food_id = foodId
				found.count = count
	
				return {
					status: 200,
					message: "The order has succesfully updated!",
					data: found
				}
			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},

		deleteOrder: (_, { orderId }) => {
			try {
				let index = orders.findIndex(order => order.order_id == orderId)
				if(index == -1) throw new Error("There is no such order!")

				let deletedOrder = orders.splice(index, 1)

				return {
					status: 200,
					message: "The order has succesfully deleted!",
					data: deletedOrder
				}

			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		}
	},

	Query: {
		orders: (_, { userId, orderId }) => {
			if(userId) {
				return orders.filter(order => order.user_id == userId)
			}

			if(orderId) {
				return [orders.find(order => order.order_id == orderId)]
			}

			return orders
		},
	},

	Order: {
		orderId: parent => parent.order_id,
		user:    parent => users.find(user => user.user_id == parent.user_id),
		food:    parent => foods.find(food => food.food_id == parent.food_id)
	}
}