# CivicBot

A Slackbot for interacting with your local government.

[![CivicBot in action](https://www.youtube.com/watch?v=87aQkQmj2Fo)](https://www.youtube.com/watch?v=87aQkQmj2Fo)

CivicBot leverages the [wit.ai platform](https://wit.ai/docs) to support conversational interactions that provide useful information about a city. It's built with the awesome [Botkit library](https://github.com/howdyai/botkit) and it allows you to quickly and easily set up a bot in your Slack channel to get important or useful information when you need it.

CivicBot was built to provide information from the City of Philadelphia (more on this below), but it can be easily ported to any city that has an open data platform or publicly available APIs.

This project is still in its early days - modifications and enhancements are in the pipeline. Any and all contributions or suggestions welcomed.

## Usage

Currently, in order to use CivicBot you'll need to set it up as a standalone app in your Slack channel. To get started, you can follow the steps here:

* Clone project repo and install dependencies: ```npm install```
* Set up an account on [Wit.ai](https://wit.ai/). 
* Create a new application and go to *Settings* and look in the section entitled *API Details* to get your ```Server Access Token```.
* You have the option of [creating new intents](https://wit.ai/docs/console/complete-guide#create-intents-link) for the actions already in the ```intents``` directory - and any new ones you add - or [copy existing](https://wit.ai/blog/2015/03/31/community-search) intents?
* Create a new Slack app and connect CivicBot (the Botkit project has some nice [instructions here](https://github.com/howdyai/botkit#getting-started)).

Wit.ai intents map to file names in the ```intents``` directory. A user's input is sent to wit.ai and an intent (along with accompanying information) is returned to the app. The intent returned from the wit.ai platform determines which particular bit of functionality in the ```intents``` directory to invoke.

After you have all the pieces sete up to run the app, invoke it thusly:

```
~$ slack_token={your-slack-token} wit_token={your-wit-token} npm start
```
## Why Philadelphia

I'm convinced that the [future of open data](http://civic.io/2015/11/06/thinking-small-on-civic-tech/) and civic technology involves building on top of small web services and APIs, and Philadelphia is a city that [has a lot of those](http://phlapi.com/). It's a big city with an active tech community and most likely has a healthy population of Slack users.

That said, the work on this project could very be easily ported to another city. If you would like to do so, and want assistance, [come at me](https://github.com/mheadd).

## Contributing & extending

Add new (or modify existing) functionality in the ```intents``` directory. The files in this directory are small (mostly) self contained Node scripts that represent a specific action  a user wants to take. The name of the file maps directly to the intents returned from the wit.ai platform. If you want to add or modify functions, do the following:

* Create a new file for your action in the ```intents``` directory.
* Add any new dependencies that your action needs to the ```package.json``` file (via ```npm install {module name} --save```).
* Add any configuration elements to ```config.js``` file.
* You can leverage existing utilities or add new ones to the ```utilities.js``` file. For example, ther eis an existing ```getJson``` utility that a number of existing actions leverage.
* Declare your intent in the ```intents.js``` file.
* [Create](https://wit.ai/docs/console/complete-guide#create-intents-link) your action's corresponding intent on the wit.ai platform.