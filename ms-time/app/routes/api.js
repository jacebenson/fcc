/**
     * @api {get} api/:input
     * @apiName Insert URL
     * @apiVersion 1.0.0
     * @apiGroup GetTime
     * 
     * @apiExample {curl} Example usage:
     * curl https://ms-time.glitch.me/api/timestamp/January 1, 2029
     * curl https://ms-time.glitch.me/api/timestamp/1861920000000

     * @apiParam {String} input
     *      
     * @apiSuccess {Object} timeObj information
     * @apiSuccess {String} timeObj.unixTimeStamp Unix Time Stamp
     * @apiSuccess {String} timeObj.naturalLanguageDate Natural Language Date
     * 
     * @apiSuccessExample Success-response
     *      HTTP/1.1 200 OK
     *      {
     *         "unixTimeStamp": 1861920000000,
     *         "naturalLanguageDate": "Mon Jan 01 2029"
     *      }
     */

    /**
     * @api {get} api/
     * @apiName Insert URL
     * @apiVersion 1.0.0
     * @apiGroup Get
     * 
     * @apiExample {curl} Example usage:
     * curl https://ms-time.glitch.me/api/
     * 
     * @apiParam {String} input
     *      
     * @apiSuccess {Object} timeObj information
     * @apiSuccess {String} timeObj.unixTimeStamp Unix Time Stamp
     * @apiSuccess {String} timeObj.naturalLanguageDate Natural Language Date
     * 
     * @apiSuccessExample Success-response
     *      HTTP/1.1 200 OK
     *      {
     *         "unixTimeStamp": null,
     *         "naturalLanguageDate": null
     *      }
     */
function getTime(input, response) {
    try {
        console.log('input: ' + input);
        var returnObj = {};
        if (input.length > 0) {
            if (isNaN(input)) {//not a number
                var d = new Date(decodeURIComponent(input));
                returnObj.unixTimeStamp = d.valueOf();
                returnObj.naturalLanguageDate = d.toDateString();
            } else {
                var d = new Date(parseInt(input, 10));
                returnObj.unixTimeStamp = d.valueOf();
                returnObj.naturalLanguageDate = d.toDateString();
            }
        }
        console.log(returnObj);
        response.end(JSON.stringify(returnObj, '', '    '));
    } catch (err) {
        response.send(JSON.stringify(err, '', '    '));
        console.error(err);
    }
}
module.exports = function (app) {

    app.route('/api/timestamp/:num')
        .get(function (req, res) {
            
            res.setHeader('Content-Type', 'application/json');
            var input = req.path.replace(/^\/api\//, '');
            getTime(input, res);
        });
    app.route('/api/')
        .get(function (req, res) {
            var returnObj = {
                unixTimeStamp: null,
                naturalLanguageDate: null
            };
            res.end(JSON.stringify(returnObj, '', '    '));
        });
};