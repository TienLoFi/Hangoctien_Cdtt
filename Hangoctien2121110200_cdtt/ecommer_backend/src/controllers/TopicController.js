const TopicService = require('../services/TopicService')

const createTopic = async (req, res) => {
    try {
        const { title,content } = req.body
        if (!title || !content  ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await TopicService.createTopic(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateTopic = async (req, res) => {
    try {
        const topicId = req.params.id
        const data = req.body
        if (!topicId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The topicId is required'
            })
        }
        const response = await TopicService.updateTopic(topicId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsTopic = async (req, res) => {
    try {
        const topicId = req.params.id
        if (!topicId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The topicId is required'
            })
        }
        const response = await TopicService.getDetailsTopic(topicId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteTopic = async (req, res) => {
    try {
        const topicId = req.params.id
        if (!topicId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The topicId is required'
            })
        }
        const response = await TopicService.deleteTopic(topicId)
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
        const response = await TopicService.deleteManyTopic(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllTopic = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await TopicService.getAllTopic(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await TopicService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createTopic,
    updateTopic,
    getDetailsTopic,
    deleteTopic,
    getAllTopic,
    deleteMany,
    getAllType
}
