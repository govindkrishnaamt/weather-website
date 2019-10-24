const request = require('request')
const forecast = (latit,longit,callback) => {
    const url = 'https://api.darksky.net/forecast/afe24490b080c58ea7b02861b3378c20/'+latit+','+ longit +'?lang=en'
    request({url : url, json: true},(error,response) => {
            if(error){
                callback('Unable to connect to internet',undefined)
             }
            else if(response.body.error){
                callback('Unable to findthe coordinate',undefined)       
             }
            else{
                callback(undefined, {
                    summary:response.body.currently.summary,
                    temperature:response.body.currently.temperature,
                    precepchance :response.body.currently.precipProbability
                })
            }
        })
    }
module.exports = forecast