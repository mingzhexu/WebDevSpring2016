/**
 * Created by mingzhexu on 4/23/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var CourseSchema = mongoose.Schema({
        id: String,
        title: String,
        school: String,
        term: String,
        instructorId: [String], // list of IDs of instructors teaching this course
        studentId: [String], // list of IDs of students registered this course
        instructors:[String],// list of instructors teaching this course
        students:[String],// list of students registered this course
        description: String,
        specializations: [String],
        workload: String,
        startDate: Date
    }, {collection: 'course'});
    return CourseSchema;
};