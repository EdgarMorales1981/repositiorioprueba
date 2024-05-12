'use strict';
import User from "./models/users.js";
import Post from "./models/post.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs-extra";





cloudinary.config({
    cloud_name: "dqmxnsqsz",
    api_key: "994898297717185",
    api_secret: "80rBt6tr3TolTtTqBdhO0btxdUk"
});






export const obtenerUsuarios = async (req, res, next) => {
    const usuarios = await User.find();
    return res.json(usuarios);
    console.log('Usuarios obtenidos')
    next();
}

export const obtenerUsuariosId = async (req, res, next) => {
    const id = req.params.id;
    const usuario = await User.findById(id);
    return res.json(usuario);
    console.log('Usuario obtenido')

}


export const agregarUsuario = async  (req, res, next) => {
    try{
        const imageUpload = await cloudinary.uploader.upload(req.file.path);
    const usuario = new User({
        email:req.body.email,
        password: req.body.password,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imageUrl: imageUpload.secure_url
    });
    await usuario.save();
    console.log('Usuario agregado',usuario)
    res.json(usuario)
        fs.remove('./uploads');
    }catch (error){
        console.log('Error al agregar usuario',error)
    }

}

export const obtenerPosts = async (req, res, next) => {
    const posts = await Post.find();
    return res.json(posts);
    console.log('Posts obtenidos')
    next();

}

export const obtenerUsuariosPorNombre = async (req, res, next) => {
    try {
       const nombre = req.params.nombre
        const usuario = await User.findOne({nombre: nombre});
        return res.json(usuario);
        console.log('Usuario obtenido por nombre', usuario)
        next();
    }
            catch (e) {
                console.log('Error al obtener usuario por nombre',e)
            }
}
export const enviarPost = async (req, res, next) => {
    try {
        const imageUpload = await cloudinary.uploader.upload(req.file.path);
        const post = new Post({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            imagen: imageUpload.secure_url
        });
        await post.save();
        console.log('Post enviado',post)
        res.json(post)
        fs.remove('./uploads');
        }catch (e) {
        console.log('Error al enviar post',e)
    }

}

export const obtenerPostsTitulo = async (req, res, next) => {
    try {
        const titulo = req.params.titulo
        const post = await Post.findOne({titulo: titulo});
        return res.json(post);
        console.log('Post obtenido por titulo', post)
        next();
    }catch (e) {
        console.log('Error al obtener post por titulo',e)
    }
}
