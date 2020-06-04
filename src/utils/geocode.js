const request=require('request')
const geocode=(address,callback)=>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FydGhha3ZpbmF5YWthIiwiYSI6ImNrYXdmcWk4cDFhY3MycW9jcGRmd3lwcHAifQ.Jbgtg66LsX_uLaMZIvpTyw&limit=1'
request({url:url,json:true},(error,response)=>{
if(error){
    callback('Unable to connect to location services')
}else if(response.body.features.length===0)
{
    callback('Unable to find location try another search',undefined)
}
else{
    callback(undefined,{
        longitude:response.body.features[0].center[0],
        latitude:response.body.features[0].center[1],
        location:response.body.features[0].place_name
    })
}
})
}
module.exports=geocode
