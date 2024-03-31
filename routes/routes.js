const express = require('express');
const router = express.Router()


module.exports = router;
const Model = require('../models/model');


router.post('/post', async (req, res) => {
    const data = new Model({
        mssv: req.body.mssv,
        name: req.body.name,
        password: req.body.password
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.post('/login', async (req, res) => {
    const data = {
        mssv: req.body.mssv,
        password: req.body.password
    }
    const check = await Model.findOne({
        mssv: req.body.mssv,
        password: req.body.password
    })

    try{
        if(check.password == data.password){
            res.send("true!")       
        }
    }
    catch{
        res.send("wrong username/password!")
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

