const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({


    mssv:{
        required: true,
        type: String 
    },
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    caTruc: {
        type: String
    },
    hocKy: {
        type: String
    },
    ngayTruc: {
        type: String
    }
    
})

module.exports = mongoose.model('Data', dataSchema)