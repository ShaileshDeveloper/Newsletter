const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("requests");


var app = express();

app.get("/",function(req , response){
    response.sendFile(__dirname + "/index.html");
})

app.use(express.static("public"))


app.use(bodyParser.urlencoded({ extended: true}));

app.post("/" , function(req , res){
   const firstName = req.body.fname;
   const secondName = req.body.lname;
   const email = req.body.email;
   
   const data = {
       members : [{
        email_address : req.body.email ,
        status : "subscribed",
        merge_fields :{
           FNAME: firstName,
           LNAME: secondName,
        },
       }]  
   };

    const jsonData = JSON.stringify(data);
    

    const url = "https://us7.api.mailchimp.com/3.0/lists/82d6303a79"
    
    const options = {
        method : "POST" ,
        auth : "shailesh1:3474f1120f159a3afa4f941e2f77f762-us7"
    }

     const request = https.request(url , options , function(response){

        if (response.statusCode == "200"){
            res.sendFile(__dirname)
        }else {
            res.send("badjob")
        }


         response.on("data" ,function(data){
             console.log(JSON.parse(data));
         });     
})

    request.write(jsonData);
    request.end(); 
});

app.listen(3000, function(){
    console.log("good job")
})


// 82d6303a79
// 77230b47f266f29b0cdf8bc16339c57c-us7