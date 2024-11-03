const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")
const app = express()

app.use(express.json())
app.use(cors())

const pool = new Pool({
    database: "listadealunos",
    user: "postgres",
    host: "localhost",
    password: "12345",
    port: 5432
})


app.get("/alunos",async (req,res)=>{
   pool.query(`create table if not exists listadealunos(
        id serial primary key,
        nome varchar(30) not null,
        idade int not null,
        email varchar(30) not null
        )`)
   const alunos = await pool.query("select * from listadealunos order by id")
   //console.log(alunos)
   res.json(alunos.rows)

})

app.post("/enviaralunos",async (req,res)=>{
    console.log(req)
    pool.query(`insert into listadealunos(nome,idade,email) values($1,$2,$3)`,[req.body.nome,req.body.idade,req.body.email])
})
app.put("/editaralunos",async(req,res)=>{
    console.log(req.body)
    pool.query(`UPDATE listadealunos set nome=$1,idade=$2,email=$3 where id=$4`,[req.body.nome,req.body.idade,req.body.email,req.body.id])
})
app.delete("/deletaralunos",async(req,res)=>{
    pool.query(`delete from listadealunos where id=$1`,[req.body.id])
})


app.listen("7000", () => {
    console.log("enviaralunos")
})
