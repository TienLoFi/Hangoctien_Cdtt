const express = require("express");
const router = express.Router();
const BrandController = require('../controllers/BrandController');
const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/create', BrandController.createBrand);
router.put('/update/:id', authMiddleWare, BrandController.updateBrand);
router.get('/get-details/:id', BrandController.getDetailsBrand);
router.delete('/delete/:id', authMiddleWare, BrandController.deleteBrand);
router.get('/get-all', BrandController.getAllBrand);

module.exports = router;
