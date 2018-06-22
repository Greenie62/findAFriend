//necessary modules/boilerplate variables

var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var friends=require('./app/data/friends');
var Joi=require("joi")

var app=express();

app.use(bodyParser.urlencoded({extended:true}))

var PORT=process.env.PORT || 3000;

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


//survey page assigned content
app.get("/survey",function(req,res){
    res.sendFile(path.join(__dirname,"/public/survey.html"))
})
//homepage assigend content
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/home.html"))
})


// receiving the response object back from survey.html post request, parsing values into Integers
app.post('/survey',function(req,res){
    var newPerson=req.body;
    newPerson.question1=parseInt(newPerson.question1);
    newPerson.question2=parseInt(newPerson.question2);
    newPerson.question3=parseInt(newPerson.question3);
    newPerson.question4=parseInt(newPerson.question4);
    newPerson.question5=parseInt(newPerson.question5);
    newPerson.question6=parseInt(newPerson.question6);
    newPerson.question7=parseInt(newPerson.question7);
    newPerson.question8=parseInt(newPerson.question8);


    //attempting the matching up logic
    for(var i=0;i<friends.length;i++){
        if(newPerson.question1 === friends[i].question1){
            console.log(friends[i].name + " is your match!!")
            friends[i].inCommon++;
        }
        if(newPerson.question2=== friends[i].question2){
            friends[i].inCommon++;
        }
        if(newPerson.question3 === friends[i].question3){
            console.log(friends[i].name + " is your match!!")
            friends[i].inCommon++;
        }
        if(newPerson.question4=== friends[i].question4){
            friends[i].inCommon++;
        }
        if(newPerson.question5 === friends[i].question5){
            console.log(friends[i].name + " is your match!!")
            friends[i].inCommon++;
        }
        if(newPerson.question6=== friends[i].question6){
            friends[i].inCommon++;
        }
        if(newPerson.question7 === friends[i].question7){
            console.log(friends[i].name + " is your match!!")
            friends[i].inCommon++;
        }
        if(newPerson.question8=== friends[i].question8){
            friends[i].inCommon++;
        }
    }
    for(var i=0;i<friends.length;i++){
        console.log("Here are the results " + friends[i].name +  " " +friends[i].inCommon)
    }
    friends.push(newPerson);
    

    //Use a bubble-wrap to find our winner.
 /*
   function bubbleSort(people){
       var isSorted=false;
       while(!isSorted){
           isSorted=true;
           for(var i=0;i<people.length;i++){
               if(people[i].inCommon > people[i+1].inCommon){
                   isSorted=false;
                   var temp=people[i]
                   people[i]=people[i+1];
                   people[i+1]=temp;
               }
           }
           console.log(people[i])
       }
   }

   bubbleSort(friends)
*/
    /*
  var inCommonArray=[];
  for(var i=0;i<friends.length;i++){
      inCommonArray.push(friends[i].inCommon);
  }
    inCommonArray.sort(function(a, b){return a - b})
    console.log(inCommonArray); */
    res.end()
})

app.get('/match',(req,res)=>{
    res.send(friends[0]);
})

// link to api JSON info
app.get('/api',(req,res)=>{
    res.json(friends)
})








app.listen(PORT,()=>console.log(`Signed onto port ${PORT}`));