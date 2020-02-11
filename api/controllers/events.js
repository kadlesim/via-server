'use strict';
var util = require('util');
const https = require('https');

module.exports = {
    events: events
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function events(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    // let data;
    https.get('https://pd.tymy.cz/api/events?login=simon&password=e0fcb7fc608c79e69fdc99ff7050aa72&filter=endTime%3E20200207&order=startTime&limit=10', (resp) => {

        let rawdata;
        resp.on('data', (data) => {
            // console.log(JSON.parse(data.toString()).data);
            console.log('get event data');
            rawdata = data;
        });

        resp.on('end', () => {
            if (JSON.parse(rawdata.toString()).status === "OK") {
                res.json(JSON.parse(rawdata.toString()).data);
            }
        })

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    // this sends back a JSON response which is a single string
    // res.json('test');
}
