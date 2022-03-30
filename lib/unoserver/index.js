//     unoserver
//     Original author: HAASEWERL,https://github.com/HAASLEWER/unoconv2
//     Editors: Aaron.Fan 2022/03/30
//     unoserver may be freely distributed under the MIT license.
'use strict';

var _ = require('underscore'),
    childProcess = require('child_process');

var unoserver = exports = module.exports = {};

/**
* Convert a document.
*
* @param {String} file
* @param {String} outputFormat
* @param {Object|Function} options
* @param {Function} callback
* @api public
*/
unoserver.convert = function(infile, outputFormat, options, callback) {
    var self = this,
        args,
        bin = 'unoconvert',
        child,
        stdout = [],
        stderr = [];

    if (_.isFunction(options)) {
        callback = options;
        options = null;
    }

    args = [
        '--convert-to ' + outputFormat,
        infile,
        '-',
    ];

    if (options && options.interface) {
        args.push('--interface ' + options.interface)
    }

    if (options && options.port) {
        args.push('--port ' + options.port)
    }

    if (options && options.bin) {
        bin = options.bin;
    } 

    child = childProcess.spawn(bin,args,{shell: true});    

    child.stdout.on('data', function (data) {
        stdout.push(data);
    });

    child.stderr.on('data', function (data) {
        stderr.push(data);
    });

    child.on('exit', function () {
        // if (stderr.length) {
        //     return callback(new Error(Buffer.concat(stderr).toString()));
        // }

        callback(null, Buffer.concat(stdout));
    });

};

/**
* Start a listener.
*
* @param {Object} options
* @return {ChildProcess}
* @api public
*/
unoserver.listen = function (options) {
    var self = this,
        args,
        bin = 'unoserver';

    args = [ '--daemon' ];

    if (options && options.port) {
        args.push('--port' + options.port);
    }

    if (options && options.bin) {
        bin = options.bin;
    }

    return childProcess.spawn(bin, args);
};