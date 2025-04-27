# cema-app
Cema Health App is a program that simulates a basic health information system for managing clients and health programs/services.

Live preview: https://cema-app-test.vercel.app/

# health program
The app has 3 health programs TB, Malaria and HIV

# Using the app
Upon login the user is presented to the add patient page of which is the client.

Then on filling the form successfully the user is redirected to the patients page where they can view other clients whom have been enrolled.

There's the option to use the searchbar to filter out any specific 'patient' client too.

All clients in this case the patients details are accessible from an api endpoint: https://680c5df82ea307e081d3ce0e.mockapi.io/api/v1/messages/patients 

## Prerequisites
- [Node.js](https://nodejs.org/) (v22 or higher)
- [Ionic CLI](https://ionicframework.com/docs/cli) (v7.2.1 or higher)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Mike-Labs/cema-app.git
cd your-repo
```
### 2. Install Dependancies
```
npm install
```
### 3. Run the Project
```
ionic serve
````
