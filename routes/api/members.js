const express=require('express')
const router=express.Router();
const uuid=require('uuid');
const members = require('../../members');


//get all members
router.get('/',(req,res)=>{
    res.json(members);
});

//get single member
router.get('/:id',(req,res)=>{
    const found = members.some(member=>member.id === parseInt(req.params.id));
if(found){
   res.json(members.filter(member=>member.id === parseInt(req.params.id)));
}
else{
    //res.status(400).json({msg:"Member not found"});
    res.status(400).json({msg:`Member not found of ${req.params.id}`});
}
});

//create member [use post request]
router.post('/',(req,res)=>{
    //res.send(req.body);//no result so use body parser
    //create new member
    const newMember = {
        id : uuid.v4(), //random univeral id
        name : req.body.name,
        email: req.body.email,
        status: 'active'
    }
    //adding new member to array
    if(!newMember.name||!newMember.email){
        return res.status(400).json({msg:'Please include a name and email'});
    }
    members.push(newMember);
        res.json(members);//shows all members
   //for template
   //res.redirect('/');

});
//upadate members//when you update smthg to server use put

router.put('/:id',(req,res)=>{
    const found = members.some(member=>member.id === parseInt(req.params.id));
if(found){
   const updMember=req.body;
   members.forEach(member=>{
       if(member.id===parseInt(req.params.id)){
           member.name= updMember.name ? updMember.name: member.name;//new name add it 
           member.email=updMember.email? updMember.email:member.email;

           res.json({msg:'Member updated ',member});
       }
   });
}
else{
    //res.status(400).json({msg:"Member not found"});
    res.status(400).json({msg:`Member not found of ${req.params.id}`});
}
});
//delete member

router.delete('/:id',(req,res)=>{
    const found = members.some(member=>member.id === parseInt(req.params.id));
if(found){
   res.json({ msg : 'Member deleted',members:members.filter(member=>member.id !== parseInt(req.params.id))});
}
else{
    //res.status(400).json({msg:"Member not found"});
    res.status(400).json({msg:`Member not found of ${req.params.id}`});
}
});

module.exports=router;