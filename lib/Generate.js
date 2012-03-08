var fs = require('fs');

exports.parse = function(ips) {
  var data = [];
  var err = null;
  
  var seg = ips.split('/');
  var ip = seg[0];
  var s = seg[1];
  if(ip) {
    if(s) {
      var x = Math.pow(2, 32 - s);
      var rank = 0;
      
      if(x >= 256) {
	rank = 1;
	if(x/256 >= 256) {
	  rank = 2;
	  if(x/256/256 >= 256) {
	    rank = 3;
	  }
	}
      }
      data = data.concat(gen(ip, x, rank));
    }
    else {
      data.push(ip);
    }
  }
  
  exports.getlist = function(callback) {
    return callback(err, data);    
  };
  
  return this;
};



var gen = function(ip, x, rank) {
  var out = [];
  // '192.168.10.0' -> [192, 168, 10, 0]
  var splitip = ip.split('.');  

  for(var j = 0; j <= rank; j++) {
    for (var k = 0; k < 256; k++) {
      
      // a[i][j][k]
      
      splitip.splice(3 - j, 1, k);	
      out.push(splitip.join('.'));
    }
  }
  return out;
};