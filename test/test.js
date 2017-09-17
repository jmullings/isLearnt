/**
 * Created by jlmconsulting on 14/09/2017.
 */
var isLearnt = require('../');
var url = 'mongodb://localhost:27017/isLearnt';
var x = 1;

var labelWithTime = "label " + Date.now();
console.time(labelWithTime);
isLearnt(url, '1'.toString(), (result)=>{
    console.log(result)
});
console.timeEnd(labelWithTime);
