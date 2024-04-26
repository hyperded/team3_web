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
        console.log(hashed)
            const data = new Model({
                mssv: req.body.mssv,
                name: req.body.name,
                password: hashed})   

        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.post('/shiftReg', async (req, res) => {
    const data = new trucModel({
        caTruc: req.body.caTruc,
        hocKy: req.body.hocKy,
        ngayTruc: req.body.ngayTruc
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.post('/passwordChange', async  (req, res) => {
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
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

