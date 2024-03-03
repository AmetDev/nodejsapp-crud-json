var Table = require('cli-table')
const Client = require('../models/clients.js')
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../db/Clients.json')
const readClientRaw = fs.readFileSync(filePath)
const parsedReadClientRaw = JSON.parse(readClientRaw)
let isDuplicatedBool = false
const clientAdd = object => {
	const { codeClient, nameClient, codeRequest, phone } = object
	const isDuplicated = () => {
		parsedReadClientRaw.map(object =>
			object.codeClient === codeClient
				? (isDuplicatedBool = true)
				: (isDuplicatedBool = false)
		)
	}
	isDuplicated()
	if (isDuplicatedBool === true) {
		console.log('объект с таким id существует')
		return 0
	}
	const newClient = new Client(codeClient, nameClient, codeRequest, phone)
	console.log('Объект был добавлен', newClient)

	parsedReadClientRaw.push(newClient)
	const updatedData = JSON.stringify(parsedReadClientRaw)
	fs.writeFileSync(filePath, updatedData)
}
const clientRemove = objectID => {
	const result = parsedReadClientRaw.findIndex(
		object => object.codeClient === objectID
	)
	if (result == -1) {
		console.log('Не удалось найти объект')
		return 0
	}
	parsedReadClientRaw.splice(result, 1)
	const parsedUpatedData = JSON.stringify(parsedReadClientRaw)
	fs.writeFileSync(filePath, parsedUpatedData)
}
const updatedClient = ID => {
	let count = 0
	let propertyNames = []
	let isFinded = null
	let obj = new Object()
	let arrData = []
	parsedReadClientRaw.forEach((element, index) => {
		if (element.codeClient == ID) {
			isFinded = { ...element }
			console.log('true', index)
			return
		}
		console.log('false', index)
	})
	if (isFinded === null) {
		console.log('Объект не был найден')
		return
	}
	console.log(isFinded)
	const objClient = new Client()
	const propertyCountClient = Object.keys(objClient).length
	console.log(propertyCountClient)
	count = propertyCountClient
	propertyNames = Object.keys(objClient)
	let a = count
	for (let i = 0; i < a; ++i) {
		arrData.push(readline1.question(`${propertyNames[i]}: `))
	}
	for (let index = 0; index < arrData.length; index++) {
		const element = arrData[index]
		obj[`${propertyNames[index]}`] = element
	}
	clientAdd(arrData)
}

const clientFindAll = () => {
	console.log('Clients:')
	const filePath = path.join(__dirname, '../db/Clients.json')
	const readClientRaw = fs.readFileSync(filePath)
	const parsedReadClientRaw = JSON.parse(readClientRaw)

	const table = new Table({
		head: ['Код Клиента', 'ФИО Клиента', 'Код Заявки', 'Телефон'],
	})

	parsedReadClientRaw.forEach(row => {
		table.push([row.codeClient, row.nameClient, row.codeRequest, row.phone])
	})

	console.log(table.toString())
}

module.exports = { clientAdd, clientRemove, clientFindAll, updatedClient }
