const express = require("express");
const router = express.Router();
const BannerController = require('../controllers/BannerController');
const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/create', BannerController.createBanner);
router.put('/update/:id', authMiddleWare, BannerController.updateBanner);
router.get('/get-details/:id', BannerController.getDetailsBanner);
router.delete('/delete/:id', authMiddleWare, BannerController.deleteBanner);
router.get('/get-all', BannerController.getAllBanner);

module.exports = router;
