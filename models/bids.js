class Bid {
	constructor(
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
	) {
		this.codeRequest = codeRequest
		this.codeMaster = codeMaster
		this.codeClient = codeClient
		this.date = date
		this.equipment = equipment
		this.typeBreakDown = typeBreakDown
		this.description = description
		this.client = client
		this.statusBid = statusBid
		this.master = master
	}
}

module.exports = Bid
