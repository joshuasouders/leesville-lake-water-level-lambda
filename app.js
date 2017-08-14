var request = require('request');
var cheerio = require('cheerio');
var AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {

    var docClient = new AWS.DynamoDB.DocumentClient();

    request('http://www.aep.com/environment/conservation/hydro/', function(err, resp, html) {
        if (!err){
            $ = cheerio.load(html);

            var table = "water_elevation";

            var station = 'Leesville Tail Water';
            var elevation = 538;
            var datetime = Date.now();

            var params = {
                TableName:table,
                Item:{
                    "datetime": datetime.toString(),
                    "station": station,
                    "elevation": Number($('#main-content').children('div').children('table').first().children('tbody').children().last().children().last().text())
                }
            };

            console.log("Adding a new item...");
            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    callback("Failure with DynamoDB")
                } else {
                    console.log("Added item:", JSON.stringify(data, null, 2));
                    callback(null, "Success");
                }
            });
        }
        else {
            console.log(err);
            callback("Failure with web crawling")
        }
    });
};