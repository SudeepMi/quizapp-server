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

//app route

app.get('/',(req,res)=> {
    pusher.trigger('main','current',{
        questionId:2
    });
    res.status(200).send("Hello from backend")
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