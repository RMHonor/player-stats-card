# Player Stats Card

## Technologies
* Written in vanilla JS (ES7), which is transpiled into cross-platform ES5 using Babel and Webpack.
* SASS (SCSS) compiled into CSS through Webpack for styling.
* To try and adapt the application for real-time data, the JSON data is outputted through a AWS lambda function (node 6), 
passed through API Gateway. This allows individual players to be queried by ID. (see `lambda.js` for the function implementation)

## Structure
Given the limitation of vanilla JS, this project was structured in a unique way. 
Each page has its own directory in `src/pages` container its HTML and JS file, which is bundled with webpack and injected into the head of the HTML. These index JS 
files make use of global methods through the `src/lib` directory. In future, this could use a CommonChunksPlugin to reduce build size.

In this application, I attempted to create a basic DOM rendering library (`src/lib/dom/render.js`), to create reusable methods to render our DOM.

API calls are made using the fetch API (polyfilled for legacy support using whatwg-fetch). Using ES7's async await, this made for concise API calls to the lambda function.

Image assets are stored in `src/img`.

Global styling is stored in `src/style`, page specific styling is contained within a page's directory.

## Use

### Requirements
* Node 8
* NPM 5 (for package-lock)

### Running

First, install packages using `npm install`, then run the development server using `npm start`. Navigate to `https://localhost:8080` 

For production build, run `npm run build`.


## TODO
* Bundle common libraries using CommonChunksPlugin.
* Optimise webpack build by removing sourcemaps and uglification.
* True sprite-sheeting.
* Massive styling overhaul.
