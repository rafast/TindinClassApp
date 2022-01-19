const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('../models/comment');

const classSchema = new Schema({
    name: String,
    description: String,
    video: String,
    date_init: Date,
    date_end: Date,
    total_comments: Number
}, { timestamps: { createdAt: 'date_created', updatedAt: 'date_updated' } , toObject: {virtuals: true}, toJSON: {virtuals: true}});

classSchema.post('findOneAndDelete', async function(doc) {
    if (doc){
        await Comment.deleteMany({
            id_class: doc.id
        });
    }
});

module.exports = mongoose.model('Class', classSchema);