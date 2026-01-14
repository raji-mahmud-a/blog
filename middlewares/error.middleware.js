

const errorHandler = function(err, req, res, next){
	if(err.name === "ZodError"){
		return res.status(400).json({
			"success": false,
			"data": null,
			"error": JSON.parse(err.message).map((val)=> val.path[0] + ":: " + val.message)
		})
	}else if(err.name === "INVALID_MIME_TYPE"){
		return res.status(400).json({
			"success": false,
			"data": null,
			"error": "Invalid file upload type:: type of file added must be image"
		})
	}else if(err.name === "IMAGE_NOT_ADDED"){
		return res.status(400).json({
			"success": false,
			"data": null,
			"error": "No File Added:: An image is required to make a post"
		})
	}else if(err.name === "MulterError"){
		return res.status(400).json({
			"success": false,
			"data": null,
			"error": err.message
		})
	}

    console.error("[ERROR] AN ERROR OCCURED", err)

	return res.status(500).json({
		"success": false,
		"data": null,
		"error" : "An Error Occurred on our End"
	})
}

export default errorHandler
