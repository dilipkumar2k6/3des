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
    var key = new Buffer(param.key);
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
    var iv = new Buffer(param.iv ? param.iv : 0)
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
