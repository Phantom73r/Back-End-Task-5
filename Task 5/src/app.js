const geocode=require("../functions/geocode")
const forecast=require("../functions/forecast")
const express=require('express')
const app=express()
const port=3000


const path=require("path")
// const x=path.join(__dirname, "../public")
app.use(express.static(path.join(__dirname,"../public")))
const viewDirectory=path.join(__dirname, "../temp1/views")
app.set("views", viewDirectory)
app.set('view engine', 'hbs')
var hbs=require('hbs')
const partialPath=path.join(__dirname, "../temp1/partials")
hbs.registerPartials(partialPath)




app.get('/', (req,res)=>{
    res.render('index',{
        title:"HomePage"
    })
})

app.get('/teams', (req,res)=>{
    res.render('teams',{
        title:"Teams page"
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        res.send("Please provide a country")
    }
    geocode(req.query.address, (error, data)=>{
        if(error){
           return res.send({error})
        } 
      
        forecast(data.latitude, data.longitude, (error, data1)=>{
            if(error){
               return res.send(error)
            }
            res.send({
                forecast:data1,
                location:req.query.address,
                latitude:data.latitude,
                longitude:data.longitude
            })
        })
    })
    
    })
app.listen(port,()=>{
    console.log(`example of listening to port number ${port}`)
})