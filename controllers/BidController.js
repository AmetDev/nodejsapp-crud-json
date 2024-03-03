var Table = require('cli-table')
const Bid = require('../models/bids.js')
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../db/Bids.json')
const readBidRaw = fs.readFileSync(filePath)
const parsedReadBidRaw = JSON.parse(readBidRaw)
let isDuplicatedBool = false

const bidAdd = object => {
	const {
		codeRequest,
		codeMaster,
		codeClient,
		date,
		equipment,
		typeBreakDown,
		description,
		client,
		statusBid,
		master,
	} = object

	const isDuplicated = () => {
		parsedReadBidRaw.map(object =>
			object.codeRequest === codeRequest
				? (isDuplicatedBool = true)
				: (isDuplicatedBool = false)
		)
	}
	isDuplicated()
	if (isDuplicatedBool === true) {
		console.log('объект с таким id существует')
		return 0
	}

	const newBid = new Bid(
		codeRequest,
		codeMaster,
		codeClient,
		date,
		equipment,
		typeBreakDown,
		description,
		client,
		statusBid,
		master
	)
	console.log('Объект был добавлен', newBid)

	parsedReadBidRaw.push(newBid)
	const updatedData = JSON.stringify(parsedReadBidRaw)
	fs.writeFileSync(filePath, updatedData)
}
const bidRemove = object => {
	const result = parsedReadBidRaw.findIndex(
		object => object.codeRequest === objectID
	)
	if (result == -1) {
		console.log('Не удалось найти объект')
		return 0
	}
	parsedReadBidRaw.splice(result, 1)
	const parsedUpatedData = JSON.stringify(parsedReadBidRaw)
	fs.writeFileSync(filePath, parsedUpatedData)
}

const bidFindAll = () => {
	console.log('Bids:')
	const filePath = path.join(__dirname, '../db/Bids.json')
	const readBidRaw = fs.readFileSync(filePath)
	const parsedReadBidRaw = JSON.parse(readBidRaw)

	const table = new Table({
		head: [
			'Код Заявки',
			'Код Мастера',
			'Код Клиента',
			'Дата Заявки',
			'Оборудование',
			'Тип поломки',
			'Описание',
			'ФИО Клиента',
			'Статус заявки',
			'ФИО Мастера',
		],
	})

	parsedReadBidRaw.forEach(row => {
		table.push([
			row.codeRequest,
			row.codeMaster,
			row.codeClient,
			row.date,
			row.equipment,
			row.typeBreakDown,
			row.description,
			row.client,
			row.statusBid,
			row.master,
		])
	})

	console.log(table.toString())
}

module.exports = { bidAdd, bidRemove, bidFindAll }
