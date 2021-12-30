const {ObjectId, Schema, model} = require("mongoose");

const CitySchema = new Schema({
    name: {type:String, required:true, unique:true},
    weather: [
        {type:ObjectId, ref:'Weather'}
    ],
    queryTime: { type: Date, required: true, default: Date.now() }
})
module.exports = model('City', CitySchema)