const express = require('express');
const router = express.Router();
const classController = require('../controllers/classes');
const { isTokenValid } = require('../middlewares');

router.route('/classes')
    .post(isTokenValid, classController.createClass)
    .get(isTokenValid, classController.listAllClasses);

router.route('/classes/:id')
    .get(isTokenValid, classController.listClassById)
    .delete(isTokenValid, classController.deleteClass)
    .put(isTokenValid, classController.updateClass);


module.exports = router;