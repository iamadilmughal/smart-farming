var express = require("express");
var router = express.Router();
require('dotenv').config()
var cloudinary = require("cloudinary")
require('../config/cloudinaryConfig')
const upload = require('../config/multer')
var Plants = require('../models/Plants');

router.post('/',upload.single("plantImage"), async function (req,res,next){
	console.log(req.body)
	var plant = new Plants({
		plantName:req.body.name,
		description:req.body.description,
		diseases:req.body.disease,
		season: req.body.season,
		pests: req.body.pests
	});
	if (req.file) {
		const result = await cloudinary.v2.uploader.upload(req.file.path)
		if(result){
		  plant.plantImage = result.url
		  console.log(plant.plantImage)
		}
	}
	plant.save()
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>{
		res.status(500).json(err);
		console.log(err);
	});
});
router.get('/',(req,res,next)=>{
	Plants.find().populate('diseases causedBy','diseaseName symptoms pestName')
	.exec()
	.then(docs=>{
		res.status(200).json(docs);
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
module.exports = router;
