exports.getTags = async (req, res, next) => {
	try {
		res.send('tags')
	} catch (error) {
		next(error)
	}
}
