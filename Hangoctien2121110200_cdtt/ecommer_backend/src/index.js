const express=require("express");
const dotenv = require ('dotenv');
const mongoose=require ("mongoose");
dotenv.config()

const app = express();
const port= process.env.PORT||3001


app.get('/', (req, res) => {
    res.send('Hello World! cưng')
})

console.log('process.env.MONGO_DB',process.env.MONGO_DB)
mongoose.connect(`mongodb+srv://ngoctiendz2k3:${process.env.MONGO_DB}@cluster0.onhu1bs.mongodb.net/?retryWrites=true&w=majority`)
.then(()=> {console.log('Connect Db Success')}).catch(err => {console.log(err)
})
app.listen(port,()=>{
    console.log('Server is runing in port:',+port)
}
)

