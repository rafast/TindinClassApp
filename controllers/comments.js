const Class = require('../models/class');
const Comment = require('../models/comment');

module.exports.createComment = async (req, res) => {
    try{
        const { id } = req.params;
        const { comment } = req.body;
        const findClass = await Class.findById(id);
        findClass.total_comments += 1;
        await findClass.save();
        const newComment = new Comment({ comment });
        newComment.id_class = findClass;
        newComment.save();
        res.status(201).send(newComment);
    } catch(e){
        res.send(JSON.stringify(e.message));
    }
}

module.exports.listAllComments = async (req, res) => {
    try{
        const { id } = req.params;
        const allCommentsPerClass = await Comment.find({ id_class: id });
        res.send(allCommentsPerClass);
    } catch(e){
        res.send(JSON.stringify(e.message));
    }
}

module.exports.deleteComment = async (req, res) => {
    try{
        const { id, commentId } = req.params;
        const deletedComment = await Comment.findByIdAndDelete({ _id: commentId });
        const updateClass = await Class.findById(id);
        updateClass.total_comments -= 1;
        updateClass.save();
        res.send(deletedComment);
    } catch(e){
        res.send(JSON.stringify(e.message));
    }
}