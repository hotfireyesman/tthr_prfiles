import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
})

UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
}

UserSchema.methods.checkPassword = async function(password){
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
}
//인스턴스 메서드. this -> 문서 인스턴스


//스태틱 메서드. this -> User
UserSchema.statics.findByUsername = function(username) {
    return this.findOne({ username });
}

UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
}

const User = mongoose.model('User', UserSchema);
export default User;