const BrandService = require('../services/BrandService');

const createBrand = async (req, res) => {
    try {
        const { name, description, logo } = req.body;
        if (!name||!logo) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }
        const response = await BrandService.createBrand(req.body);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const updateBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const data = req.body;
        if (!brandId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The brandId is required for updating a brand'
            });
        }
        const response = await BrandService.updateBrand(brandId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Internal Server Error'
        });
    }
}

const getDetailsBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        if (!brandId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The brandId is required to get details of a brand'
            });
        }
        const response = await BrandService.getDetailsBrand(brandId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Internal Server Error'
        });
    }
}


const deleteBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        if (!brandId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The brandId is required for deleting a brand'
            });
        }
        const response = await BrandService.deleteBrand(brandId);
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
        const response = await BrandService.deleteManyBrand(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllBrand = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await BrandService.getAllBrand(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createBrand,
    updateBrand,
    getDetailsBrand,
    deleteBrand,
    getAllBrand,
    deleteMany
};
