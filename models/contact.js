const mongoose = require('mongoose');
const { isEmail } = require('validator');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please enter phone number'],
        unique: true,
        lowercase: true,
        validate: [isPhone, 'Please enter a valid phone']
    },
    message: {
        type: String,
        unique: true,
        lowercase: true,
    },
});


// fire a function before doc saved to db
// contactSchema.pre('save', async function(next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// static method to login user
// contactSchema.statics.login = async function(email, password) {
//     const user = await this.findOne({ email });
//     if (user) {
//         const auth = await bcrypt.compare(password, user.password);
//         if (auth) {
//             return user;
//         }
//         throw Error('incorrect password');
//     }
//     throw Error('incorrect email');
// };

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;