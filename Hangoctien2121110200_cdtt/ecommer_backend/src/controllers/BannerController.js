const BannerService = require('../services/BannerService');

const createBanner = async (req, res) => {
    try {
        const { name,  logo } = req.body;
        if (!name||!logo) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }
        const response = await BannerService.createBanner(req.body);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const updateBanner = async (req, res) => {
    try {
        const BannerId = req.params.id;
        const data = req.body;
        if (!BannerId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The BannerId is required for updating a Banner'
            });
        }
        const response = await BannerService.updateBanner(BannerId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Internal Server Error'
        });
    }
}

const getDetailsBanner = async (req, res) => {
    try {
        const BannerId = req.params.id;
        if (!BannerId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The BannerId is required to get details of a Banner'
            });
        }
        const response = await BannerService.getDetailsBanner(BannerId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Internal Server Error'
        });
    }
}


const deleteBanner = async (req, res) => {
    try {
        const BannerId = req.params.id;
        if (!BannerId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The BannerId is required for deleting a Banner'
            });
        }
        const response = await BannerService.deleteBanner(BannerId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Internal Server Error'
        });
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await BannerService.deleteManyBanner(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllBanner = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await BannerService.getAllBanner(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createBanner,
    updateBanner,
    getDetailsBanner,
    deleteBanner,
    getAllBanner,
    deleteMany
};
