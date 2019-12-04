
const express=require('express');
const router=express.Router();
const Post=require('../models/Post');

//get back all posts
router.get('/',async(req,res)=>{

	//res.send('We are on the posts');

	try{
		const posts=await Post.find();
		res.json(posts);
	}catch(err){
		res.json({message:err});
	}
});

router.get('/sp',(req,res)=>{

	res.send('sp');
});

//submit a post
router.post('/', async (req,res)=>{

	//console.log(req.body);//body parser is required or else it will show up as undefined in the console 
	const post =new Post({
		title: req.body.title,
		description: req.body.description
	});

	/*post.save()
	//.exec()
	.then(data => {
		res.json(data);
	})
	.catch(err=>{
		res.json({message: err});
	});*/
	try{
	const savedPost=await post.save();
	res.json(savedPost);  
	}catch(err) {
		res.json({message: err});
	}
});

//specific post
router.get('/:postId',async(req,res)=>{
	//console.log(req.params.postId);

	try{
		const post=await Post.findById(req.params.postId);
		res.json(post);
	}catch(err){

		res.json({message:err});
	}
});

//delete Post

router.delete('/:postId', async (req,res)=>{
	try{
	const removedPost=await Post.remove({_id:req.params.postId});
	res.json(removedPost);
	}catch(err){
		res.json({message:err});
	}
});

//update Post

router.patch('/:postId', async (req,res)=>{//(or)router.put
	try{
	const updatedPost=await Post.updateOne({_id:req.params.postId},
		{$set: {title:req.body.title}});
	res.json(updatedPost);
	}catch(err){
		res.json({message:err});
	}
});
module.exports=router;