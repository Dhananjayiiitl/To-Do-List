const express =require("express");
const bodyParser=require("body-parser");
const mongoose= require("mongoose");
const ejs = require("ejs");
// const { get } = require("express/lib/response");
// const { list } = require("tar");
const app=express()



app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://Dhananjay-admin:test123@cluster0.judr9.mongodb.net/todolistDB")

const todolistSchema={
  name:String
};

const Item=mongoose.model("Item",todolistSchema)

const Playing1=new Item({
  name:"Hey how are you"
});

const Playing2=new Item({
  name:"Lets start making our tudum-list :)"
});

const Playing3=new Item({
  name:"press + to add items"
});

const defaultItems = [Playing1, Playing2, Playing3];

const listSchema = {
  name: String,
  items:[todolistSchema]
}

const List = mongoose.model("List", listSchema)


// var day;
// var item;
// var items=["anshu","mohit","saka"];

// var workList=["homework"];
app.get("/",function(req,res){

  Item.find(function(err,items){
    
      if(items.length ===0)
      {
        Item.insertMany(defaultItems,function(err){
          if(err)
          {
            console.log(err)
          }
          else{
            console.log("success");
          }
        })
        res.redirect("/");
      }
      
      else{
        res.render('list', {kindOfDay: "today",newListItems:items });
      }
      
      
      
      
    
  })

  app.post("/Delete",function(req,res){
    const checkedItemId=req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId,function(err){
      if(!err){
        console.log("successfully deleted item");
        res.redirect("/");
      }
    })
  })

   var today = new Date();
  //  if(today.getDay() === 0)
  //  {
  //    day="Sunday";
  //  }
  //  else if(today.getDay() === 1){
  //    day="Monday";
  //  }
  //  else if(today.getDay() === 2){
  //   day="Tuesday";
  // }
  // else if(today.getDay() === 3){
  //   day="Wednesday";
  // }
  // else if(today.getDay() === 4){
  //   day="Thursday";
  // }
  // else if(today.getDay() === 5){
  //   day="Friday";
  // }
  // else if(today.getDay() === 6){
  //   day="Saturday";
  // }

  // var options={
  //   weekday:"long",
  //   day:"numeric",
  //   month:"long"
  // };

  // day=today.toLocaleDateString("en-US",options);

  
})

app.post("/",function(req,res){

  const itemName=req.body.newItem;

  const Playing=new Item({
    name:itemName
  });

  Playing.save();
// if(req.body.button==='work')
// {
//   workList.push(req.body.newItem);
//   res.redirect("/work");
// }
// else
// {
  
//   items.push(req.body.newItem);
//   res.redirect("/");
// }

res.redirect("/");
})

// app.get("/work",function(req,res){
  
//   var work ="work";
//   res.render('list',{kindOfDay:work,newListitems:workList});
// })

app.get("/arts/:ListName", function(req, res){
 const ListName=req.params.customListName;

List.find(function(err,lists){
  
   if(lists.name!=ListName){
    const list = new List({
      name: ListName,
      items: defaultItems
    });
    list.save()
    res.redirect("/arts/"+ListName)
   } 
   
  else{
    // console.log("exizt")
    console.log(lists);
    res.render("list",{kindOfDay: ListName,newListItems: lists.items})
  }
  
})

//  const list = new List({
//    name: customListName,
//    items: defaultItems
//  })
//  list.save()
})



// app.post("/work",function(req,res){
//   console.log(req.body);
// })



app.listen(process.env.PORT || 3000,function(){
    console.log("server started on port 3000");
})