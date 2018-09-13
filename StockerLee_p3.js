// Shelby Stocker & Jen Lee

//create server
var http = require("http"),
url = require('url');

const hostname = 'iris.cs.uky.edu';
const LOWERPORT = 5000;
const UPPERPORT = 25000;
const port = generateRandom(LOWERPORT, UPPERPORT); //generates a random port
//output port to console
console.log("Server started. Listing on http://" + hostname + ":" + port);

function serveURL(request, response) {
	var xurl = request.url;
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	//output URL to console
	console.log(xurl);
	//if statement to determine URL destination
	if ((xurl.substr(0,8)).valueOf() == ("/RANDOM/").valueOf()) {
        	giveRandom(xurl,response);
	}
	else if ((xurl.substr(0,9)).valueOf() == ("/GETFILE/").valueOf()) {
		giveFile(xurl, response);
	}
	else if ((xurl.substr(0,9)).valueOf() == ("/EXECUTE/").valueOf()) {
		giveOutput(xurl,response);
	}
	else response.end('Command not recognized.');
}

var server = http.createServer(serveURL);
server.listen(port,hostname);

//function to generate a random number between 2 bounds
function generateRandom(num1, num2) {
	if (num2 > num1)
		var randomNumber = Math.floor(Math.random() * (num2-num1))+num1;
	else if (num2 < num1)
		var randomNumber = Math.floor(Math.random() * (num1-num2))+num2;
	else 
		var randomNumber = num1;
	return randomNumber;
}

// this function finds a random number 
// between 2 numbers in the URL
function giveRandom(xurl,response) {
	//splits command into 3 parts
	var task = xurl.split("/");
	//gets the number part of the statement
	var bounds = task[2];
	bounds.toString(); //converts it to a string
	var nums = bounds.split(":");
	var lowerBound = Number(nums[0]); //gets the first number
	var upperBound = Number(nums[1]); //gets the second number
	//generate a random number
	var randomNumber = generateRandom(lowerBound, upperBound);
	response.write('Random number between ' + lowerBound + ' and ' + upperBound);
	response.write(': ' + randomNumber + '\n');
	response.end();
}

//this function displays the contents of the
//requested file if it exists
function giveFile(xurl,response) {
	var fileName = xurl.substr(9); //gets the name of file to open
        // load filesystem module
	var fs = require('fs');                 
        if (fs.existsSync("./public_html/" + fileName)) { //check if file exists	
		fs.readFile("./public_html/" + fileName, 'utf8', function (err, data) {
			if (err) {
				throw err;
				response.end("403 Forbidden\n");
			}
			else { //if no error
				response.write(data);
				response.end();
			}
		});
	}
	else //if file does not exist
		response.end('403 error: The file chosen cannot be found.');
}

//this function executes a cgi file
function giveOutput(xurl,response) {
	var command = xurl.substr(9); //gets the name of cgi file to excecute
	// load filesystem module
	var fs = require('fs');
	if(fs.existsSync("./public_cgi/" + command)) { //if file exists
		const exec = require('child_process').exec;
		exec('./public_cgi/' + command, function (err, data) {
			if (err) { //if error
				throw err;
				response.end("403 Forbidden\n");
			}
			else { //if no error
				response.end(data);
			}
		});
	}
	else //if file does not exist
	{
		response.end("403 error: The file chosen cannot be found.");
	}
}

