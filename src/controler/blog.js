const express = require("express");
const { UserSection ,Blog} = require("../models");
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
  
  const blogPost = async (req, res) => {
    console.log("Create Account API Called");

    upload.single("image")(req, res, async (err) => {
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
            let user = await UserSection.findOne({
                where: {email}
              });
            const result= await Blog.create({
                title:title,
                description:description,
                image:Image,
                user_id:user.id
                   });

            res.status(201).json({ message: "Blog Post successfully", success:true, result });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Registration failed" });
        }
    });
};


const fetchAllBlogPost = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: {
                model: UserSection,
                attributes: ["id"], 
            },
            order: [["createdAt", "DESC"]], 
        });

        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch blog posts" });
    }
};

const updateBlogPost = async (req, res) => {
    console.log("Update Blog API Called");

    
   

    upload.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: "File upload failed" });
        }
        const { id } = req.params;
        const { title, description } = req.body;
        const { email } = req.userData;
    console.log(title, description,'title, description')
        try {
            let user = await UserSection.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            let blog = await Blog.findOne({ where: { id: id, user_id: user.id } });
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

            await Blog.update(updatedFields, { where: { id: id } });

            res.status(200).json({ message: "Blog post updated successfully", success: true });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Blog update failed" });
        }
    });
};

const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.userData;

        if (!id) {
            return res.status(400).json({ error: "Blog ID is required" });
        }

        let user = await UserSection.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const deletedBlog = await Blog.destroy({ where: { id, user_id: user.id } });

        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog post not found or unauthorized" });
        }

        res.status(200).json({ message: "Blog post deleted successfully", success: true });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to delete blog post" });
    }
};


const blogDetails=async(req,res)=>{
    try {
        const { id } = req.params;
        const blog = await Blog.findOne({ where: { id } });

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ error: "Failed to fetch blog" });
    }
}
module.exports = {
    blogPost,
    fetchAllBlogPost,
    updateBlogPost,
    deleteBlogPost,
    blogDetails

   
}