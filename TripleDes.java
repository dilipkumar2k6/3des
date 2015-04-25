/**
 * Module: jumpstart
 *
 * --------------------------------------------------------------------------
 *
 * (C) Copyright 2014 American Express, Inc. All rights reserved.
 * The contents of this file represent American Express trade secrets and
 * are confidential. Use outside of American Express is prohibited and in
 * violation of copyright law.  Licence information of all dependent modules
 * can be found https://stash.mps.intra.aexp.com/projects/WF/repos/jumpstart-engine/browse/README.md
 *
 *
 * Description: jumpstart - <DESC_HERE>
 */

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
            autoPad: false,
            key: "73AD9CEC99816AA6A4D82FB273AD9CEC99816AA6A4D82FB2 ",
            plaintext: plainText,
            iv: null
        });
    }
};
function encrypt(param) {
    var key = hexToBufferArray(param.key);
    var iv = new Buffer(param.iv ? param.iv : 0);
    var plaintext = addPadding(new Buffer(param.plaintext));
    var alg = param.alg;
    var autoPad = false;
    //encrypt  
    var cipher = crypto.createCipheriv(alg, key, iv);
    cipher.setAutoPadding(autoPad); //default true  
    var ciph = cipher.update(plaintext, 'utf8', 'hex');
    ciph += cipher.final('hex');
    ciph = ciph.toUpperCase();
    console.log(alg, ciph);
    return ciph;
}



function decrypt(param) {
    var key = hexToBufferArray(param.key);
    var iv = new Buffer(param.iv ? param.iv : 0);
    var decrypttext = removePadding(new Buffer(param.decrypttext));
    var alg = param.alg;
    var autoPad = false;
    //decrypt  
    var decipher = crypto.createDecipheriv(alg, key, iv);
    decipher.setAutoPadding(autoPad);
    var txt = decipher.update(decrypttext, 'hex', 'utf8');
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

function addPadding(inData) {
    var len = inData.length;
    var bp = [];
    var padChars = 8; // start with max padding value
    var partial = (len + 1) % padChars; // calculate how many extra bytes exist
    if (partial === 0) {
        padChars = 1; // if none, set to only pad with length byte
    } else {
        padChars = padChars - partial + 1; // calculate padding size to include length
    }
//create bp array
    var bp = new Buffer(len + padChars);
    console.log("addPadding >> Add padding of " + padChars);
    var padByte = fromDigit(padChars + "");
    bp[0] = padByte;
    //Add original array to dest array
    for (var i = 0; i < len; i++) {
        bp[i + 1] = inData[i];
    }
    return bp;
}

function removePadding(inData) {
    var bp = [];
    var dataLength = inData.length;
    var padLength = inData[0];
    var dataLength = inData.length - padLength;
    bp = new Buffer(dataLength);
    for (var i = 0; i < dataLength; i++) {
        bp[i + 1] = inData[i];
    }
    return bp;
}
