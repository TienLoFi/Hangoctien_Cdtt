const Contact = require("../models/ContactModel")

const createContact = (newContact) => {
    return new Promise(async (resolve, reject) => {
        const {title,email,phone,name,detail } = newContact
        try {
            const checkContact = await Contact.findOne({
                title: title
            })
            if (checkContact !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The title of contact is already'
                })
            }
            const newContact = await Contact.create({
                name,
      email,
      phone,
      title,
      detail,
            })
            if (newContact) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newContact
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateContact = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkContact = await Contact.findOne({
                _id: id
            })
            if (checkContact === null) {
                resolve({
                    status: 'ERR',
                    message: 'The contact is not defined'
                })
            }

            const updatedContact = await Contact.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedContact
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteContact = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkContact = await Contact.findOne({
                _id: id
            })
            if (checkContact === null) {
                resolve({
                    status: 'ERR',
                    message: 'The contact is not defined'
                })
            }

            await Contact.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete contact success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyContact = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Contact.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete contact success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsContact = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact = await Contact.findOne({
                _id: id
            })
            if (contact === null) {
                resolve({
                    status: 'ERR',
                    message: 'The contact is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: contact
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllContact = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalContact = await Contact.countDocuments();

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Contact.find({ [label]: { '$regex': filter[1] } })
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalContact,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalContact / limit),
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allContactSort = await Contact.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allContactSort,
                    total: totalContact,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalContact / limit),
                });
            }

            let allContact = [];

            if (!limit && !page) {
                allContact = await Contact.find().sort({ createdAt: -1, updatedAt: -1 });
            } else {
                allContact = await Contact.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allContact,
                total: totalContact,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalContact / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Contact.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createContact,
    updateContact,
    getDetailsContact,
    deleteContact,
    getAllContact,
    deleteManyContact,
    getAllType
}