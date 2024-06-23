const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = router;
const Model = require('../models/model');
const trucModel = require('../models/trucModel');
const { model } = require('mongoose');



router.post('/register', async (req, res) => {
       

    try {
        const hashed = await bcrypt.hash((req.body.password), saltRounds)
            const data = new Model({
                mssv: req.body.mssv,
                name: req.body.name,
                password: hashed})   
        const alrExists = await Model.findOne({mssv: req.body.mssv})
        if(alrExists){
            return res.status(409).json({message : "MSSV Already Registered."})
        }
        const dataToSave = await data.save();
        const dataToAlsoSave = await new trucModel({mssv: req.body.mssv}).save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.post('/shiftReg', async (req, res) => {
    try{
        const cond = await trucModel.findOne({mssv: req.body.mssv})
        // console.log(cond)
        if(cond){
            if(((req.body.hocKy) === (cond.hocKy) && req.body.caTruc === (cond.caTruc)) && req.body.ngayTruc === (cond.ngayTruc)){
                res.status(400).json({messege: "cant override current time table"})
            }
            else{
                // do nothing and proceeds to the code below
                // const data = new trucModel({
                //     caTruc: req.body.caTruc,
                //     hocKy: req.body.hocKy,
                //     ngayTruc: req.body.ngayTruc
                // })
                try {
                    const dataUpdate = await trucModel.updateOne({mssv : req.body.mssv}, {
                        $set: {caTruc : req.body.caTruc, 
                               hocKy: req.body.hocKy,
                                ngayTruc : req.body.ngayTruc}
                    });

                    res.status(200).json(dataUpdate)
                    // console.log("yeet")

                }
                catch (error) {
                    res.status(400).json({message: error.message})
                }
            }
        }
        else{
            res.status(404).json({messege: " not found lmfao "});

        }
    }
    catch(error){
        res.status(400).json({messege : "something happened : ", error})
    }
})
router.post('/passwordChange', async  (req, res) => {
    const data = await Model.findOne({mssv: req.body.mssv})
    if (data){

        try{
            if( await bcrypt.compare(req.body.password, data.password)){
                const hashed = await bcrypt.hash((req.body.newPassword), saltRounds)
                data.password = hashed;
                await data.save()
                res.status(200);
            }
            else{
                res.send("wrong password!")
            }
        }
        catch{
            res.status(500).json({message: "failed"})
        }}
    else{
        res.status(404).json({message: "Credentials not found"})
    }

})


router.post('/login', async (req, res) => {
    const data = await Model.findOne({mssv: req.body.mssv})
    if (data){

        try{
            if( await bcrypt.compare(req.body.password, data.password)){
                res.send("true!")       
            }
            else{
                res.send("wrong password!")
            }
        }
        catch{
            res.status(500).json({message: "failed"})
        }}
    else{
        res.status(404).json({message: "Credentials not found"})
    }
        

    
})
//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id)
        res.json(data)
    }
    catch{
        res.status(500).json({messege : error.message})
    }
})

//Update by ID Method
router.patch('/adminPass/', async (req, res) => {
    try{
            const data = await Model.findOne({mssv: req.body.mssv})
            const hashed = await bcrypt.hash((req.body.newPassword), saltRounds)
            data.password = hashed;
            await data.save()
            res.status(200);
        
    }
    catch{
        res.status(500).json({message: "failed"})
    }
})

//Delete by ID Method
router.delete('/linrin/', async (req, res) => {
    try {
        const deletion = await Model.findOneAndDelete({mssv: req.body.mssv});
        if (deletion) {
            res.status(200).json({messege: " a ok"});
          } else {
            res.status(404).json({ message: 'Wrong MSSV' });
        }
        
    }
    catch(error){
        res.status(400).json({ message: error.message })
    }
})

