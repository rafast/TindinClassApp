const Class = require('../models/class');
const Comment = require('../models/comment');

module.exports.createClass = async (req, res) => {
    try {
        const { name, description, video, date_init, date_end } = req.body;
        const newClass = new Class({ name, description, video, date_init, date_end });
        newClass.total_comments = 0;
        await newClass.save();
        res.status(201).send(newClass);
    } catch (e) {
        res.send(JSON.stringify(e.message));
    }
};

module.exports.listAllClasses = async (req, res) => {
    try {
        const allClasses = await Class.find();
        const allClassesWithLastComment = [];
        for (let classe of allClasses) {
            const lastComment = await Comment.findOne({ id_class: classe._id }).select(['-_id', 'comment', 'date_created']).sort({ 'date_created': -1 });
            let newClassObj = classe.toObject();
            if (lastComment) {
                newClassObj.last_comment = lastComment.comment;
                newClassObj.last_comment_date = lastComment.date_created;
            } else {
                newClassObj.last_comment = '';
                newClassObj.last_comment_date = '';
            }

            allClassesWithLastComment.push(newClassObj);
        }
        res.status(200).send(JSON.parse(JSON.stringify(allClassesWithLastComment)));
    } catch (e) {
        res.send(JSON.stringify(e.message));
    }
}

module.exports.listClassById = async (req, res) => {
    try {
        const { id } = req.params;
        const { filter } = req.query;
        console.log(filter);
        const searchedClass = await Class.findById(id);
        const lastComments = await Comment.find({ id_class: id }).select(['comment', 'date_created']).sort({ 'date_created': -1 }).limit(3);
        let classDetail = searchedClass.toObject();
        classDetail.comments = lastComments;
        res.status(200).send(JSON.parse(JSON.stringify(classDetail)));
    } catch (e) {
        res.send(JSON.stringify(e.message));
    }
}

module.exports.updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, video, date_init, date_end } = req.body;
        const updatedClass = await Class.findByIdAndUpdate(id, { name, description, video, date_init, date_end });

        res.status(200).send(JSON.parse(JSON.stringify(updatedClass)));
    } catch (e) {
        res.send(JSON.stringify(e.message));
    }
}

module.exports.deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        await Class.findByIdAndDelete(id);
        res.status(200).send(JSON.stringify('Class successfully deleted!'));
    } catch (e) {
        res.send(JSON.stringify(e.message));
    }
}