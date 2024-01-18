const express = require("express");
const router = express.Router()
const ContactController = require('../controllers/ContactController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ContactController.createContact)
router.put('/update/:id',  ContactController.updateContact)
router.get('/get-details/:id', ContactController.getDetailsContact)
router.delete('/delete/:id',  ContactController.deleteContact)
router.get('/get-all', ContactController.getAllContact)
router.post('/delete-many', authMiddleWare, ContactController.deleteMany)
router.get('/get-all-type', ContactController.getAllType)

module.exports = router