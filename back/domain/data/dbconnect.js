const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');


const myEnv = dotenv.config();
dotenvExpand(myEnv);

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb+srv://test:test@cluster0.4aoji.mongodb.net/blublod`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connecting MongoDB'))
.catch((err) => console.log('Fail to connect to MongoDB', err));

// mongoose.connection.once('open', () => {
    
    // console.log('Je suis connecté avec succès');
// })
// .on('error', () => {
//     console.log("connection failed");
// })

