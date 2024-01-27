const Trangdon = require("../models/TrangdonModel")

const createTrangdon = (newTrangdon) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, description,title, detail, slug } = newTrangdon
        try {
            const checkTrangdon = await Trangdon.findOne({
                name: name
            })
            if (checkTrangdon !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of trangdon is already'
                })
            }
            const newTrangdon = await Trangdon.create({
                name, 
                title,
                slug,
                detail,
                description,
                image,
                type
            })
            if (newTrangdon) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newTrangdon
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateTrangdon = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTrangdon = await Trangdon.findOne({
                _id: id
            })
            if (checkTrangdon === null) {
                resolve({
                    status: 'ERR',
                    message: 'The trangdon is not defined'
                })
            }

            const updatedTrangdon = await Trangdon.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedTrangdon
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteTrangdon = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTrangdon = await Trangdon.findOne({
                _id: id
            })
            if (checkTrangdon === null) {
                resolve({
                    status: 'ERR',
                    message: 'The trangdon is not defined'
                })
            }

            await Trangdon.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete trangdon success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyTrangdon = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Trangdon.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete trangdon success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsTrangdon = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const trangdon = await Trangdon.findOne({
                _id: id
            })
            if (trangdon === null) {
                resolve({
                    status: 'ERR',
                    message: 'The trangdon is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: trangdon
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllTrangdon = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalTrangdon = await Trangdon.countDocuments();

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Trangdon.find({ [label]: { '$regex': filter[1] } })
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalTrangdon,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalTrangdon / limit),
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allTrangdonSort = await Trangdon.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allTrangdonSort,
                    total: totalTrangdon,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalTrangdon / limit),
                });
            }

            let allTrangdon = [];

            if (!limit && !page) {
                allTrangdon = await Trangdon.find().sort({ createdAt: -1, updatedAt: -1 });
            } else {
                allTrangdon = await Trangdon.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allTrangdon,
                total: totalTrangdon,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalTrangdon / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Trangdon.distinct('type')
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
    createTrangdon,
    updateTrangdon,
    getDetailsTrangdon,
    deleteTrangdon,
    getAllTrangdon,
    deleteManyTrangdon,
    getAllType
}