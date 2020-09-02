const moment=require('moment');
const logger = (req,res,next)=>{
    // console.log("hello");//[print hello in terminal]
    console.log(
        `${req.protocol}://${req.get('host')}
         ${req.originalUrl}:
         ${moment().format()}`);//http://localhost:5000/api/members(with format[http://localhost:5000 /api/members: 2020-09-02T13:20:32+05:30])
     next();
 }
 module.exports=logger;