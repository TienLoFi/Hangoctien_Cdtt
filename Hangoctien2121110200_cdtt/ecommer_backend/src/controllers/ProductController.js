const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const { name, image, imageDetail, type, countInStock, price, rating, description, discount, brand } = req.body;

        if (!name || !image || !imageDetail || !type || !countInStock || !price || !rating || !discount || !brand) {
            return res.status(200).json({
                status: 'ERR',
                message: 'All input fields are required, including brand information'
            });
        }

        const response = await ProductService.createProduct(req.body);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'An error occurred while processing the request'
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;

        if (!productId || !data.brand) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Both productId and brand information are required'
            });
        }

        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'An error occurred while processing the request'
        });
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
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
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllBrand = async (req, res) => {
    try {
        const response = await ProductService.getAllBrand()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteMany,
    getAllType,
    getAllBrand
}