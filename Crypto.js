'use strict';
/*
 *  Offers related services.
 */
var crypto = require("crypto");

module.exports = {
    encrypt: function (plainText) {
        //Get encryption key as char string i.e. of 24 size        
        return encrypt({
            alg: 'des-ede3', //3des-ecb  
            autoPad: true,
           key: '73AD9CEC99816AA6A4D82FB2',
            plaintext: 'Hello World',
            iv: null
        });
    }
};

function encrypt(param) {
    var key = hexToBufferArray(param.key);
    var iv = new Buffer(param.iv ? param.iv : 0);
    var plaintext = param.plaintext;
    var alg = param.alg;
    var autoPad = param.autoPad;

    //encrypt  
    var cipher = crypto.createCipheriv(alg, key, iv);
    cipher.setAutoPadding(autoPad);  //default true  
    var ciph = cipher.update(plaintext, 'utf8', 'hex');
    ciph += cipher.final('hex');
    console.log(alg, ciph);
    return ciph;

}



function decrypt(param) {
    var key = new Buffer(param.key);
    var iv = new Buffer(param.iv ? param.iv : 0);
    var alg = param.alg;
    var autoPad = param.autoPad;

    //decrypt  
    var decipher = crypto.createDecipheriv(alg, key, iv);
    cipher.setAutoPadding(autoPad);
    var txt = decipher.update(ciph, 'hex', 'utf8');
    txt += decipher.final('utf8');
    console.log(alg, txt);
    return txt;
}

function fromDigit(ch) {
    var number = 0;
    if (ch >= '0' && ch <= '9')
        number = ch.charCodeAt(0) - '0'.charCodeAt(0);
    if (ch >= 'A' && ch <= 'F')
        number = ch.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    if (ch >= 'a' && ch <= 'f')
        number = ch.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
    return number;
}

function hexFromString(hex) {
    var len = hex.length;
    var buf = [];
    var i = 0;
    while (i < len) {
        var charAtFirstPlace = hex.charAt(i++);
        var charAtSecondPlace = hex.charAt(i++);
        var byteData = (fromDigit(charAtFirstPlace) << 4) | fromDigit(charAtSecondPlace);
        buf.push(byteData);
    }
    return buf;
}

function hexToBufferArray(hex) {
    var buf = hexFromString(hex);
    var buffer = new Buffer(buf.length);
    for (var i = 0; i < buf.length; i++) {
        buffer[i] = buf[i];
    }
    return buffer;
}

var hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

function hexToString(ba, offset, length) {
    var stringValue = "";
    var j = 0;
    var k;

    for (var i = offset; i < offset + length; i++) {
        k = ba[i];
        var hexAtFirstPosition = hexDigits[(k >>> 4) & 0x0F];
        var hexAtSecondPosition = hexDigits[k & 0x0F];
        stringValue = stringValue + hexAtFirstPosition;
        stringValue = stringValue + hexAtSecondPosition;
    }
    return stringValue;
}
