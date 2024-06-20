const express = require('express')
const cors = require ('cors')
const { kar }= require('./index.js')

const app = express()
app.use(cors());

app.get('/result/:seatno',async(req,res)=>{
    const { seatno } = req.params
    const result = await kar(seatno)
    if (result){
        res.status(200).json(result);
    }
    else {
        res.status(404).json({
            msg:"result not found"
        })
    }
})
app.listen(3000)