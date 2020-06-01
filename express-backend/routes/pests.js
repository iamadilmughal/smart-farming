var express = require('express');
var router = express.Router();
require('dotenv').config()
var cloudinary = require("cloudinary")
require('../config/cloudinaryConfig')
const upload = require('../config/multer')
var Pests = require('../models/Pests');

router.post('/',upload.single("pestImage"),async function (req,res,next){
	const pest = new Pests({
		pestName:req.body.name,
		description: req.body.description,
		scientificName:req.body.scientificName,
		diagnostics:req.body.diagnostics,
		prevention:req.body.prevention,
		severity: req.body.severity,
	});
	console.log(req.body)
	if (req.file) {
		const result = await cloudinary.v2.uploader.upload(req.file.path)
		console.log(result)
		if(result){
		  pest.pestImage = result.url
		}
	}
	console.log(pest)
	pest.save()
	.then(result=>{
		res.status(200).json({
			status: 1,
			Message:"New pest information have been added",
			result
		});
	})
	.catch(err=>{
		res.status(500).json(err);
		console.log(err);
	});
});

router.get('/',(req,res,next)=>{
	Pests
	.find()
	.exec()
	.then(result=>{
		res.status(200).json({
			status: 1,
			result
		});
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
router.get('/:ID',(req,res,next)=>{
	Pests.findOne({_id:req.params.ID}).exec().then(doc=>{
		res.status(200).json({
			Id:doc.pestId,
			Name:doc.pestName,
			Type:doc.type,
			ScientificName:doc.scientificName,
			AppearsIn:doc.appearsIn,
			ConfirmDiagnosis:doc.confirmDiagnosis,
			PreventiveMeasures:doc.preventiveMeasures,
			Images:doc.pestImages,
			Members:doc.memberName
		});
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
router.delete('/:ID',(req,res,next)=>{
	Pests.remove({_id:req.params.ID}).exec()
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
router.patch('/',(req,res,next)=>{
	
});
module.exports = router;