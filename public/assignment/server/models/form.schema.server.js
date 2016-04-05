/**
 * Created by mingzhexu on 4/4/16.
 */
module.exports=function(mongoose){
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [field],
        created: Date,
        updated: Date
    }, {collection: 'form'});
    return FormSchema;
}