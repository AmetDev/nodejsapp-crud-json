const Client = require('./models/clients.js')
const Master = require('./models/masters.js')
const Bid = require('./models/bids')
const Status = require('./models/statuses')
const readline = require('readline')
const readline1 = require('readline-sync')

const {
	clientAdd,
	updatedClient,
} = require('./controllers/ClientController.js')
const { clientRemove } = require('./controllers/ClientController.js')

const { masterAdd } = require('./controllers/MasterController.js')
const { masterRemove } = require('./controllers/MasterController.js')

const { statusAdd } = require('./controllers/StatusesController.js')
const { statusRemove } = require('./controllers/StatusesController.js')

const { bidAdd } = require('./controllers/BidController.js')
const { bidRemove } = require('./controllers/BidController.js')

const { clientFindAll } = require('./controllers/ClientController.js')
const { masterFindAll } = require('./controllers/MasterController.js')
const { statusFindAll } = require('./controllers/StatusesController.js')
const { bidFindAll } = require('./controllers/BidController.js')

let count = 0
let propertyNames = []
let arrData = []
let ObjectTable = ''
let obj = new Object()

const uuid = () => {
	return Math.random().toString(16).slice(2)
}

const updateObject = (typeClass, ID) => {
	switch (typeClass) {
		case 'Clients':
			updatedClient(ID)
			break

		default:
			break
	}
}

const addObject = typeClass => {
	switch (typeClass) {
		case 'Clients':
			const objClient = new Client()
			const propertyCountClient = Object.keys(objClient).length
			console.log(propertyCountClient)
			count = propertyCountClient
			propertyNames = Object.keys(objClient)
			break

		case 'Masters':
			const objMasters = new Master()
			const propertyCountMasters = Object.keys(objMasters).length
			count = propertyCountMasters
			propertyNames = Object.keys(objMasters)
			break

		case 'Statuses':
			const objStatus = new Status()
			const propertyCountStatus = Object.keys(objStatus).length
			count = propertyCountStatus
			propertyNames = Object.keys(objStatus)
			break

		case 'Bids':
			const objBids = new Bid()
			const propertyCountBids = Object.keys(objBids).length
			count = propertyCountBids
			propertyNames = Object.keys(objBids)
			break

		default:
			break
	}
}
const showData = typeClass => {
	switch (typeClass) {
		case 'Clients':
			clientFindAll()
			break
		case 'Masters':
			masterFindAll()
			break
		case 'Statuses':
			statusFindAll()
			break
		case 'Bids':
			bidFindAll()
			break
		default:
			break
	}
}
const removeInData = (typeClass, obj) => {
	switch (typeClass) {
		case 'Clients':
			clientRemove(obj)
			break
		case 'Masters':
			masterRemove(obj)
			break
		case 'Statuses':
			statusRemove(obj)
			break
		case 'Bids':
			bidRemove(obj)
			break
		default:
			break
	}
}
const addInData = (typeClass, arrData) => {
	switch (typeClass) {
		case 'Clients':
			clientAdd(arrData)
			break
		case 'Masters':
			masterAdd(arrData)
			break
		case 'Statuses':
			statusAdd(arrData)
			break
		case 'Bids':
			bidAdd(arrData)
			break
		default:
			break
	}
}

const startProgram = () => {
	console.log(
		'Что вы хотите сделать? \n 1) Добавить один объект \n 2)Удалить один объект \n 3) Просмотреть данные в таблице \n 4)Изменить данные в объекте таблицы'
	)
	const actionInput = readline1.question()
	// console.log(actionInput)
	console.log(
		'Выберите таблицу: \n Clients(1) \n Masters(2) \n Statuses(3) \n Bids(4)'
	)

	const ObjectInput = readline1.question()

	//console.log(ObjectInput)
	if (ObjectInput == 1) {
		ObjectTable = 'Clients'
	}
	if (ObjectInput == 2) {
		ObjectTable = 'Masters'
	}
	if (ObjectInput == 3) {
		ObjectTable = 'Statuses'
	}
	if (ObjectInput == 4) {
		ObjectTable = 'Bids'
	}
	addObject(ObjectTable)
	//	addObject('Masters')

	if (actionInput == 1) {
		let a = count
		for (let i = 0; i < a; ++i) {
			arrData.push(readline1.question(`${propertyNames[i]}: `))
		}
		for (let index = 0; index < arrData.length; index++) {
			const element = arrData[index]
			obj[`${propertyNames[index]}`] = element
		}
		addInData(ObjectTable, obj)
	}
	if (actionInput == 2) {
		console.log('Введите ID объекта')
		const object = readline1.question()
		removeInData(ObjectTable, object)
	}
	if (actionInput == 3) {
		console.log('test')
		showData(ObjectTable)
	}
	if (actionInput == 4) {
		const ID = readline1.question('Введите ID объекта')
		updateObject(ObjectTable, ID)
	}
}
startProgram()
