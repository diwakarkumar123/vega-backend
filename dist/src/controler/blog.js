"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const { UserSection, Blog } = require("../models");
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });
const blogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Create Account API Called");
    upload.single("image")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(500).json({ error: "File upload failed" });
        }
        const { title, description } = req.body;
        let { email, } = req.userData;
        let Image = null;
        try {
            console.log(title, description);
            if (req.file) {
                Image = `uploads/${req.file.filename}`;
            }
            let user = yield UserSection.findOne({
                where: { email }
            });
            const result = yield Blog.create({
                title: title,
                description: description,
                image: Image,
                user_id: user.id
            });
            res.status(201).json({ message: "Blog Post successfully", success: true, result });
        }
        catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Registration failed" });
        }
    }));
});
const fetchAllBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog.findAll({
            include: {
                model: UserSection,
                attributes: ["id"],
            },
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ success: true, data: blogs });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch blog posts" });
    }
});
const updateBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Update Blog API Called");
    upload.single("image")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(500).json({ error: "File upload failed" });
        }
        const { id } = req.params;
        const { title, description } = req.body;
        const { email } = req.userData;
        console.log(title, description, 'title, description');
        try {
            let user = yield UserSection.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            let blog = yield Blog.findOne({ where: { id: id, user_id: user.id } });
            if (!blog) {
                return res.status(404).json({ error: "Blog post not found" });
            }
            let updatedFields = {
                title: title || blog.title,
                description: description || blog.description,
            };
            if (req.file) {
                updatedFields.image = `uploads/${req.file.filename}`;
            }
            yield Blog.update(updatedFields, { where: { id: id } });
            res.status(200).json({ message: "Blog post updated successfully", success: true });
        }
        catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Blog update failed" });
        }
    }));
});
const deleteBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email } = req.userData;
        if (!id) {
            return res.status(400).json({ error: "Blog ID is required" });
        }
        let user = yield UserSection.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const deletedBlog = yield Blog.destroy({ where: { id, user_id: user.id } });
        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog post not found or unauthorized" });
        }
        res.status(200).json({ message: "Blog post deleted successfully", success: true });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to delete blog post" });
    }
});
const blogDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield Blog.findOne({ where: { id } });
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json({ success: true, data: blog });
    }
    catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ error: "Failed to fetch blog" });
    }
});
module.exports = {
    blogPost,
    fetchAllBlogPost,
    updateBlogPost,
    deleteBlogPost,
    blogDetails
};
