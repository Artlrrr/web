module.exports = 
function returnError(e, res, code, mesg){
    console.log(e)
    res.status(code).json({error:{message:mesg}})
}