import { users } from '#data/users.js'
import { orders } from '#data/orders.js'
import { foods } from '#data/foods.js'

export default {
	Mutation: {
		addUser: (_, { username, contact }) => {
			try {
				let newUser = {
					user_id: users.length + 1,
					username,
					contact
				}
	
				users.push(newUser)
	
				return {
					status: 200,
					message: "The user has succesfully added!",
					data: newUser
				}
			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},

		changeUser: (_, { userId, username, contact }) => {
			try {
				let found = users.find(user => user.user_id == userId)
				if(!found) throw new Error("There is no such user!")

				found.username = username
				found.contact = contact
	
				return {
					status: 200,
					message: "The user has succesfully updated!",
					data: found
				}
			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},

		deleteUser: (_, { userId }) => {
			try {
				let index = users.findIndex(user => user.user_id == userId)
				if(index == -1) throw new Error("There is no such user!")

				let deletedUser = users.splice(index, 1)

				return {
					status: 200,
					message: "The user has succesfully deleted!",
					data: deletedUser
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
		users: (_, { userId, pagination: { page, limit } , search }) => {
			let readyUsers = users

			if(userId) {
				return [readyUsers.find(user => user.user_id == userId)]
			}

			if(search) {
				readyUsers = readyUsers.filter( user => user.username.toLowerCase().includes(search.toLowerCase()) )
			}
			
			return readyUsers.slice(page * limit - limit, page * limit)
		}
	},

	User: {
		userId: parent => parent.user_id,
		orders: parent => orders.filter(order => order.user_id == parent.user_id)
	},
}