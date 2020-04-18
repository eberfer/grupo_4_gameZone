const locals = (req, res, next) => {
    // comenzamos asumiendo que no hay datos grabados en session,
    // asi que seteamos la autenticacion en "false" y los campos vacios.
    res.locals.isAuthenticated = false;
    res.locals.userId = "";
    res.locals.avatar ="";
    res.locals.userName = "";
    res.locals.admin = "";

    console.log(req.session.user);
    
    
    if (req.session.user) {
        res.locals.isAuthenticated = true;
        res.locals.user = req.session.user;   
        
        //aca voy a poner que lea el rol de usuario
        res.locals.userId = req.session.user.id
        res.locals.avatar = req.session.user.avatar
        res.locals.userName = req.session.user.userName
        res.locals.admin = req.session.user.admin
    }


    next();
}

module.exports = locals;