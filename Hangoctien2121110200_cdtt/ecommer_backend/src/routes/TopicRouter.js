const express = require("express");
const router = express.Router()
const TopicController = require('../controllers/TopicController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', TopicController.createTopic)
router.put('/update/:id',  TopicController.updateTopic)
router.get('/get-details/:id', TopicController.getDetailsTopic)
router.delete('/delete/:id',  TopicController.deleteTopic)
router.get('/get-all', TopicController.getAllTopic)
router.post('/delete-many', authMiddleWare, TopicController.deleteMany)
router.get('/get-all-type', TopicController.getAllType)

module.exports = router