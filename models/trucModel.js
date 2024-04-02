const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({


    caTruc: {
        type: String,
        required: true
        
    },
    hocKy: {
        type: String,
        required: true
    },
    ngayTruc: {
        type: String,
        required: true
    }
    
    
})

module.exports = mongoose.model('trucData', dataSchema)