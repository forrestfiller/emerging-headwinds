# README

[![Build Status](https://travis-ci.org/forrestfiller/emerging-headwinds.svg?branch=master)](https://travis-ci.org/forrestfiller/emerging-headwinds)

This SPA makes posting jobs and tasks easier. I have tried to keep the code agnostic and modular. Perhaps more importantly, it is designed to be emotionally fulfilling.

The backend is written in Node.js, frontend is in React with Redux, using React-router. I'm currently using Heroku for my deployment. The UI is a little lame for now. I will make it lovely soon.

If you register/login and then wish to logout, for now, after the top level domain, drop in '/account/logout' and you should see a lovely JSON object letting you know that you were successful and that you, the user, are now null! I'll add a button in the near future (but this is more fun, right?). Similarly, if you're curious to know whether or not you are logged in, instead of entering '/account/logout' put in '/account/currentuser' and have a look at your JSON.

###Build Instructions

Note: just a friendly reminder that the Twilio integration in this project won't run on the local server (sorry), so if you wish to SMS your desires to server you'll surely want to deploy to live. I used Heroku, so be sure to check those heroku logs (run ```heroku logs``` on the cli) to see if your messages made it.

1. ```git clone``` this repo, and change directories into the root level directory of the project.

2. Run ```npm install```
(If you have issues check your versions with a ```npm outdated``` and ```npm update```. I've had issues in the past where bluebird fights me and I need to drop in a ```npm rebuild``` to end the complaints.)

3. Make a dotEnv file and toss your secrets in there like so:
    - ```DB_URL=mongodb://localhost/yourProjectNameHere```
    - ```SESSION_SECRET=whateverThisSessionSecretIs```
    - ```TOKEN_SECRET=thowASecretTokenIn!```

3. Run your testing database and server with: ```webpack -w```, ```mongod```, and ```nodemon``` in three separate tabs or windows in your terminal.

4. Head on over to **localhost:3000** in your web browser of choice. When this is working well, you can consider deploying live.

5. If you would like to incorporate the SMS component, you will need a Twilio account and a phone number for use with this project. You set up a POST webhook under messaging from your Twilio number to your soon-to-be-deployed domain at 'http(s)://www.yourDomainName.com/twilio/task'. Be sure to SMS your Twilio number in the following format: "Title. Category. Description." it will post the SMS job/task request to your server, and will render the post on the app. Neat!

###To Do's
- Finish wiring up react-router, which doesn't currently accept a refresh.
- Add in a UI
- Handle the edge-cases with texting in task/jobs, insufficient currently.
- Give user instructions in format to text their task/jobs to the server
- Set up more Twilio functions(yeah!):
	- notify the user who posted a job/task when someone replies to their wishes
	- additional fun things
- gulp and prep project build environment, etc. for proper deployment
