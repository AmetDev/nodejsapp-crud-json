var Table = require('cli-table')
const Status = require('../models/statuses.js')
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../db/Statuses.json')
const readStatusRaw = fs.readFileSync(filePath)
const parsedReadStatusRaw = JSON.parse(readStatusRaw)
let isDuplicatedBool = false

const statusAdd = object => {
	const { codeStatus, status } = object
	const newStatus = new Status(codeStatus, status)
	console.log('Объект был добавлен', newStatus)

	const isDuplicated = () => {
		parsedReadStatusRaw.map(object =>
			object.codeStatus === codeStatus
				? (isDuplicatedBool = true)
				: (isDuplicatedBool = false)
		)
	}
	isDuplicated()
	if (isDuplicatedBool === true) {
		console.log('объект с таким id существует')
		return 0
	}

	parsedReadStatusRaw.push(newStatus)
	const updatedData = JSON.stringify(parsedReadStatusRaw)
	fs.writeFileSync(filePath, updatedData)
}
const statusRemove = object => {
	const result = parsedReadStatusRaw.findIndex(
		object => object.codeStatus === objectID
	)
	if (result == -1) {
		console.log('Не удалось найти объект')
		return 0
	}
	parsedReadStatusRaw.splice(result, 1)
	const parsedUpatedData = JSON.stringify(parsedReadStatusRaw)
	fs.writeFileSync(filePath, parsedUpatedData)
}

const statusFindAll = () => {
	console.log('Statuses:')
	const filePath = path.join(__dirname, '../db/Statuses.json')
	const readStatusRaw = fs.readFileSync(filePath)
	const parsedReadStatusRaw = JSON.parse(readStatusRaw)

	// Создаем новую таблицу
	const table = new Table({
		head: ['Код Статуса', 'Статус'],
	})

	// Добавляем данные в таблицу
	parsedReadStatusRaw.forEach(row => {
		table.push([row.codeStatus, row.status])
	})

	console.log(table.toString())
}

module.exports = { statusAdd, statusRemove, statusFindAll }
