function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w("<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <meta itemprop=\"description\" name=\"Description\" content=\"Async Fragments Demo using Marko\"> <title>Marko with Express</title> <link rel=\"stylesheet\" href=\"../css/style.css\"> <link rel=\"stylesheet\" href=\"../css/bootstrap.min.css\"> <script type=\"text/javascript\" src=\"../js/jquery.min.js\"></script> <script type=\"text/javascript\" src=\"../js/bootstrap.min.js\"></script> </head> <body> ");

    if (data.books == "") {
      out.w("<div><h2>There are no books to show</h2></div>");
    } else {
      out.w("<div class=\"col-md-6\" align=\"center\"> <table class=\"table table-bordered table-hover\"> <thead> <tr> <th>Title</th> <th>Author</th> <th>Price</th> <th>Average Rating</th> <th>Reviews</th> <th></th> </tr> </thead> <tbody> ");

      forEach(data.books, function(bk) {
        out.w("<tr> <td>" +
          escapeXml(bk.title) +
          "</td> <td>" +
          escapeXml(bk.author) +
          "</td> <td>" +
          escapeXml(bk.price) +
          "</td> <td>" +
          escapeXml(bk.averageRating) +
          "</td> <td>");

        forEach(bk.reviews, function(rev) {
          out.w("<p>name : " +
            escapeXml(rev.name) +
            " <br> review : " +
            escapeXml(rev.review) +
            " <br> rating: " +
            escapeXml(rev.rating) +
            "<hr></p>");
        });

        out.w(" </td> <td><form action=\"/addReviews/" +
          escapeXmlAttr(bk.id) +
          "\" method=\"get\"> <input type=\"submit\" name=\"addReviews\" value=\"Add reviews\"><br></form> <form action=\"/update/" +
          escapeXmlAttr(bk.id) +
          "\" method=\"get\"> <input type=\"submit\" name=\"update\" value=\"Update\"><br></form> <input type=\"button\" name=\"delete\" value=\"Delete book\" onclick=\"document.location.href=&#39;/delete/" +
          escapeXmlAttr(bk.id) +
          "&#39;\"></td> </tr>");
      });

      out.w(" </tbody> </table> </div>");
    }

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
