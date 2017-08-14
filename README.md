# leesville-lake-water-level-lambda
Scrapes water level data for Leesville Lake from the AEP website and inserts it into DynamoDB via this AWS Lambda function. The purpose of this scraping/storing is to hold/control a backend log of water levels in Leesville Lake in order to develop a frontend visualization of water level changes. Leesville Lake in Virginia is on the downstream end of Smith Mountain Hydroelectric Dam which means that the lake can experience fluctuations of between 1 and 10 feet per day. A detailed visualization of the water level can have an impact on the recreational prospects of the lake in a given day; kayaking is better if the water level is high, swimming is better if the water level is low, etc.

Data can be found [here](http://www.aep.com/environment/conservation/hydro/)

To run:
* Clone repository
* Run "npm install"
* Create a DynamoDB table in AWS to contain water level data
* Create a new Lambda function using Node
* Zip the contents of this repository, upload the zip file to Lambda and configure Lambda to work
* Use CloudWatch to create a trigger so that it runs the Lambda function every 10 minutes (Cron express is "7/10 * * * ? *")

Libraries:
 * Node.js
 * Require (for getting the HTML of the target webpage)
 * Cheerio (for scraping the webpage contents)
 * AWS-SDK (for DynamoDB interaction)
