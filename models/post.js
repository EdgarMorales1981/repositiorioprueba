import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        titulo: {type: String, required: false, trim:true},
        descripcion: {type: String, required: false, trim:true},
        imagen: {type: String}
    }
)

const Post = mongoose.model('Post', postSchema);

export default Post;

