const request=require("request")

const forecast=(latitude, longitude, callback)=>{
    const url="http://api.weatherapi.com/v1/current.json?key=d57382789e9c42468b4161902231707&q="+longitude+","+latitude
    request({url, json:true}, (error, response)=>{
        if(error){
            callback("Can't reach the website", undefined)
        }else if(response.body.error){
            callback(response.body.error.message, undefined)
        }else{
            callback(undefined, response.body.location.name+" and the weather is "+ response.body.current.condition.text+" and the temperature there is "+response.body.current.temp_c)
        }
    })

}

module.exports=forecast;