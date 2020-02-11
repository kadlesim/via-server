'use strict';
var util = require('util');
const https = require('https');

module.exports = {
    team: team
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function team(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    // Status of users to be shown. Could be PLAYER, MEMBER, SICK, DELETED, INIT - https://pd.tymy.cz/api/users/status/player
    // now shows all users
    https.get('https://pd.tymy.cz/api/users?login=simon&password=e0fcb7fc608c79e69fdc99ff7050aa72', (resp) => {

        let rawdata = '';
        resp.on('data', (data) => {
            // console.log(JSON.parse(data));
            console.log('get TEAM data');
            // console.log(data.toString());
            rawdata += data.toString();
        });

        resp.on('end', () => {
            console.log('send TEAM data');
            // console.log(rawdata);
            if (JSON.parse(rawdata.toString()).status === "OK") {
                res.json(JSON.parse(rawdata.toString()).data);
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    // this sends back a JSON response which is a single string
    // res.json('test');
}
