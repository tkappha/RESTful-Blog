const bodyParser 	 	= require("body-parser")
const methodOverride 	= require("method-override");
const expressSanitizer 	= require("express-sanitizer");
const express 		 	= require('express');
const mongoose		 	= require('mongoose');

const app = express(); 

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); 
app.use(methodOverride("_method"));

//  ******  Schema *************
const blogSchema = new mongoose.Schema({
	title: String, 
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// *** creates a seed item in the database
// Blog.create({
// 	title: "Test Blog",
// 	image: "http://lorempixel.com/400/200/",
// 	body: "Hello, this is a blog post"

// });

//-------------------------------------------------
// *****  RESTful routes***********
//-------------------------------------------------

app.get("/", function(req, res){
	res.redirect("/blogs");
});


//*****   INDEX route *******
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

// *****  NEW route  **********
app.get("/blogs/new", function(req, res){
	res.render("new");
});

//******   CREATE route ******* 
app.post("/blogs", function(req, res){
	//create blog
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
			//redirect to index
			res.redirect("/blogs");
		}
	});
});

// ***** SHOW route *******
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
			if (err){
				res.redirect("/blogs");
			} else {
				res.render("show", {blog: foundBlog});
			}
	});
});

// ******* EDIT route ***********
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

// ***** UPDATE route ************
app.put("/blogs/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if (err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);	
		}
	});
});

// ******** DESTROY route ************
app.delete("/blogs/:id", function(req, res){
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

// *****  Start the server *********
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Blog app server started.");
});
