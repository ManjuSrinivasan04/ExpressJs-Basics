/*const express = require('express');
const app = express();
app.get('/',(req,res)=>{
     res.send('Hello!!! World');
});
const PORT=process.env.PORT||5000; //running in 3000
app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`));//gives cannnot get / (endpoints/routes) so add app.get()
//By default restart the server to avoid this install nodemon(dev dependencies only for devlopment)(npm i -D nodemon)*/


//to deal with files//to load files

/*const express = require('express');
const path=require('path');
const app = express();
app.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname,'Public','index.html'));
});
const PORT=process.env.PORT||5000; //running in 3000
app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`));*/



const express = require('express');
const path=require('path');

const exnb=require('express-handlebars');
//const moment=require('moment');
const logger=require('./middleware/logger');
const members = require('./members');
const app = express();

//Handlebars Middleware

//set engine 1st
app.engine('handlebars',exnb({defaultLayout:'main'}));
app.set('view engine','handlebars');

//body parser Middleware
app.use(express.json());//handle raw json
//handle form submit
app.use(express.urlencoded({extended:false}));//so that we can handle url coded data

//homepage  router
app.get('/',(req,res)=>{
    res.render('index',{
        title:'Member app',
        members
    });
});


//creating simple middleware(open logger.js (separate module))

/*const logger = (req,res,next)=>{
   // console.log("hello");//[print hello in terminal]
   console.log(
       `${req.protocol}://${req.get('host')}
        ${req.originalUrl}:
        ${moment().format()}`);//http://localhost:5000/api/members(with format[http://localhost:5000 /api/members: 2020-09-02T13:20:32+05:30])
    next();
}*/
//initialise middleware
//app.use(logger);

//creating route using app.get
/*const members = [
    {
        id :1,
        name :'john',
        email : 'john@gmail.com',
        status: 'active'
    },
    {
        id :2,
        name :'mike',
        email : 'mike@gmail.com',
        status: 'inactive'
    },
    {
        id :3,
        name :'bob',
        email : 'bob@gmail.com',
        status: 'active'
    }
];*/ //export in separate file
//when we hit it returning as JSON inplace of stringfy
//get all members


/*
app.get('/api/members',(req,res)=>{
    res.json(members);
});*///view routes folder

//get single member
/*app.get('/api/members/:id',(req,res)=>{
    res.send(req.params.id);//sends it as string
})*/

//there are only 3 ids if 6 is given it sjould give some msg 
/*
app.get('/api/members/:id',(req,res)=>{
    const found = members.some(member=>member.id === parseInt(req.params.id));
if(found){
   res.json(members.filter(member=>member.id === parseInt(req.params.id)));
}
else{
    //res.status(400).json({msg:"Member not found"});
    res.status(400).json({msg:`Member not found of ${req.params.id}`});
}
});*///view routes folder

//set static folder
app.use(express.static(path.join(__dirname,'Public')));//seting public as static folder


//Members api routes
app.use('/api/members',require('./routes/api/members'));
const PORT=process.env.PORT||5000; //running in 3000
app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`))

