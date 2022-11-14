//importing
import express from 'express'
const app = express()
import Pusher from 'pusher'
import cors from 'cors'

// import  ObjectId from 'mongodb';
const port = process.env.PORT || 9000

app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","*")
    next();
})
app.use(cors())

var teams = [];

//app route

app.post('/',(req,res)=> {
    pusher.trigger('main','current',{
        questionId:req.body.n
    });
    res.status(200).send("Hello from backend")
});

app.post('/reveal',(req,res)=> {
    pusher.trigger('main','reveal',{
        questionId:req.body.n
    });
    res.status(200).send("revealed")
});

app.post('/addTeam',(req,res)=> {
    const _id = parseInt(Math.random()*10000);
    const newTeam = {
        team:req.body.name,
        points:0,
        rank:0,
        attempted:0,
        id:_id
    };
    
    teams.push(newTeam);
    pusher.trigger('main','team_added',{
        team:teams
    });
    res.status(200).send(teams)
});

app.get('/getTeam',(req,res)=> {
    res.status(200).send(teams)
});

app.post('/removeTeam',(req,res)=> {
    const id = req.body.id;
    teams = teams.filter(team=>team.id!=id)
    res.status(200).send(teams)
});

const pusher = new Pusher({
  appId: "1202226",
  key: "2142cda6d39765cba2a9",
  secret: "93c2b88777c4c5d29975",
  cluster: "ap2",
  useTLS: true
});


app.listen(port, ()=>{
    console.log("Runnig on port",port);
})