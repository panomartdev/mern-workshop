const slugify = require("slugify")
const Blogs = require("../models/blog");
const { v4: uuidv4 } = require('uuid');

exports.create=(req,res) => {
    const {title, content, author} = req.body;
    let slug = slugify(title)
    if(!slug)slug = uuidv4();  
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content: 
            return res.status(400).json({error:"กรุณาป้อนเนื้อหา"})
            break;  
    }
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีบทความชื่อซ้ำกัน"})
        }
        res.json(blog)
    })
}
//ดึงข้อมูลบทความทั้งหมด
exports.getAllBlogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}
//ดึงบทความที่สนใจ อ้างอิงตาม slug
exports.singleBlog=(req,res)=>{
    const {slug} = req.params;
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

exports.remove=(req,res)=>{
    const {slug} = req.params;
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message: "ลบบทควาทเรียบร้อย" 
        })
    })
}

exports.update=(req,res)=>{
    const {slug} = req.params;
    const {title, content, author} = req.body;
    let newSlug = slugify(title)
    if(!newSlug)newSlug = uuidv4();
    
    Blogs.findOneAndUpdate({slug},{title,content,author, slug: newSlug},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog);
    })
}