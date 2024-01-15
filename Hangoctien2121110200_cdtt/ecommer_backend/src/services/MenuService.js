const Menu = require("../models/MenuModel");

const createMenu = (newMenu) => {
    return new Promise(async (resolve, reject) => {
        const { name, position, link } = newMenu;
        try {
            const checkMenu = await Menu.findOne({
                name: name
            });
            if (checkMenu !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of the brand already exists.'
                });
            }

            const newMenu = await Menu.create({
                name,
                position,
                link,
            });

            if (newMenu) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newMenuObject
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateMenu = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkMenu = await Menu.findOne({
                _id: id
            });

            if (checkMenu === null) {
                resolve({
                    status: 'ERR',
                    message: 'The brand is not defined.'
                });
            }

            const updatedMenu = await Menu.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedMenu
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteMenu = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkMenu = await Menu.findOne({
                _id: id
            });

            if (checkMenu === null) {
                resolve({
                    status: 'ERR',
                    message: 'The brand is not defined.'
                });
            }

            await Menu.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'Delete brand success'
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllMenu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allMenus = await Menu.find();

            resolve({
                status: 'OK',
                message: 'Success',
                data: allMenus
            });
        } catch (e) {
            reject(e);
        }
    });
};
const deleteManyMenu = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Menu.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailsMenu = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const brand = await Menu.findOne({
                _id: id
            })
            if (brand === null) {
                resolve({
                    status: 'ERR',
                    message: 'The brand is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: brand
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createMenu,
    updateMenu,
    deleteMenu,
    getAllMenu,
    deleteManyMenu,
    getDetailsMenu
};
