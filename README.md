# Asset Distro React App

## Table of contents

- [General info](#general-info)
- [Built With](#built-with)
- [Folder Structure](#folder-structure)
- [Pages and Features](#pages-and-features)
- [Documentation](#documentation)
- [Setup](#setup)

## General info

A well designed React app themed for a record label using only functional components and hooks. State management is done entirely using the Context API and React hooks. Supports complete Signup and Login authentication flows. Authenticated users can access the dashboard and upload Albums and Singles. Ensures that mongo and firebase are in sync at all times.

## Built With

- React - The web framework used
- [Material UI](https://material-ui.com/) - React UI framework
- [Formik](https://github.com/formium/formik) with [Yup](https://github.com/jquense/yup) validation - For building forms
- [music-metadata-browser](https://github.com/Borewit/music-metadata-browser) - metadata parser used for music file validation
- [axios](https://github.com/axios/axios) - Promise based HTTP client
- [React icons](https://github.com/react-icons/react-icons) - Popular icon pack
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
│   ├───components
│   ├───config
│   ├───constants
│   ├───pages
│   ├───state
│   │   ├───api
│   │   ├───constants
│   │   ├───reducers
│   │   └───Store.js
│   ├───styles
│   └───utils
</pre>

| Folder          | Description                                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| assets          | Material needed for the project such as images and svgs                                                                                                             |
| components      | React components that are reusable                                                                                                                                  |
| config          | Services such as firebase have config defined here. The rest of the app imports those services (such as firebase auth) from here                                    |
| constants       | Files that contain constants such as route names, form schemas - things that have a fixed value                                                                     |
| pages           | Contains pages. Ideally a page is something that only contains imports and UI while logic is abstracted to components and to the store. Each route displays a page. |
| state           | Everything related to state management is housed here. Store.js contains the Context store .                                                                        |
| state/api       | Functions that handle async tasks by interacting with firebase and mongo                                                                                            |
| state/constants | Constants related to the state such as action types                                                                                                                 |
| styles          | Files related to styling such as CSS files and Material UI theme providers                                                                                          |
| utils           | Extra features for the app that improve user experience. Currently only contains logic for the global notification system.                                          |

## Documentation

- [Documentation](https://clearly-outsane.github.io/firebase-mongo-boilerplate/index.html) - Description of various methods and type definitions used in the codebase
- Medium article series coming soon!

## Setup

Project was made using [create-react-app](https://github.com/facebook/create-react-app)  
To run this project, clone this repo and then:

```
$ cd ../cloned_directory
$ npm install
$ npm start
```
