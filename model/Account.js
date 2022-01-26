const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: 'Please supply a id',
            trim: true
        },
        password: {
            type: String,
            required: 'Please supply a password',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: 'Please Supply an email address'
        },
        role: {
            type: String,
            required: 'Please supply a role',
            trim: true
        }
    }
)

// AccountSchema.methods.setPassword = async function (password) {
//     this.hashedPassword = await bcrypt.hash(password, 10);
// };
//
// AccountSchema.methods.checkPassword = async function (password) {
//     return await bcrypt.compare(password, this.hashedPassword); // true / false
// };
//
// AccountSchema.statics.findByUsername = function (username) {
//     return this.findOne({ username });
// };

module.exports = mongoose.models.Account || mongoose.model('Account', AccountSchema);
