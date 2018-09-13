# Web-Programming-Project-3
Project #3 - Due Monday-March 26, 23:59:59pm
============================================

Xelkalai has been informed of the nature of JavaScript and its ability
to run on the server (via nodejs).  He wants a "one stop" web server
that can handle some of his computing needs.  This is due to his
on-board computer system being damaged upon his arrival last year.

You've been contracted to write Xelkalai's server software, Xiri.
Xiri should take URLs via the HTTP service.  Xelkalai wants you
to accept (3) different types of requests:  Random number generator,
document retrieval, and a utility command processor.

Xiri requirements:
=====================
0) The service must be written in JavaScript executed by the nodejs
   interpreter.
1) Your JavaScript can use the modules included in the basic nodejs 
   system.
2) You cannot use any external modules.  You cannot install any extra 
   modules.  The server shall be completed with the modules listed 
   in the requirements.
3) Your server shall execute and run properly on the CS.UKY.EDU systems.
4) Your server shall accept HTTP requests via URLs in the following
   format:

   /RANDOM/[0-9]+:[0-9]+

   or

   /GETFILE/[a-zA-Z0-9_]+.html

   or

   /EXECUTE/[a-zA-Z0-9]+.cgi

   [NOTE: these are NOT complete solutions to the reg. expressions]

   Valid examples:

       /RANDOM/1:10       { would return a random number
                            between 1 and 10, inclusive }

       /RANDOM/20:200     { random between 20 and 200, inclusive }

       /GETFILE/myresume.html { returns the file myresume.html }

       /EXECUTE/uptime.cgi { returns the output from the uptime.cgi
                             command }

   Invalid examples:
        /../somefile.html
        /wrongurl.cgi
        /1;20
        /GETFILE/extra/myresume.html


    Your program will return one of the four following things:
    1) the text document containing the random number generated
    2) the file they asked for 
    3) the output from the command executed
    4) an appropriate error message


STEPS:

    1) call http.createServer(serveURL)
       serveURL() is a function that you shall write to process
       requests from the user via their browser/client.
    2) serveURL() will do the following 3 things:
           1) output to the console the URL requested
           2) use a regular expression to make sure the URL
              is in the correct form as noted above.  Note that
              the examples and notation above are not complete,
              they still allow impermissible URLs.  You need to
              complete them.

           3) call (3) separate functions, that you shall write.

              giveRandom() - your server shall parse the upper
              and lower bounds and generate a random number
              that is between the bounds (inclusive).  Your
              server will return this in the response in
              an appropriate format.

              giveFile() - your server shall attempt to open the
              file requested.  If it exists, and you can read it,
              then the contents shall be returned as a response
              to the client.  Nothing from the file should be
              changed.  Only files stored in the directory
              "public_html" shall be served.  Note that the
              path "public_html" shall NOT be part of the URL,
              it is assumed and used for security purposes.

              If the file does not exist, return a 403 error code 
              and an appropriate error text.

              giveOutput() - your server shall try to execute the
              command given in the URL.  Only commands residing
              in the directory "public_cgi" shall be executed.
              "public_cgi" is part of the path, but NOT part of
              the URL.

              If the file does not exist, return a 403 error code
              and an appropriate error text.

      OPTIONAL:  you can check if a file exists for a requested URL
      in serveURL() before calling the give*() functions.  Your
      program shall not do this before the regular expression is
      checked!

      REQUIRED: your program MUST use fs.readFile(), it MUST NOT
      use fs.readFileSync() !

    3) The http object requires a call to the listen() method.  Your
       program shall call this with at least one option, a port number.
       The port number shall be a random number between 
       LOWERPORT and UPPERPORT inclusive.

       Your program shall output to the console, the URL used, including
       port, like this: 
       "Server started. Listing on http://bel.cs.uky.edu:7876"

       LOWERPORT and UPPERPORT will be defined constants at the top
       of your program.  You should use them as 5000 and 25000.
       I will change them as a test.  What happens when I set them
       both to 8888 ?   Your program shall work correctly.


=====================================================================

JavaScript methods you may need:

    http:
        createServer()
        listen()

    fs:
        existsSync() - check to see if a file exists
        readFile()   - asyncronously read a file

    child_process:
        exec() - executes a command and produces output (and error)
        
    match()          - match a string with a regular expression
    -or-
    test()           - checks a string against a regular expression

    Math:
        floor()
        random()
    

Xelkalai's Contract Requirements:
====================================
0) You shall submit your JavaScript file to Canvas named as 
   "Lastname_p3.js", or "Lastname1Lastname2_p3.js" if you
   work in a team.
1) You shall properly comment your code including putting your
   name(s) at the top.
2) You shall follow Dr. Finkel's checklist for good programming:
   http://www.cs.uky.edu/~raphael/checklist.html
3) Your server shall work with all clients, such as curl/wget!

Teams:

You have the option of working in teams of 2.  Each team member must
contribute equally to the project.
