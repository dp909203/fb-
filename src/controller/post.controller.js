const { where } = require('sequelize');
const config = require('../config/config');
const db = require('../config/db.config');
const RESPONSE = require('../helper/response');
const uploadImage = require('../middelware/upload');
const User = db.User;
const Post = db.Post;


//create post
const createPost = async (req, res) => {
    try {
        const authUser = req.user;
        const { name, description } = req.body;
        const photo = req.photoPath;
        const userId = authUser.id;

        if (!authUser) {
            return RESPONSE.error(res, 1007, authUser)
        }

        //create post
        const postData = await Post.create({ userId, name, photo, description });
        Post.name = name;
        Post.description = description;

        await postData.save();
        return RESPONSE.success(res, 1011, postData)

    } catch (error) {
        console.error(error);
        return RESPONSE.error(res, 9999, error);
    }
};

//all post get 
const get_all_Post = async (req, res) => {
    try {
        const postId = req.body.id;

        const post = await Post.findAll()

        if (!post) {
            return RESPONSE.error(res, 1012, post)
        }

        return RESPONSE.success(res, 1013, post)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
};

//one post get 
const get_Post = async (req, res) => {
    try {

        const postId = req.body.postId;

        const post = await Post.findOne({ where: { id: postId } });

        if (!post) {
            return RESPONSE.error(res, 1012, post)
        }

        return RESPONSE.success(res, 1013, post)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999);
    }
};

//get_user_post
const get_user_post = async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log("=======>", userId);
        const post = await Post.findAll({ where: { userId: userId } });

        if (!post) {
            return RESPONSE.error(res, 1012, post)
        }
        return RESPONSE.success(res, 1013, post)

    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
};

//update post
const update_post = async (req, res) => {
    try {
        const { name, description, postId } = req.body;
        const authUser = req.user;

        const post = await db.Post.findByPk(postId);

        if (!post) {
            return RESPONSE.error(res, 1012, post)
        }

        //compare authuser 
        if (post.userId != authUser.id) {
            return RESPONSE.error(res, 1015)

        }

        //update postname and description
        post.name = name;
        post.description = description;
        await post.save();
        return RESPONSE.success(res, 1014, post);


    } catch (error) {
        console.error(error);
        return RESPONSE.success(res, 9999);
    }
};

//delete post
const delete_post = async (req, res) => {
    try {
        const { postId } = req.body;
        const authUser = req.user;

        //find a post
        const post = await db.Post.findByPk(postId);
        if (!post) {
            return RESPONSE.error(res, 1012, post)
        }

        //compare post_user and authuser
        if (post.userId != authUser.id) {
            return RESPONSE.error(res, 1015)
        }

        //delete post
        await post.destroy();
        return RESPONSE.error(res, 1017)


    } catch (error) {
        console.error(error);
        return RESPONSE.error(res, 9999);
    }
};



module.exports = {
    createPost,
    get_all_Post,
    get_Post,
    get_user_post,
    update_post,
    delete_post
}