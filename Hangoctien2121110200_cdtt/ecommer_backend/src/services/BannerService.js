const Banner = require("../models/BannerModel");

const createBanner = (newBanner) => {
    return new Promise(async (resolve, reject) => {
        const { name, description, logo } = newBanner;
        try {
            const checkBanner = await Banner.findOne({
                name: name
            });
            if (checkBanner !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of the Banner already exists.'
                });
            }

            const newBannerObject = await Banner.create({
                name,
                description,
                logo,
            });

            if (newBannerObject) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newBannerObject
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateBanner = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBanner = await Banner.findOne({
                _id: id
            });

            if (checkBanner === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Banner is not defined.'
                });
            }

            const updatedBanner = await Banner.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedBanner
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteBanner = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBanner = await Banner.findOne({
                _id: id
            });

            if (checkBanner === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Banner is not defined.'
                });
            }

            await Banner.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'Delete Banner success'
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllBanner = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allBanners = await Banner.find();

            resolve({
                status: 'OK',
                message: 'Success',
                data: allBanners
            });
        } catch (e) {
            reject(e);
        }
    });
};
const deleteManyBanner = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Banner.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createBanner,
    updateBanner,
    deleteBanner,
    getAllBanner,
    deleteManyBanner
};
