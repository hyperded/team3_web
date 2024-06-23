const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

    mssv:{
        required: true,
        type: String 
    },
    caTruc: {
        type: String,
        // required: true
        
    },
    hocKy: {
        type: String,
        // required: true
    },
    ngayTruc: {
        type: String,
        // required: true
    }
    
    
    
}, {versionKey: "VersionKey"})

module.exports = mongoose.model('trucData', dataSchema)