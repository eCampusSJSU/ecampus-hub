var axios = require('axios');
var vuforia = require('vuforia-api');

// init client with valid credentials
var client = vuforia.client({

    // Server access key (used for Vuforia Web Services API)
    'serverAccessKey': process.env.VUFORIA_SERVER_ACCESS_KEY,

    // Server secret key (used for Vuforia Web Services API)
    'serverSecretKey': process.env.VUFORIA_SERVER_SECRET_KEY,

});

function createImageTarget(req, res){

    client.addTarget(req.body, function (error, result) {

        if (error) { // e.g. [Error: AuthenticationFailure]
            res.status(400).send(JSON.stringify(result));
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });


    /*
    var config = {
      headers: req.headers
    };
      axios
        .post('https://vws.vuforia.com/targets', req.body, config)
        .then(response => {
              res.status(200).send(JSON.stringify(response));
        })
        .catch(error => {
              res.status(400).send(JSON.stringify(error));
        });
    */
}

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.vuforia = (req, res) => {

    // Set CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Credentials", "true");

    if(req.method === 'OPTIONS'){
        return res.status(200).send(JSON.stringify({
            allowedActions: "createImageTarget"
        }));
    }

    switch(req.query.action){
        case "createImageTarget": createImageTarget(req, res);
            break;
        default:
            res.status(200).send(JSON.stringify({
                message: "No action method specified!",
                allowedActions: "createImageTarget"
            }));
            break;
    }

};
