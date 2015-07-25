'use strict';

var remote = require('remote');
var fileUtil = remote.require('./lib/fileUtil');

fileUtil.fetchReadmeList(function(err, matches) {
    if(!err) document.write(matches.join("\n"));
});
