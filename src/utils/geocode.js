const request = require('request')
const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ292aW5kYW10IiwiYSI6ImNrMTV6bmI5MTBoNTEzbm4xNXlyZWhrdTQifQ.iTzNjnOBXsKMVPWz-QOkfQ'

    request({ url:url, json:true},(error,response) => {
            if(error){
                callback('unable to connect to the location service!',undefined)
            }
            else if(response.body.features.length === 0){
                    callback('unable to find the location . try another search ! ', undefined)
            }
            else{
                callback(undefined,{
                    latitude :response.body.features[0].center[1],
                    longitude : response.body.features[0].center[0],
                    location : response.body.features[0].place_name
                })
            }   
     })
}
module.exports = geocode