			/**
			 * PostController
			 *
			 * @description :: Server-side logic for managing posts
			 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
			 */

			module.exports = {
				
				// _config: {
			 //        actions: false,
			 //        shortcuts: false,
			 //        rest: true
			 //    },

				'/':function(req, res){
					//this.show();
					var Post = Parse.Object.extend("blog_post_notif");
					var query = new Parse.Query(Post);
					query.find({
					  success: function(results) {
					  	results.reverse();
					    sails.log("Successfully retrieved " + results.length + " scores.");

					    // for (var i = 0; i < results.length; i++) {
					    //   var object = results[i];
					    //   var title = object.get('Title');
					    //   var description = object.get('Description');
					    //   var file = object.get('file');
					    //   //var url = file.url();
					    //   sails.log("url: "+url);
					    // }

					    res.view('post/post',{
			                posts: results,
			            });
					    // Do something with the returned Parse.Object values
					    // for (var i = 0; i < results.length; i++) {
					    //   var object = results[i];
					    //   var title = object.get('Title');
					    //   var description = object.get('Description');
					    //   sails.log(object.id + ' - ' + object.get('Title'));
					      
					    // }
					  },
					  error: function(error) {
					    alert("Error: " + error.code + " " + error.message);
					  }
					});
					//res.view('post/post');
				},

				// 'post': function(req, res){
				// 	res.view();
				// },

				'new': function(req, res){
					res.view();
				},

				'show': function(req, res){
					sails.log("I'm in show function");
					var Post = Parse.Object.extend("blog_post_notif");
					var query = new Parse.Query(Post);
					query.find({
					  success: function(results) {
					    sails.log("Successfully retrieved " + results.length + " scores.");
					    // Do something with the returned Parse.Object values
					    for (var i = 0; i < results.length; i++) {
					      var object = results[i];
					      var title = object.get('Title');
					      var description = object.get('Description');
					      sails.log(object.id + ' - ' + object.get('Title'));
					      
					    }
					  },
					  error: function(error) {
					    alert("Error: " + error.code + " " + error.message);
					  }
					});
				},

				'sendPush':function(req, res){
					
					//var params = req.validator(['objectId', 'title']);
					
					//if(!params){res.redirect('/post');}
					
						var objectId = req.param('objectId');
						var title = req.param('title');
						if (objectId !== undefined || title !== undefined){
							sails.log("I'm gonna send this post via push notification ! OjectId = "+  objectId);
							var Post = Parse.Object.extend("blog_post_notif");
							var objectId = req.param('objectId');
							var title = req.param('title');
							    var queryPush = new Parse.Query(Parse.Installation);
							    Parse.Push.send({
								  where: queryPush, // Set our Installation query
								  data: {
								    alert: title,
								    sound: "cheering.caf",
								  }
								}, {
								  success: function() {
								    sails.log("push Successfully sent");
								    var post = new Post();
									post.id = objectId;
									post.set("isSentPushNotification", true);

									post.save(null, {
									  success: function(post) {
									  	sails.log('New object updated with objectId: ' + post.id);
									  	res.redirect('/post');
									  	},
									  error: function(post, error) {
									    // Execute any logic that should take place if the save fails.
									    // error is a Parse.Error with an error code and message.
									    sails.log('Failed to create new object, with error code: ' + error.message);
									  }
									});
								  },
								  error: function(error) {
								    // Handle error
								    sails.log("error push not sent");
								  }
								});
						} else {
							res.redirect('/post');
						}

						
				},




					// var objectId = req.param('objectId');
					// var Post = Parse.Object.extend("blog_post_notif");
					// var post = new Post();
					// post.id = objectId;
					// post.set("isSentPushNotification", true);

					// post.save(null, {
					//   success: function(post) {
					//     // Execute any logic that should take place after the object is saved.
					//     sails.log('New object updated with objectId: ' + post.id);

					//     var query = new Parse.Query(Parse.Installation);
					// 	//query.equalTo('objectId', objectId);

					// 	Parse.Push.send({
					// 	  where: query, // Set our Installation query
					// 	  data: {
					// 	    alert: "Venez viiiite à l'Amicale!",
					// 	    badge: "Increment",
					// 	    sound: "cheering.caf",
					// 	  }
					// 	}, {
					// 	  success: function() {
					// 	    // Push was successful
					// 	    sails.log("push Successfully sent");
					// 	  },
					// 	  error: function(error) {
					// 	    // Handle error
					// 	    sails.log("error push not sent");
					// 	  }
					// 	});

					//     res.redirect('/post');
					//   },
					//   error: function(post, error) {
					//     // Execute any logic that should take place if the save fails.
					//     // error is a Parse.Error with an error code and message.
					//     sails.log('Failed to create new object, with error code: ' + error.message);
					//   }
					// });
					// res.redirect('/post');
				//},

				'send': function(req, res){
					sails.log("I send datas to Parse : title = "+ req.param("title") + " description = "+ req.param("description"));
					var title = req.param("title");
					var description = req.param("description");
					var default_picture = req.param("default-picture");
					var Post = Parse.Object.extend("blog_post_notif");
					var post = new Post();

					post.set("Title", title);
					post.set("Description", description);
					post.set("isSentPushNotification", false);

					if (default_picture === undefined){
						default_picture = false;
					} else {
						default_picture = true;
					}

					post.set("useDefaultPicture", default_picture);

					sails.log("default_picture = "+default_picture);
					if (default_picture == false){

						

						var fileElement =  req.file('picture');

						// var fileElement = req.file('picture').upload({
						//   dirname: './assets/images'
						// },function (err, uploadedFiles) {
						// });


						sails.log("file element = "+fileElement);
						//if (fileElement[0] !== undefined){
							sails.log("file element = "+fileElement[0]);
							sails.log("debug 2");

							 fileElement.upload(function onUploadComplete (err, files) {				
				    //	Files will be uploaded to .tmp/uploads
				    																		
					    	if (err) return res.redirect('/post');;	
					    	var file = files[0];	
					    	if (file !== undefined){				
							    	sails.log(file);		
							    	var filePath = file.fd;
							    	sails.log("file path = "+filePath);
							    	var fileName = file.filename;
							    	var fileSize = file.size;
							    	var contentType = file.type;
							    	sails.log("Content-Type = "+contentType);
							    	if (fileSize > 0){
							    		sails.log("File size = " + fileSize);

										   // var img = new Image();
										   // img.src = filePath;
										   // sails.log("img.height");
										   // sails.log(img.height);

										var fs = require('fs');
										var fileData = fs.readFileSync(filePath);
										fileData = Array.prototype.slice.call(new Buffer(fileData), 0)
										var newFile = new Parse.File(fileName, fileData);

							    		sails.log("file = ");
							    		sails.log(file);


							    		newFile.save({
							    			success:function(){
							    				sails.log("File upload Successfully");
							    			}, error: function(file, error){
							    				sails.log("Error upload = "+error.message);
							    			}
							    		}).then(function(theFile){
							    			post.set("file", theFile);
							    			sails.log("ici je vais saver mon bazarre");
							    			post.save(null, {
											  success: function(post) {
											    // Execute any logic that should take place after the object is saved.
											    sails.log('[.then success] New object created with objectId: ' + post.id);
											    res.redirect('/post');
											  },
											  error: function(post, error) {
											    // Execute any logic that should take place if the save fails.
											    // error is a Parse.Error with an error code and message.
											    sails.log('Failed to create new object, with error code: ' + error.message);
											  }
											});
							    		});
							    	} else {
											post.save(null, {
															  success: function(post) {
															    // Execute any logic that should take place after the object is saved.
															    sails.log('[else (>0)] New object created with objectId: ' + post.id);
															    res.redirect('/post');
															  },
															  error: function(post, error) {
															    // Execute any logic that should take place if the save fails.
															    // error is a Parse.Error with an error code and message.
															    sails.log('Failed to create new object, with error code: ' + error.message);
															  }
															});
							    	}
							   } else {
									res.redirect('/post');
							   } 	
							    
							    	//sails.log(files[0]);
							    	});

						//}
						//return res.redirect('/post');
					} else {
						post.save(null, {
					  success: function(post) {
					    // Execute any logic that should take place after the object is saved.
					    sails.log('[else default_picture] New object created with objectId: ' + post.id);
					    res.redirect('/post');
					  },
					  error: function(post, error) {
					    // Execute any logic that should take place if the save fails.
					    // error is a Parse.Error with an error code and message.
					    sails.log('Failed to create new object, with error code: ' + error.message);
					  }
					});
					}

					
					//res.view('post/post');
				}

			};


