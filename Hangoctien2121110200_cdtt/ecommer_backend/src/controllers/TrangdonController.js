const TrangdonService = require('../services/TrangdonService.js')

const createTrangdon = async (req, res) => {
    try {
        const { name, title,  detail, description, image, type } = req.body
        if (!name || !title ||  !detail ||  !image || !type) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await TrangdonService.createTrangdon(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateTrangdon = async (req, res) => {
    try {
        const trangdonId = req.params.id
        const data = req.body
        if (!trangdonId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The trangdonId is required'
            })
        }
        const response = await TrangdonService.updateTrangdon(trangdonId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsTrangdon = async (req, res) => {
    try {
        const trangdonId = req.params.id
        if (!trangdonId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The trangdonId is required'
            })
        }
        const response = await TrangdonService.getDetailsTrangdon(trangdonId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteTrangdon = async (req, res) => {
    try {
        const trangdonId = req.params.id
        if (!trangdonId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The trangdonId is required'
            })
        }
        const response = await TrangdonService.deleteTrangdon(trangdonId)
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
        const response = await TrangdonService.deleteManyTrangdon(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllTrangdon = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await TrangdonService.getAllTrangdon(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await TrangdonService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createTrangdon,
    updateTrangdon,
    getDetailsTrangdon,
    deleteTrangdon,
    getAllTrangdon,
    deleteMany,
    getAllType
}
