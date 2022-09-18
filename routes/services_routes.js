const express = require("express");
const router = express.Router();
const model = require("../DB/Services");

router.get("/", async (req, res) => {
  // let user = new User(req.body);
  // let result = await user.save();
  // result = result.toObject();
  // delete result.password;
  res.status(500).json({ meaaage: Error });
  res.send("hello from router");
});
router.post("/", async (req, res) => {
  let model = new model(req.body);
  let result = await model.save();
});

router.post("/windo", async (req, res) => {
  const id = req.body.windo_no
  //    let Model = new model({"windo_no":"2"});
  console.log(id)
  let Model = new model({ windo_no: id });
  const result = await Model.save();
  res.send("hello from wino");
});




//********************* services */

//*->insert

router.post("/addses/:no", async (req, res) => {
  console.log("result");
  const id = req.params.no;
  console.log(id);
  let result = await model.updateOne(
    { windo_no: id },
    {
      $push: { services: req.body.services },
    }
  );

  res.status(201).send();
});


router.post("/addses/:wid/:sid", async (req, res) => {
    console.log("result");
    const wid = req.params.wid;
        const sid = req.params.sid;
        const time = req.body.services_time;
    console.log(wid,sid,time);
    let result = await model.findOneAndUpdate({ windo_no: wid},
        {  $set: { 'services.$[elem].services_time': time }
    },{new: true,arrayFilters: [ { 'elem.services_id': sid } ] 
 }
 
        )
  console.log({result})
    res.status(201).send();

  });
  

// router.get("/gtoken/:sid", async(req,res)=>{

//   const sid = req.params.sid;
//   const m_no =req.body.m_number
//   const allocated_time=
//   const tokenid=

// //holiday
// //timeup
// //token

// })

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

router.get("/wtime/:wid",async(req,res)=>{ 
  const wid = req.params.wid;
 // let result = await model.find({ $and:[{windo_no: wid},{}]})
  let result = await model.find({windo_no: wid,"date.date":Date.now()})
  res.send(result)
})

router.get("/wtime/:wid",async(req,res)=>{ 
  const wid = req.params.wid;
 // let result = await model.find({ $and:[{windo_no: wid},{}]})
  let result = await model.find({windo_no: wid,"date.date":Date.now()})
  res.send(result)
})






//*->time change
// router.post("/addses/:wid/:sid", async (req, res) => {
//     const wid = req.params.wid;
//     const sid = req.params.sid;
//     const time = req.body.services_time;

//     console.log(sid,wid,time);
//     // let result = await model.updateOne(
//     //   { windo_no: wid , services:{services_id:sid}},
//     //   {
//     //      $set: {services_time:time},
//     //   }
//     // );
//     model.find({windo_no: wid,'services.servise.services_id':sid}, function(err, foundses){
//         // ---
//         console.log(foundses[0])
//         // console.log(foundses[0].services)
// console.log( foundses[0].services.find())
//     //   foundses[0].services.find({services_id:sid}, {
//     //      $set: {services_time:time},
//     //   })
//      })

//     //  model.updateOne({'services.services_id':sid}, 
//     //  function(err, foundses){
//         // ---
//     //    { $set: {'services.services_name':time}}
//         // console.log(foundses)
//         // foundses.find({'services.services_id':sid}, {
//         //         //  $set: {services.services_time:time},
//         //       })
//     //  }
//     //  );
  
//     res.status(201).send();
//   });



module.exports = router;
