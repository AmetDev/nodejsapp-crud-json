var Table = require('cli-table')
const Master = require('../models/masters.js')
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../db/Masters.json')
const readMasterRaw = fs.readFileSync(filePath)
const parsedReadMasterRaw = JSON.parse(readMasterRaw)
let isDuplicatedBool = false

const masterAdd = object => {
	const { codeMaster, nameMaster, codeRequest, phone } = object
	const isDuplicated = () => {
		return parsedReadMasterRaw.some(object => object.codeMaster === codeMaster)
	}

	if (isDuplicated()) {
		console.log('Объект с таким id существует')
		return 0
	}

	const newMaster = new Master(codeMaster, nameMaster, codeRequest, phone)
	console.log('Объект был добавлен')

	parsedReadMasterRaw.push(newMaster)
	const updatedData = JSON.stringify(parsedReadMasterRaw)
	fs.writeFileSync(filePath, updatedData)
}
const masterRemove = objectID => {
	const result = parsedReadMasterRaw.findIndex(
		object => object.codeMaster === objectID
	)
	if (result == -1) {
		console.log('Не удалось найти объект')
		return 0
	}
	parsedReadMasterRaw.splice(result, 1)
	const parsedUpatedData = JSON.stringify(parsedReadMasterRaw)
	fs.writeFileSync(filePath, parsedUpatedData)
}

const masterFindAll = () => {
	console.log('Masters:')
	const filePath = path.join(__dirname, '../db/Masters.json')
	const readMasterRaw = fs.readFileSync(filePath)
	const parsedReadMasterRaw = JSON.parse(readMasterRaw)
	// Создаем новую таблицу
	const table = new Table({
		head: ['Код Мастера', 'Код Заявки', 'ФИО Мастера', 'Телефон'],
	})

	// Добавляем данные в таблицу
	parsedReadMasterRaw.forEach(row => {
		table.push([row.codeMaster, row.codeRequest, row.nameMaster, row.phone])
	})

	console.log(table.toString())
}

module.exports = { masterAdd, masterRemove, masterFindAll }
