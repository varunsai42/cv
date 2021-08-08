const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const client=require("@mailchimp/mailchimp_marketing");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

client.setConfig({
  apiKey: "90800d4ae6b03f87200476d51c25a580-us6",
  server: "us6",
});



app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const FirstName=req.body.Fname;
  const LastName=req.body.Lname;
  const Email=req.body.Email;


  console.log(FirstName , LastName , Email) ;

  const subscribingUser = {
    firstName: FirstName,
    lastName: LastName,
    email: Email}

  async function run(){
      try {
            const response = await client.lists.addListMember("aa6e9f666d", {
              email_address:Email,
              status: "subscribed",
              merge_fields: {
                FNAME: FirstName,
                LNAME:LastName
              }
            });
            res.sendFile(__dirname + "/success.html");
      }
          catch (error) {
            console.log(error);
            res.sendFile(__dirname + "/failure.html");
          }
  };

  run();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});




app.listen(process.env.PORT || 3000,function(){
  console.log("server is setup at 3000");
});


// key : 90800d4ae6b03f87200476d51c25a580-us6
//list id : aa6e9f666d
