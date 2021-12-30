const {ObjectId, Schema, model} = require("mongoose");

const WeatherSchema = new Schema({
    forecast: {type:Object, required:true},
    city: {type:ObjectId, ref:'City'},
    queryTime: { type: Date, required: true, default: Date.now() }
})
module.exports = model('Weather', WeatherSchema)