const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://dat123:dat241299@cluster0.91l2i.mongodb.net/BLog?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully');
    } catch (e) {
        console.log('Connect Failure');
    }
}
module.exports = { connect };
