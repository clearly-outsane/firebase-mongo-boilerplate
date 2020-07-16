# Firebase + Mongo authentication using React hooks

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Pages and Features](#pages-and-features)
- [Documentation](#documentation)
- [Setup](#setup)

## General info

A well designed React app for a record label using only functional components and hooks. State management is done entirely using the Context API and React hooks. Supports complete Signup and Login authentication flows. Authenticated users can access the dashboard and upload Albums and Singles. Ensures that mongo and firebase are in sync at all times.

## Technologies

Project was made using:

- React
- Material UI
- Formik with Yup validation
- music-metadata-browser for music file validation
- axios
- react-icons
- Firebase
- Mongo

## Folder Structure

Brief file description and overview of how the app is organized.

<pre>
firebase-mongo-boilerplate
│   README.md
│   ...
│
└───src
│   └───assets
│   │   ├───imgs
│   │   └───svgs
│   ├───components
│   │   ├───SelectComponents
│   │   └───SignUpForm
│   │   ...
│   ├───config
│   ├───constants
│   ├───pages
│   ├───state
│   │   ├───api
│   │   ├───constants
│   │   └───reducers
│   ├───styles
│   └───utils
</pre>

## Pages and Features

- Beautiful material UI
- Global Notification system
- Social + password SignUp/Login
- Invite user

## Documentation

- [Documentation](https://clearly-outsane.github.io/firebase-mongo-boilerplate/index.html) - Description of various methods and type definitions used in the codebase
- Medium article series coming soon!

## Setup

To run this project, clone this repo and then:

```
$ cd ../firebase-mongo-boilerplate
$ npm install
$ npm start
```
