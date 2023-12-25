const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

UserSchema.statics.getUserByEmail = function (email) {
    return this.findOne({ email }).exec();
};

UserSchema.statics.getUserById = function (id) {
    return this.findById(id).exec();
};

UserSchema.statics.comparePassword = async function (password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};

UserSchema.statics.createUser = async function (newUser) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    return await newUser.save();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
