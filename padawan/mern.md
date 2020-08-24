# Introduction
Usually an application is a combination of different building blocks. This
course is focused on front-end development, however in order to become good at
it, one must also delve into the back-end as well.

In this chapter we will learn about the MERN stack(MongoDB, Express JS, React JS and
Node JS) and basics of back-end development: endpoints, databases, queries and
deployment.

When you access a url, for examle `https://www.google.com/`. You access the
endpoint '/' via a `GET` request. Press `F12`, go to network tab and refresh the page. You can see
all the different resources that the client(front-end/browser) fetches from the
server(back-end). Let's head to another url: `https://www.facebook.com/friends`.
This time the endpoint is `/friends`. Each endpoint send different data for the
client to interpret. That being said, a few things happen under the hood. First
we query data from the database. The database is a system which manages input
and output of data. After that we serialize the data in a format(json for
example) that can be used to be send over the desired protocol(HTTP in our case).

## Trial
1. Create a basic `express` backend that supports the actions for the todo react
app.

2. Merge the react app with the backend

3. Deploy to Amazon Web Services(AWS)

Complete the tasks to earn the badge "Orient express"

## BONUS
Create a babel and webpack config, which transpiles ES6 and lints using airbnb
rules to earn the badge "Cable guy"

When finished with the trial, head over to the [epilogue][epilogue] of the
program for final notes and advice.
