# Jooy Server
 Jooy server is made including two API rest

## Installation
Below is an example of how you can instruct your audience on installing and setting up your app.
Use the package manager npm to install the project.

1. Get a free API Key at https://www.mapbox.com and https://opencagedata.com
2. Clone the repo 
```
    git clone https://github.com/asmejia1993/jooy-server.git
```
3. Install NPM packages
```
    npm install
```
4. Enter your API KEY  in `.env` file
```
   API_KEY_MAPBOX=
   API_KEY_OPENCAGE=
```
5. You should have installed docker and docker-compose and run the command
```
    docker compose up
```

## Endpoints
| Endpoint| Method|
| --- | --- |
| http://localhost:3000/api/trips/v1?limit=8&offset=2 | GET |
| http://localhost:3000/api/trips/v1 | POST|

## License
[MIT](https://choosealicense.com/licenses/mit/)