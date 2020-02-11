'use strict';

const https = require('https');

function events() {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    // var data = '';

    https.get('https://pd.tymy.cz/api/events?login=simon&password=e0fcb7fc608c79e69fdc99ff7050aa72&filter=endTime%3E20200207&order=startTime&limit=10', (resp) => {

        resp.on('data', (data) => {
            console.log(JSON.parse(data.data));
        })

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

events();
