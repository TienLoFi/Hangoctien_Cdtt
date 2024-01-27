const express = require("express");
const router = express.Router()
const TrangdonController = require('../controllers/TrangdonController'); 
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', TrangdonController.createTrangdon)
router.put('/update/:id',  TrangdonController.updateTrangdon)
router.get('/get-details/:id', TrangdonController.getDetailsTrangdon)
router.delete('/delete/:id',  TrangdonController.deleteTrangdon)
router.get('/get-all', TrangdonController.getAllTrangdon)
router.post('/delete-many', authMiddleWare, TrangdonController.deleteMany)
router.get('/get-all-type', TrangdonController.getAllType)

module.exports = router