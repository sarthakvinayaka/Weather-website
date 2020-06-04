const path=require('path')
const express=require('express')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sarthak Vinayaka'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Sarthak Vinayaka'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help!!',
        name:'Sarthak Vinayaka'
    })
})

app.get('/weather',(req,res)=>{
if(!req.query.address){
    return res.send({
        error:'YOu must provide address'
    })
}

else{

geocode(req.query.address,(error,data={})=>{
    if(error){
     res.send({error})
    }
  
forecast(data.latitude,data.longitude,(error,forecastData)=>{
    if(error){
        res.send({error})
    }
 
res.send({
      temperature :forecastData.tempreature,
      location:data.location,
      address:req.query.address
    })
})

})

}

// res.send({
//     forecast:'It is snowing',
//     location:'india',
//     address:req.query.address 
// })

})

app.get('/help/*',(req,res)=>{
res.render('404',{
    title:404,
    name:'sarthak vinayaka',
    errorMessage:'Help article not found '
})
})
app.get('*',(req,res)=>{
res.render('404',{
    title:404,
    name:'sarthak vinayaka',
    errorMessage:'page not found'
})
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})