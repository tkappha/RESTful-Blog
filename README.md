# H1 Blog Application #

*This application is an activity from Colt Steele's Web Developer Bootcamp, focusing on using RESTful 
routes to create, read, update and destroy blog posts.*  

--------------------
Technologies Used:
--------------------
* HTML/CSS
* JavaScript & EJS
* Mongo

-----------------
NPM Packages
-----------------
* Mongoose
* Express
* Body-Parser
* Method Override
* Express Sanitizer

---------------
UI
---------------
* Semantic UI
* CSS


----------------------------------------------------------------------------------------------------
RESTful Routes
----------------------------------------------------------------------------------------------------
|Name  |   Path    |  HTTP Verb 	  | Purpose									             |    Mongoose Method
|------|:---------:|:--------------:|:------------------------------------:|:----------------------------
|Index	|  /blogs		|	  GET			     | List all blogs								       |         Blog.find()
|New		  /blogs/new		GET			      Show new blog 								                N/A
|Create	/blogs			    POST		      Create a new blog, then redirect			        Blog.create()
|Show	  /blogs/:id		  GET			      Show info about one specific blog			        Blog.findById()
|Edit	  /blogs/:id/edit	GET			      Show edit form for one blog					          Blog.findById()
|Update	/blogs/:id		  PUT			      Update a particular blog, then redirect		    Blog.findByIdAndUpdate()
|Destroy	/dogs/:id		  DELETE		    Deletes a particular blog, then redirects	    Blog.findByIdAndRemove()
--------------------------------------------------------------------------------------------------------
