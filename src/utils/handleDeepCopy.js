const  _toString = Object.prototype.toString;

const  _slice = Array.prototype.slice;

function isType(dataType) {
    return function (type) {
        return _toString.call(dataType) === '[object ' + type + ']';
    };
}