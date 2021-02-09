const express = require('express')
const path=require('path')

const { Client } =require('pg')
const app=express();
const client = new Client({
  user: 'shamoon',
  host: 'localhost',
  database: 'todoapp',
  password: '123456',
  port: 5432,
});
let todos
client.connect();
const query = `SELECT id, "text"
FROM public."todos";`

client.query(query, (err, res) => {
  if (err) {
      console.log(err);
      return;
  }
  todos = res.rows;
  console.log(todos);

});
app.use(express.json())

function retrivefromDb(req,res,next){
  const query = `SELECT id, "text"
FROM public."todos";`

client.query(query, (err, res) => {
  if (err) {
      console.log(err);
      return;
  }
  todos = res.rows;
  console.log(todos);
  next();

});
}

function addtoDb(req,res,next){
  let text=req.body.text;
  let insertquery = `INSERT INTO public."todos"(
    id, "text")
    VALUES (Default,'${text}');`
client.query(insertquery, (err, res) => {
    if (err) {
        console.log(err);
        return;
    } else {
      console.log(res);
      next();
    }
});
}
function removefromDb(req,res,next){
  let id=req.params.id
  let deletequery=`DELETE FROM public."todos" where id=${id}`
  client.query(deletequery,(err,res)=>{
    if (err) {
      console.error(err)
      return
    }
    else{
      console.log(res)
      next()
    }
  })

}



app.get('/',function(req,res){
  res.sendFile(path.resolve(__dirname ,'../Frontend/index.html'))
})


app.get('/todos',retrivefromDb,function(req,res){
  res.json(todos)
})

app.post('/todos',addtoDb,function(req,res){
  res.statusCode=201
  res.send("Created Successfully")
})


app.delete('/todos/:id',removefromDb,function(req,res){
  res.statusCode=201
  res.send("Deleted Successfully")
})
let port=3000 || process.env.port

app.listen(port,()=>{console.log(`Server Listening on port ${3000}`);})