/**
 * Created by mingzhexu on 4/4/16.
 */
module.exports = function(mongoose){
    var FieldSchema = mongoose.Schema({
        label: String,
        type: String, enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'],
        placeholder: String,
        options: [{label:String,value:String}]
    }, {collection: 'field'});
    return FieldSchema;
};