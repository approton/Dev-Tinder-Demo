const userAuth = (req, res, next)=>{
    const token = "xyz";
    const isAuthorized = token=="xyz";

    if(!isAuthorized){
        res.status(401).send("UnAuthorised")
    }
    else{
        next();
    }
}

module.exports = {
    userAuth,
}