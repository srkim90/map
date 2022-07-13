function format() {
    var args = Array.prototype.slice.call (arguments, 1);
    return arguments[0].replace (/\{(\d+)\}/g, function (match, index) {
       return args[index];
    });
 }