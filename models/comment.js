const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: String,
    id_class: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }
}, { timestamps: { createdAt: 'date_created' } });

module.exports = mongoose.model('Comment', commentSchema);