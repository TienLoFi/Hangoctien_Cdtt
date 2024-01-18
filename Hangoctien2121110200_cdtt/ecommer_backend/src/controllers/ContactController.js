const ContactService = require('../services/ContactService')

const createContact = async (req, res) => {
    try {
        const { title,email,phone,detail,name } = req.body
        if (!name || !content || !email ||!phone||!detail ||! title ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ContactService.createContact(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id
        const data = req.body
        if (!contactId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The contactId is required'
            })
        }
        const response = await ContactService.updateContact(contactId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsContact = async (req, res) => {
    try {
        const contactId = req.params.id
        if (!contactId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The contactId is required'
            })
        }
        const response = await ContactService.getDetailsContact(contactId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id
        if (!contactId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The contactId is required'
            })
        }
        const response = await ContactService.deleteContact(contactId)
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
        const response = await ContactService.deleteManyContact(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllContact = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ContactService.getAllContact(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await ContactService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createContact,
    updateContact,
    getDetailsContact,
    deleteContact,
    getAllContact,
    deleteMany,
    getAllType
}
