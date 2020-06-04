const request=require('request')
const forecast=(lat,lon,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon)+'&units=metric&APPID=76f725a5fd774fd1f37c3cc1a1eb0a93'
    
    request({url: url,json:true},(error,response)=>{
    if(error){
    console.log("unable to connect to weather service")
    }
    else if(response.body.message){
    console.log('Unable to find location')
    }else{
    // console.log('It is currently '+response.body.main.temp)
    callback(undefined,{
        tempreature:response.body.main.temp
        
    })
    }
}) 

}
module.exports=forecast