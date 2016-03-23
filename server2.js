/**
 * Created by mingzhexu on 3/20/16.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public2'));

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer());

var courses = [
    {title:"Java", seats: 23, start: new Date()},
    {title:"C#", seats: 9, start: new Date()},
    {title:"Node", seats: 12, start: new Date()},
    {title:"CS", seats: 2, start: new Date()},
    {title:"ML", seats: 3, start: new Date(2016,1,25)}
];

app.get("/rest/course/:id", function(req, res)
{
    var index = req.params["id"];
    res.json(courses[index]);
});

app.get("/rest/course", function(req, res){
    res.json(courses);
});

app.delete("/rest/course/:id", function(req, res)
{
    var index = req.params["id"];
    courses.splice(index,1);
    res.json(courses);
});

app.post("/rest/course", function(req, res){
    var course = req.body;
    courses.push(course);
    res.json(courses);
});

//update
app.put('/rest/course/:id',function(req, res){
    var index = req.params["id"];
    var course = req.body;
    courses[index].title = course.title;
    courses[index].seats = course.seats;
    courses[index].start = course.start;
    res.json(courses);
});

app.listen(3000);