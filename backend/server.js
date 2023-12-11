import express from "express"
import mysql from "mysql"
import cors from 'cors';

const app=express();
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"employee"
})
app.get('/',(req,res)=>{
    const sql="SELECT * FROM emp_details";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.post('/', (req, res, next) => {
    const sql = "INSERT INTO emp_details (ID, Name, Designation, Salary, DOB) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.ID,
        req.body.Name,
        req.body.Designation,
        req.body.Salary,
        req.body.DOB,
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log("created");
    });
});

  
app.delete('/:ID', (req, res, next) => {
    const sql = "DELETE FROM emp_details WHERE ID= ?";
    const ID=req.params.ID;

    db.query(sql, [ID], (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log("deleted");
    });
});



app.listen(8081, ()=>{
    console.log("Listening...");
})