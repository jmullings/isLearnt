/**
 * Created by jlmconsulting on 21/09/2017.
 */

module.exports ={
    timeLine,
    gaussian
};
function gaussian(mean, stdev) {
    var y2;
    var use_last = false;
    return function() {
        var y1;
        if(use_last) {
            y1 = y2;
            use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w  = x1 * x1 + x2 * x2;
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
        }

        var retval = mean + stdev * y1;
        if(retval > 0)
            return retval;
        return -retval;
    }
}



function timeLine( x1, x2, len,vari,mean,stdev ) {
    var arr,
        end,
        tmp,
        d;

    if ( typeof x1 !== 'number' || x1 !== x1 ) {
        throw new TypeError( 'linspace()::invalid input argument. Start must be numeric.' );
    }
    if ( typeof x2 !== 'number' || x2 !== x2 ) {
        throw new TypeError( 'linspace()::invalid input argument. Stop must be numeric.' );
    }
    if ( arguments.length < 3 ) {
        len = 100;
    } else {
        if ( !Number.isInteger(len ) || len < 0 ) {
            throw new TypeError( 'linspace()::invalid input argument. Length must be a positive integer.' );
        }
        if ( len === 0 ) {
            return [];
        }
    }
    // Calculate the increment:
    end = len - 1;
    d = ( x2-x1 ) / end;

    // Build the output array...
    arr = new Array( len );
    tmp = x1;
    arr[ 0 ] = tmp;
    for ( var i = 0; i <= end; i++ ) {
        tmp += d;
        if(i%2 ==0)
            arr[ i ] =  Math.floor(gaussian(mean, stdev)() - Math.floor(Math.random()*(Math.floor(vari/mean/d))+1));
        else
            arr[ i ] =  Math.floor(gaussian(mean,stdev)() +  Math.floor(Math.random()*(Math.floor(vari/mean/d))+1));
    }
    return arr;
}