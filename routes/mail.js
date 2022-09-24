const mongoose = require('mongoose');

const mailSchema = mongoose.Schema({
    read: {
        type: Boolean,
        default: false
    },
    senderid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    receiver: String,
    mailtext: String
})

module.exports=mongoose.model("mail", mailSchema);