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
    pusher.trigger('main','team_added',{
        team:teams
    });
    res.status(200).send(teams)
});

app.post('/updateTeams',(req,res)=> {
    const _new_team = JSON.parse(req.body.team);
    teams = _new_team;
    pusher.trigger('main','team_added',{
        team:teams
    });
    res.status(200).send(teams)
});

const pusher = new Pusher({
  useTLS: true,
  appId: "1514841",
    key: "4dd831b4f90804d6ebf4",
    secret:"daf1a93f424b0666a500",
    cluster: "ap2"
});


app.listen(port, ()=>{
    console.log("Runnig on port",port);
})