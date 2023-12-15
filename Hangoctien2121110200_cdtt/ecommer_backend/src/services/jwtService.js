const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()


const genneralAccessToken = async (payload) => {
    console.log('payload', payload);
    const access_token = jwt.sign({
        payload
    }, 'access_token', { expiresIn: '30s' });
    return access_token;
};
const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
      payload
    }, 'refresh_token', { expiresIn: '365d' });
    return refresh_token;

}
const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'Xac thuc'
                    })
                }
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'SUCESS',
                    access_token
                })
            })
        } catch (e) { 
            reject(e)
        }
    })

}
module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
};
