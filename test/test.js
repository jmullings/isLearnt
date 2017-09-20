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
while(x!=126){
    isLearnt(url, String.fromCharCode(x), (result)=>{
        var sort = _.sortBy(result);
        console.log(result)
        var arr = compress.timeLine(sort.shift() ,sort.pop(), result.length,compute.variance(sort),compute.mean( sort ),compute.stdev(sort));

        console.log('code', sort.shift() ,sort.pop(), sort.length,compute.variance(sort),compute.mean( sort ),compute.stdev(sort));
        console.log('mean', compute.mean(sort));
        console.log('mean2', compute.mean(arr));
        console.log('stdev1', compute.stdev(sort));
        console.log('stdev2', compute.stdev(arr));
        console.log('variance', compute.variance(sort));
        console.log('variance2', compute.variance(arr));
        console.log('sum', compute.sum(sort));

        console.log('sum', compute.sum(arr));

    });
    x++
}

console.timeEnd(labelWithTime);


