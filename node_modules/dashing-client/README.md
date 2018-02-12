Benbria DashingClient
======================

Sends stats to [Dashing](http://shopify.github.io/dashing/).

Contents
--------

* [What it Does](#what-it-does)
* [Installation](#installation-and-a-quick-intro)


What it Does
------------

DashingClient sends stats to Dashing, the exceptionally handsome dashboard framework.

In much the same way that you can send data from the command line using curl:

    curl -d '{ "auth_token": "YOUR_AUTH_TOKEN", "text": "Hey, Look what I can do!" }'\
    \http://localhost:3030/widgets/welcome

You can send data using DashingClient from your node.js program:

    DashingClient = require('dashing-client');

    dashing = new DashingClient("http://localhost:3030", "YOUR_AUTH_TOKEN");
    dashing.send("welcome", {text: "Hey, look what I can do!"}, function(err, resp, body) {
        // Do callback stuff
    });

Note that you can also pass authentication credentials for basic_auth:

    DashingClient = require('dashing-client');

    dashing = new DashingClient("http://localhost:3030", "YOUR_AUTH_TOKEN",
      {auth: {user: "user", pass: "secret"}});


Installation
------------

Install with:

    npm install dashing-client

Or, add to your package.json

    "dependencies": {
      "dashing-client": ">=0.0.1"
    }

