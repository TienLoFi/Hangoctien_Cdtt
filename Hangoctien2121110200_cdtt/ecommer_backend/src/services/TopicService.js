const Topic = require("../models/TopicModel")

const createTopic = (newTopic) => {
    return new Promise(async (resolve, reject) => {
        const {title,content } = newTopic
        try {
            const checkTopic = await Topic.findOne({
                title: title
            })
            if (checkTopic !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The title of topic is already'
                })
            }
            const newTopic = await Topic.create({
                title, 
                content
            })
            if (newTopic) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newTopic
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateTopic = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTopic = await Topic.findOne({
                _id: id
            })
            if (checkTopic === null) {
                resolve({
                    status: 'ERR',
                    message: 'The topic is not defined'
                })
            }

            const updatedTopic = await Topic.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedTopic
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteTopic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTopic = await Topic.findOne({
                _id: id
            })
            if (checkTopic === null) {
                resolve({
                    status: 'ERR',
                    message: 'The topic is not defined'
                })
            }

            await Topic.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete topic success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyTopic = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Topic.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete topic success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsTopic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const topic = await Topic.findOne({
                _id: id
            })
            if (topic === null) {
                resolve({
                    status: 'ERR',
                    message: 'The topic is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: topic
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllTopic = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalTopic = await Topic.countDocuments();

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Topic.find({ [label]: { '$regex': filter[1] } })
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalTopic,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalTopic / limit),
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allTopicSort = await Topic.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allTopicSort,
                    total: totalTopic,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalTopic / limit),
                });
            }

            let allTopic = [];

            if (!limit && !page) {
                allTopic = await Topic.find().sort({ createdAt: -1, updatedAt: -1 });
            } else {
                allTopic = await Topic.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allTopic,
                total: totalTopic,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalTopic / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Topic.distinct('type')
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
    createTopic,
    updateTopic,
    getDetailsTopic,
    deleteTopic,
    getAllTopic,
    deleteManyTopic,
    getAllType
}