import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true},
    password: { type: String, trim: true},
    nombre: { type: String, trim:true},
    descripcion: { type: String, trim:true},
    imageUrl: { type: String }
});

const User = mongoose.model('User', userSchema);

export default User;
