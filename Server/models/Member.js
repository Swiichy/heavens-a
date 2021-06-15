const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    memberPseudo: {
        type: String,
        required: true,
    },
    memberLevel: {
        type: Number,
        required: true
    },
    memberClasse: {
        type: String,
        required: true
    },
    memberSucces: {
        type: Number,
        required: true
    },
    memberRang: {
        type: String,
        required: true
    }
});

const Member = mongoose.model('memberData', MemberSchema);
module.exports = Member;