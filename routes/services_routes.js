const express = require("express");
//const { model } = require("mongoose");
const router = express.Router();
const model = require("../DB/Services");
const login = require("../DB/login");
const holi = require("../DB/holiday");
const poolser = require("../DB/poolser");


router.get("/windowlist", async (req, res) => {
  // let user = new User(req.body);
  // let result = await user.save();
  // result = result.toObject();
  // delete result.password;
  //res.status(500).json({ meaaage: Error });
  let win=await model.find({}).select('windo_no')
  //console.log(win)
  res.send(win);
});
router.get("/servicelist/:wid", async (req, res) => {
  const wid = req.params.wid;
  let win=await model.find({windo_no:wid}).select('services')
 
  res.send(win);
});

//**** */make new window
router.post("/windo", async (req, res) => {
  const id = req.body.windo_no
  //    let Model = new model({"windo_no":"2"});
  console.log(id)
  let Model = new model({ windo_no: id });
  const result = await Model.save();
  res.send("hello from wino");
});

//****login */
router.post("/login", async (req, res) => {
  const password1 = req.body.password;
  const username1 =req.body.username;
  const phone1 =req.body.phone;
  console.log(req.body,password1,username1,phone1)

  let login1 = new login({password: password1 ,
    username: username1 ,
    phone: phone1 });
    let result = await login1.save();
    console.log(result)
    res.status(201).send('done');
});

router.get("/signup", async (req, res) => {
  const password1 = req.body.password;
  const username1 =req.body.username;
  const phone1 =req.phone;

    let result = await login.findOne( {username:username1,password:password1});
    if(result){
      console.log(result)
      console.log(password1)
      res.status(201).send('password ready che');
    }else{
      res.status(500).send('wronge credential');
    }
    

  
});

//****holiday declaration */
router.post("/holiday", async (req, res) => {
  const holi_date1 = req.body.holi_date;
  const holi_reason1=req.body.holi_reason;

  console.log(req.body)

  let holi1 = new holi({holi_date:holi_date1, holi_reason:holi_reason1 });
    let result = await holi1.save();
    console.log(result)
    res.status(201).send(' holiday inserted done');
});


//********************* services */


//*->insert services in given window
router.post("/addses/:no", async (req, res) => {
  const id = req.params.no;
  const sid = req.body.services.sid;
  console.log(id);
  let result = await model.updateOne(
    { windo_no: id },
    {
      $push: { services: req.body.services },
    }
  );
//update it in pool services
let result2 = await poolser.updateOne ( {s_no:sid}, 
  {
    $push:{winows_id:id}
  });
  res.status(201).send();
});

//*->delete services in given window
router.post("/addses/:no/:sid", async (req, res) => {
  const id = req.params.no;
  const sid = req.params.sno;
  console.log(id);
  let result = await model.deleteOne(
    { windo_no: id,services_id:sid },
   //what is del....
  );
//update it in pool services
let result2 = await poolser.deleteOne( {s_no:sid,winows_id:id});
  res.status(201).send();
});


//***perticular window ma perticular servecies no time change karwa */
router.post("/addses/:wid/:sid", async (req, res) => {
    console.log("result");
    const wid = req.params.wid;
        const sid = req.params.sid;
        const time = req.body.services_time;
    console.log(wid,sid,time);
    let result = await model.findOneAndUpdate({ windo_no: wid},
        {  $set: { 'services.$[elem].services_time': time }
    },{new: true,arrayFilters: [ { 'elem.services_id': sid } ] 
 } )
  console.log({result})
    res.status(201).send();

  });

  // for add date regularly and set current_time=starttime
  router.post("/adddate", async (req, res) => {
  
    let result = await model.updateMany({ },
      {
        $push: { date: {date:"2022-10-09"} },
      },
 )
 let result2 = await model.updateMany({ },
  {
    $push: {time:{ current_time: {hours:11}} },
  },
)
    
    res.status(201).send(result);
//holiday check
  });






// ????????????????????????????????????????????????????get token id
router.get("/gtoken/:sid", async(req,res)=>{

// //holiday
res.status(500).send("token is not available");

//const sid = req.params.sid;
//get window no ,things to bring,services

// //timeup if in first check other
res.status(500).send("token is not available");
//   const allocated_time=

//   const m_no =req.body.m_number
//   const tokenid=

//add into db

res.status(201).send(tokenid,time,things,sname);
res.status(500).send("token is not available");
})





//**** get service for client */
//name,sno checkwindow allocated or not


//****get services for user side which have 1 or more window */

router.post("/poolclient", async (req, res) => {
  let result = await poolser.find(
    { winows_id:{$exists: true, $not: {$size: 0}} });
  res.status(201).send(result);
});

// get servicesfor admin
//name,sno ,bring,windows,give all
router.get("/poolclient", async (req, res) => {
  let result = await poolser.find(  );
  res.status(201).send(result);
});

//**post add servicesinto pool */
router.post("/addpool", async (req, res) => {
//name,number and what to bring
  let result = new poolser( req.body );
  let added = await result.save();

  res.status(201).send(added);
});

//*** add or change window time and window */
router.post("/wtime/:wid",async(req,res)=>{ 
  const wid = req.params.wid;
  const st=req.body.start_time
  const et=req.body.end_time
  let result = await model.updateOne(
    { windo_no: wid },
    {
      $set: { 'time.start_time.hours': st.hours,
      'time.start_time.minutes': st.minutes,
      'time.end_time.hours': et.hours,
      'time.end_time.minutes': et.minutes,
     },
    }
  );

})

//***get details of users*/
router.get("/wtime/:wid",async(req,res)=>{ 
  const wid = req.params.wid;
  var ndate =new Date()
const fdate=`${ndate.getUTCFullYear()}-${ndate.getUTCMonth()}-${ndate.getUTCDate()} 14:48 UTC`
var today=new Date(fdate)
console.log( typeof today.toISOString().slice(0,10))
const date=today.toISOString().slice(0,10)
 // let result = await model.find({ $and:[{windo_no: wid},{}]})
  let result = await model.find({windo_no: wid,"date.date":date})
  res.send(result)
})


module.exports = router;
