function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <meta itemprop=\"description\" name=\"Description\" content=\"Async Fragments Demo using Marko\"> <title>Marko with Express</title> <link rel=\"stylesheet\" href=\"../css/style.css\"> <link rel=\"stylesheet\" href=\"../css/bootstrap.min.css\"> <script type=\"text/javascript\" src=\"../js/jquery.min.js\"></script> <script type=\"text/javascript\" src=\"../js/bootstrap.min.js\"></script> </head> <body> <form role=\"form\" action=\"/addbook\" method=\"post\"> <div class=\"form-group\"> <label for=\"title\">Title :</label> <input type=\"text\" class=\"form-control\" name=\"title\" placeholder=\"Enter title\"> </div> <div class=\"form-group\"> <label for=\"author\">Author :</label> <input type=\"text\" class=\"form-control\" name=\"author\" placeholder=\"Enter author\"> </div> <div class=\"form-group\"> <label for=\"price\">Price :</label> <input type=\"text\" class=\"form-control\" name=\"price\" placeholder=\"Enter price\"> </div> <input type=\"submit\" class=\"btn btn-default\" value=\"Add book\"> </form> </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
