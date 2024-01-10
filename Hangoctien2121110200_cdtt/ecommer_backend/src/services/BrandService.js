const Brand = require("../models/BrandModel");

const createBrand = (newBrand) => {
    return new Promise(async (resolve, reject) => {
        const { name, description, logo } = newBrand;
        try {
            const checkBrand = await Brand.findOne({
                name: name
            });
            if (checkBrand !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of the brand already exists.'
                });
            }

            const newBrandObject = await Brand.create({
                name,
                description,
                logo,
            });

            if (newBrandObject) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newBrandObject
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateBrand = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBrand = await Brand.findOne({
                _id: id
            });

            if (checkBrand === null) {
                resolve({
                    status: 'ERR',
                    message: 'The brand is not defined.'
                });
            }

            const updatedBrand = await Brand.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedBrand
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteBrand = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBrand = await Brand.findOne({
                _id: id
            });

            if (checkBrand === null) {
                resolve({
                    status: 'ERR',
                    message: 'The brand is not defined.'
                });
            }

            await Brand.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'Delete brand success'
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllBrand = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allBrands = await Brand.find();

            resolve({
                status: 'OK',
                message: 'Success',
                data: allBrands
            });
        } catch (e) {
            reject(e);
        }
    });
};
const deleteManyBrand = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Brand.deleteMany({ _id: ids })
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
    createBrand,
    updateBrand,
    deleteBrand,
    getAllBrand,
    deleteManyBrand
};
