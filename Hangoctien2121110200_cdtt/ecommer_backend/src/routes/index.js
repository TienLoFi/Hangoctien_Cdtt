const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')
const SliderRouter = require('./SliderRouter')
const BrandRouter = require('./BrandRouter')
const PaymentRouter = require('./PaymentRouter')
const PostRouter = require('./PostRouter')
const MenuRouter = require('./MenuRouter')
const CategoryRouter = require('./CategoryRouter')
const TopicRouter = require('./TopicRouter')
const ContactRouter = require('./ContactRouter')


const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/slider', SliderRouter);
    app.use('/api/brand', BrandRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/post', PostRouter);
    app.use('/api/payment', PaymentRouter);
    app.use('/api/menu', MenuRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/topic', TopicRouter)
    app.use('/api/contact', ContactRouter)
}
module.exports =routes