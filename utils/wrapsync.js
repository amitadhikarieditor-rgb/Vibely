
//this is the wrapAsync which helps in avoid writing the if else statement for all the routes!!!
module.exports = function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
}