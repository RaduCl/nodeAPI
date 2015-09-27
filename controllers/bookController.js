var bookController = function(Book){
    var post = function(req, res){
        var book = new Book(req.body);
        if(req.body.title){
            book.save();
            res.status(201).send(book);
        }
        else
        {
            res.status(400).send('Book title is required');
        }

    };

    var get = function(req,res){

        var query = {};

        //filter by books by genre
        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        //filter books by author
        if(req.query.author)
        {
            query.author=req.query.author;
        }
        //filter books by title
        if(req.query.title)
        {
            query.title=req.query.title;
        }

        Book.find(query, function(err,books){
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    };

    var getBook = function(req,res){
        res.json(req.book);
    }

    var putBook = function(req,res){
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save(function(err){
            if(err)
                res.status(500).send(err)
            else
                res.json(req.book)
        });
    };

    var patchBook = function(req,res){
        //prevent patching the id
        if(req.body._id)
            delete req.body._id;
        //loop through the elements that need to be patched
        for(var i in req.body){
            req.book[i] = req.body[i];
        }
        req.book.save(function(err){
            if(err)
                res.status(500).send(err)
            else
                res.json(req.book)
        });
    };

    var deleteBook = function(req,res){
        req.book.remove(function(err){
            if(err)
                res.status(500).send(err)
            else
                res.status(204).send('Removed')
        });
    };

    return {
        post: post,
        get: get,
        getBook: getBook,
        putBook: putBook,
        patchBook: patchBook,
        deleteBook: deleteBook
    }
}

module.exports = bookController;