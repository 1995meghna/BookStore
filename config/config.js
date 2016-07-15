var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'production';
/*
var config = {
  development: {
    root: rootPath,
    app: {
      name: 'bookseller6'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bookseller6-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'bookseller6'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bookseller6-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'bookseller6'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bookseller6-production'
  }
};*/
var config = {
  
  production: {
    root: rootPath,
    app: {
      name: 'assignment6'
    },
    port: process.env.PORT || 3000,
   // db: 'mongodb://localhost/bookMongo'
    //db : 'mongodb://heroku_941xhfzx:3dptdg0233sh90n58mtjd01haj@ds015928.mlab.com:15928/heroku_941xhfzx'
   db :'mongodb://meghna:123@ds011883.mlab.com:11883/heroku_d15nfxnz'
    //db :'mongodb://meghna:123@ds011883.mlab.com:11883/heroku_d15nfxnz'
  }
};

module.exports = config[env];
