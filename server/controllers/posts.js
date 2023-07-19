const { Post } = require("../models/post");
const { User } = require("../models/user");

module.exports = {
    addPost: async (req, res) => {
        try {
            const { dayOfWeek, description, userId } = req.body;
            await Post.create({ dayOfWeek, description, userId });
            res.sendStatus(200);
        } catch (error) {
            console.log("ERROR IN addPost");
            console.log(error);
            res.sendStatus(400);
        }
    },

    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                attributes: ["description", "dayOfWeek"],
                include: [
                    {
                        model: User,
                        required: true,
                        attributes: ["username"],
                    },
                ],
            });
            res.status(200).send(posts);
        } catch (error) {
            console.log("Error in getAllPosts:", error);
            res.sendStatus(400);
        }
    },

    getCurrentUserPosts: async (req, res) => {
        try {
            const { userId } = req.params;
            const posts = await Post.findAll({
                where: { userId: userId },
                include: [
                    {
                        model: User,
                        required: true,
                        attributes: ["username"],
                    },
                ],
            });
            res.status(200).send(posts);
        } catch (error) {
            console.log("ERROR IN getCurrentUserPosts");
            console.log(error);
            res.sendStatus(400);
        }
    },

    deletePost: async (req, res) => {
        try {
            const { id } = req.params;
            await Post.destroy({ where: { id: +id } });
            res.sendStatus(200);
        } catch (error) {
            console.log("ERROR IN deletePost");
            console.log(error);
            res.sendStatus(400);
        }
    },

    editPost: async (req, res) => {
        try {
            const { id } = req.params;
            const { dayOfWeek, description } = req.body;

            await Post.update(
                { dayOfWeek, description }, // Updated values for the post
                { where: { id: +id } }
            );

            res.sendStatus(200);
        } catch (error) {
            console.log("ERROR IN editPost");
            console.log(error);
            res.sendStatus(400);
        }
    },
};
