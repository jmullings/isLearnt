/**
 * Created by jlmconsulting on 14/09/2017.
 */
var isLearnt = require('../');
var url = 'mongodb://localhost:27017/isLearnt';
var compute = require('compute.io');
var compress = require('../lib/compress');
var _ = require('lodash');
var x = 65;

var labelWithTime = "label " + Date.now();
console.time(labelWithTime);
while(x!=135){
    isLearnt(url, String.fromCharCode(x), (result)=>{
        console.log(result)
    });
    x++
}


console.timeEnd(labelWithTime);


