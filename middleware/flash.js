const flashMiddleware = (req, res, next) => {

    res.locals.mensagem = req.flash('mensagem');
    
    next();
  };
  
module.exports = flashMiddleware;