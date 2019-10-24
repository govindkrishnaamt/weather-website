const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()   

//Define path for express config

const dir = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

//setup handlebar engine and locations
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(dir))

 
app.get('',(req,res) => {
    res.render('index',{
        title:'weather App',
        name:'Govind'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Govind'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        msg:'contact system admin',
        title:'Help page',
        name:'Govind'

    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address){
        return res.send({
            error:'Address not found'
        })
        
    }
    geocode(req.query.address,(error,data) => {
        if(error){
            return res.send({error}) //shorthand
        }
        forecast(data.latitude,data.longitude,(error,forecastData) => {
          if(error){
            return res.send({error}) //shorthand
            }
            res.send({
                msg:'Weather of '+data.location+' is given below',
                title:'weather',
                loc:data.location,
                name:'govind',
                weather:forecastData.summary
                })
        //   res.render('weather',{
        //     msg:'Weather of '+data.location+' is given below',
        //     title:'weather',
        //     name:'govind',
        //     weather:forecastData.summary
        //     })
        })
    })
})



app.get('/product',(req,res) => {


    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
       errormsg:' 404 Error,Article not found',
       title:'error',
       name:'govind' 
    })
})


app.get('*',(req,res) => {
    res.render('404',{
       errormsg:' 404 Error,Not Found',
       title:'error',
       name:'govind' 
    })
})




app.listen(3000,() => {
    console.log('Server is up on port 3000')
})
