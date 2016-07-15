var express = require('express'),
  router = express.Router(),
  marko = require('marko'),
  mongoose = require('mongoose');
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

// test

var index = marko.load(require.resolve('../views/index.marko'));
var addBook = marko.load(require.resolve('../views/addBook.marko'));
var addReview = marko.load(require.resolve('../views/addReviews.marko'));
var update = marko.load(require.resolve('../views/update.marko'));
var searchBook = marko.load(require.resolve('../views/searchBook.marko'));

/*  Article.find(function (err, articles) {
    if (err) return next(err);
    indexTemplate.render({
      $global: {locals: req.app.locals},
      title: 'Generator-Express MVC',
      articles: articles
    }, res);
  });*/
router.get('/', function (req, res, next) {

      mongoose.model('Book').find({}, function(err, books){
      if(err){
        return console.error(err);
      }
      else{
        //console.log(books.length);
        for(var i=0;i<books.length;i++){
            var sum=0,average=0;
            if(books[i].reviews!=null){
              //console.log("in if");
              for (var j = 0; j< books[i].reviews.length; j++) {
                sum=sum+books[i].reviews[j]["rating"];
              }
              average=sum/books[i].reviews.length;
              //console.log("sum  "+sum+"   review length"+books[i].reviews.length);
              books[i].averageRating =average.toFixed(2);
            }
            //console.log(books[i].title);
            
      }

      //console.log("rendering!");
        
   index.render({ books: books}, res);

      }
    });
});


router.route('/addbook')
  
  .get(function(req, res, next){
    
    //console.log("in get");
    addBook.render({name:'megh'},res);
  })
  .post(function(req, res){
    //console.log("in post1 ");
    console.log("in post title "+req.body.title);
    var title = req.body.title;
    var author = req.body.author;
    var price = req.body.price;
    
    mongoose.model('Book').create({
      title : title,
      author : author,
      price: price
    }, function(err, book){
      if(err){
        res.send("There was an error when adding the information to the database!");
      }
      else{
        
        book.save(function (err) {
          if (!err){ 
            //console.log('Success!');
            mongoose.model('Book').find({}, function(err, book){
              if(err){
                return console.error(err);
              }
              else{
                res.redirect('/');
              }
            });
          }
          else{
            res.send("There was an error when adding the patient information to the database!");
          }
        });
      }
    })
    
  });


  router.route('/delete/:id')
  .get(function(req, res){
    //console.log("in delet");
    mongoose.model('Book').findById(req.params.id, function(err, book){
      if(err){
        res.status = 200
        res.format({
          json: function(){
            res.json({"Message": "Book not found"});
          }
        })
      }
      else{
        
        book.remove(function(err, book){
          if(err){
            res.status = 200
            res.format({
              json: function(){
                res.json({"Message": "Error removing book"});
              }
            })
          }
          else{
            mongoose.model('Book').find({}, function(err, book){
              if(err){
                return console.error(err);
              }
              else{
                res.redirect('/');
              }
            });
            
          }
          
        })
      }
    })
    
  });


  router.route('/addReviews/:id')
  // GET /books
  .get(function(req, res, next){
    
    addReview.render({id:req.params.id},res);
  })
  .post(function(req, res){
  
      mongoose.model('Book').findById(req.params.id, function(err, book){
        if(err){
          res.status = 200
          res.format({
            json: function(){
              res.json({"Message": "book not found"});
            }
          })
        }
        else{
          book.reviews.push({name: req.body.name,review: req.body.review, rating: req.body.rating});
          
          book.save(function (err) {
          if (!err){ 
            
            mongoose.model('Book').find({}, function(err, books){
              if(err){
                return console.error(err);
              }
              else{
                
                  res.redirect('/');  
              }
            });
          }
          else{
            res.send("There was an error when adding the patient information to the database!");
          }
        });
          
        }
      })
      
    });
  

  router.route('/update/:id')
  // GET /books
  .get(function(req, res, next){
    
    mongoose.model('Book').findById(req.params.id, function(err, book){
      if(err){
        return console.error(err);
      }
      else{
        update.render({book:book},res);
      }
    });
    
  })
  .post(function(req, res){
    var title = req.body.title;
    var author = req.body.author;
    var price = req.body.price;
    //console.log("in update post");
    mongoose.model('Book').findById(req.params.id, function(err, book){
      if(err){
        res.status = 200
        res.format({
          json: function(){
            res.json({"Message": "book not found"});
          }
        })
      }
      else{
        mongoose.model('Book').update({
          title : title,
          author: author,
          price : price
        }, function(err, book){
          if(err){
            res.send("There was an error when adding the information to the database!");
          }
          else{
            res.redirect('/');
            
          }

        })
      }

    })
    //return 
  });

  router.route('/searchBook')
    .post(function(req, res, next){
      console.log("hello");
      var searchKey=req.body.key;
      console.log("hieeeeeeeeeeeeeeee");
      console.log("searchkey  ",searchKey);
      console.log("oooooooooooooooooooooooo");
      mongoose.model('Book').find({'title':searchKey},function(err, books){
      if(err || books==""){

        var message="no books to display!"
        searchBook.render({message:message} ,res);
      }
      else 
      {
          for(var i=0;i<books.length;i++){
            var sum=0,average=0;
            if(books[i].reviews!=null){
              //console.log("in if");
              for (var j = 0; j< books[i].reviews.length; j++) {
                sum=sum+books[i].reviews[j]["rating"];
              }
              average=sum/books[i].reviews.length;
              //console.log("sum  "+sum+"   review length"+books[i].reviews.length);
              books[i].averageRating =average.toFixed(2);
            }
          }
          searchBook.render({books:books} ,res);
      }
    
    })
  });
  