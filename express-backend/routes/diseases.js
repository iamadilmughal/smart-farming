var express = require('express');
var router = express.Router();
var Diseases = require('../models/Diseases');

router.post('/',(req,res,next)=>{
	var disease = new Diseases({
		diseaseName:req.body.name,
		description:req.body.description,
		symptoms:req.body.symptoms,
		severity: req.body.severity,
		diseaseImage:req.body.image,
		cures:req.body.cures,
		causedBy:req.body.causedBy
	});
	disease.save()
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>{
		res.status(500).json(result);
	});
});
router.get('/',(req,res,next)=>{
	Diseases.find()
	.populate('causedBy','_id pestName type')
	.exec()
	.then(docs=>{
		// res.status(200).json(docs);
		res.status(200).json({
			count:docs.length,
			DiseasesFound:docs.map(doc=>{
				return{
					ID:doc._id,
					Name:doc.name,
					Description:doc.description,
					Symptoms:doc.symptoms,
					Images:doc.images,
					Request:{
						Type:'GET',
						Url:'http:localhost:3000/diseases/'+doc._id
					},
					CausedBy:causedBy
				}
			})
		});
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
router.delete('/:ID',(req,res,next)=>{
	Diseases.remove({diseaseId:req.params.ID}).exec()
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
router.put('/',(req,res,next)=>{

});
module.exports = router;