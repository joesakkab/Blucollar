# BluCollar

## Project Description

BluCollar is an application that allows users to find reliable tradespeople through a simple web interface built on a 
React/Node/MySQL/MUI stack. 

## Features

### Landing Page
BluCollar prompts new users to sign up either as a service provider or a general user needing services on the landing page. It also
introduces the user to what BluCollar is with a brief description.

### Accounts
Service providers can provide many details about their field of work through a description, primary location of work, 
and a designated service type. The primary location of work will be the city, while service type will be the type of work the
contractor does (plumber, electrician, carpenter, etc.). General users only need to provide an email and password to sign up.
A corresponding login page is also provided.

### Search
Both general users and contractors are greeted with a search page in the app. The search page contains both listings, a search bar, 
and a navigation bar. The listings are the primary feature of the app. They allow users to find the best and most reliable contractors
and tradespeople near them. While the app will show users a default list of service providers, the user is able to modify their search
results through a search bar. The service type given by the contractor (such as welder or mechanic) is used in the search algorithm. 
Users are prompted to search by service type through a search bar. After clicking search, their search query will filter the listings
by service type. This allows users to find what they're looking for in the shortest amount of time.

### Profile
Both service providers and users will have the ability to view their profile. Currently, only providers are able to edit their profiles.
Users are able to see the email they used to sign up for BluCollar on their profile. Service providers can see and edit all of their profile
details, including the details that appear in their public listings on the BluCollar search page. This includes modifying their service type,
description, and primary location.

If a general user or service provider clicks on a service provider profile on the search page, it will take them to the profile page corresponding
to the service provider they clicked on. Public profiles show primary location, description, service type, and the full name of the provider. If a
service provider clicks "Profile" on the navigation bar, it will take them to their own profile, but offer the option to edit their profile.

---

## Installation Requirements

1. Clone this repository to your local machine (either by downloading a ZIP or cloning using command line (git)
2. Ensure that [npm](https://www.npmjs.com/package/npm) is installed on your machine. Note that you will need [Node.js](https://nodejs.org/en/download/) installed to be able to install npm
3. Open your command prompt/terminal. Change directories to MSCI-342-Project using 'cd MSCI-342-Project'
4. Run 'npm install --legacy-peer-deps'
5. Run 'cd client' to change to the client directory
6. Run 'npm install --legacy-peer-deps'
7. Run 'cd ../' to go back to the MSCI-342-Project directory
8. Run 'npm install yarn'

9. Create a file called ".env" in the root directory of the project. Then on the first line of the file, write: JWT_KEY="<any string of characters>".
This ensures that the json web token used to verify if a user is logged in or not works correctly.

Steps 10-13 are for extra dependencies needed for the app to function

10. Run 'npm install jsonwebtoken'
11. Run 'npm install bcrypt'
12. Run 'npm install validator'
13. Run 'npm install js-cookies'
14. Run 'npm install dotenv'
15. Run 'yarn dev' to open the application in development mode

If step 15 does not work on your machine, run the following in your command line before running yarn dev:
'export NODE_OPTIONS=--openssl-legacy-provider'

### Summary of Installation Requirements

The commands to run in your command prompt/terminal to install this app and be able to run it in development mode are:
```
cd <where the app is saved>/MSCI-342-Project
npm install --legacy-peer-deps
cd client
npm install --legacy-peer-deps
cd ..
npm install yarn
npm install jsonwebtoken
npm install bcrypt
npm install validator
npm install js-cookies
npm install dotenv
export NODE_OPTIONS=--openssl-legacy-provider
yarn dev
```
