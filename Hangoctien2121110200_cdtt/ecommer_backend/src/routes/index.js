const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')
const BannerRouter = require('./BannerRouter')
const BrandRouter = require('./BrandRouter')
const PaymentRouter = require('./PaymentRouter')
const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/Banner', BannerRouter);
    app.use('/api/brand', BrandRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/payment', PaymentRouter)
}
module.exports =routes