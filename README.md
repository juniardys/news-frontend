# News Frontend
Frontend app of News Magazine project

# Postman
https://elements.getpostman.com/redirect?entityId=16563585-5fe3595a-8142-4d63-ac76-a1223d3691b4&entityType=collection

# How to run

## Production
### Dependencies
Install all dependecies below:
- [docker](https://www.docker.com)
- makefile ([Windows](https://linuxhint.com/run-makefile-windows)) ([Linux](https://linuxhint.com/install-make-ubuntu/)) ([MacOS](https://formulae.brew.sh/formula/make))
### Setup Env
Copy `.env.docker` to `.env` and setup the configurations.
### First setup and start
Run the following command
```
make init-start
```
Project will be run in port `3000` (http://localhost:3000)
### Run app
Run the following command
```
make start
```
Project will be run in port `3000` (http://localhost:3000)
### List of command
| **Command**                   | **Description**                       |
|-------------------------------|---------------------------------------|
| make init-start               | Initialize setup and start services   |
| make start                    | Start services                        |
| make stop                     | Stop services                         |
| make restart                  | Restart services                      |
| make build                    | Build image and start services        |
| make rebuild                  | Rebuild image and start services      |
| make down                     | Remove services                       |

## Development
### Dependencies
Install all dependecies below:
- [node](https://nodejs.org)
### Installing packages
Run the following command
```
npm install
```
### Setup Env
Copy `.env.example` to `.env` and setup the configurations.
### Run app
Run the following command
```
npm start
```
Project will be run in port `3000` (http://localhost:3000)

# Tech Stack
React.js, Javascript, TailwindCSS, Docker, Node

# Authors
- Juniardy Setiowidayoga ([@juniardys](https://github.com/juniardys))
