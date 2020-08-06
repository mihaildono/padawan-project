## Introduction

Usually an application is a combination of different building blocks. This
course is focused on front-end development, however in order to become good at
it, one must also delve into the back-end as well.

In this chapter we will learn about the MERN stack(MongoDB, Express JS, React JS and
Node JS) and basics of back-end development: endpoints, databases, queries and
deployment.

When you access a url, for examle `https://www.google.com/`. You access the
endpoint '/'. Press `F12`, go to network tab and refresh the page. You can see
all the different resources that the client(front-end/browser) fetches from the
server(back-end). Let's head to another url: `https://www.facebook.com/friends`.
This time the endpoint is `/friends`. Each endpoint send different data for the
client to interpret. That being said, a few things happen under the hood. First
we query data from the database. The database is a system which manages input
and output of data. After that we serialize the data in a format that can be
used to be send over http (usually json).

1. Create basic express backend that supports the endpoints for the react app.

An example [tutorial][tutorial] that can be followed.

3. Deploy to aws

## BONUS
Create a babel and webpack config, which transpiles ES6 and lints using airbnb rules

[tutorial]: https://www.youtube.com/watch?v=PBTYxXADG_k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE
