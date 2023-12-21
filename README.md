# community

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# Atpace-forum

### To serve Vue-App with Express
Move into 'node_server' directory and run
```
nodemon server.js
```

#### Pre-requisite 
Run the following command after moving into node_server directory
```
npm i
``` 

If not wroking run:
```
npm i express cors concurrently nodemon --save
```
Note: Always run the command, 'npm run build' after making a change in development in order to serve the content via Express server.