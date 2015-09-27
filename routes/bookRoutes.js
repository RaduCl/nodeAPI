var express = require('express');


var routes = function(Book){
    var bookRouter = express.Router();

    var bookController = require('../controllers/bookController')(Book);
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    //THIS is a middle ware for the './bookId' route
    bookRouter.use('/:bookId', function(req,res,next){
        Book.findById(req.params.bookId, function(err,book){
            if(err)
                res.status(500).send(err)
            else if(book)
            {
                req.book = book;
                next();
            }
            else
            {
                res.status(404).send('no book found');
            }
        });
    });

    bookRouter.route('/:bookId')
        .get(bookController.getBook)
        .put(bookController.putBook)
        .patch(bookController.patchBook)
        .delete(bookController.deleteBook)
    //bookRouter.route('/:bookId')
    //    .get(function(req,res){
    //        res.json(req.book);
    //    })
    //    .put(function(req,res){
    //        req.book.title = req.body.title;
    //        req.book.author = req.body.author;
    //        req.book.genre = req.body.genre;
    //        req.book.read = req.body.read;
    //        req.book.save(function(err){
    //            if(err)
    //                res.status(500).send(err)
    //            else
    //                res.json(req.book)
    //        });
    //    })
    //    .patch(function(req,res){
    //        //prevent patching the id
    //        if(req.body._id)
    //            delete req.body._id;
    //        //loop through the elements that need to be patched
    //        for(var i in req.body){
    //            req.book[i] = req.body[i];
    //        }
    //        req.book.save(function(err){
    //            if(err)
    //                res.status(500).send(err)
    //            else
    //                res.json(req.book)
    //        });
    //    })
    //    .delete(function(req,res){
    //        req.book.remove(function(err){
    //            if(err)
    //                res.status(500).send(err)
    //            else
    //                res.status(204).send('Removed')
    //        });
    //    });
    return bookRouter;
};

module.exports = routes;