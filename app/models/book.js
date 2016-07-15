var mongoose = require('mongoose'); 
var reviewSchema = new mongoose.Schema({  
	name :String,
	review : String,
	rating : Number
});

var bookSchema = new mongoose.Schema({  
  title : String,
  author : String,
  ISBN : Number,
  price: Number,
  reviews : [reviewSchema],
  averageRating : Number
});


bookSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

//mongoose.model('Book', bookSchema);
var Book = module.exports = mongoose.model('Book', bookSchema);