const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/comments');
const { isTokenValid } = require('../middlewares');

router.route('/classes/:id/comments')
    .get(isTokenValid, commentController.listAllComments)
    .post(isTokenValid, commentController.createComment);

router.delete('/classes/:id/comments/:commentId', isTokenValid, commentController.deleteComment);

module.exports = router;