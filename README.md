# Player Stats Card

## Technologies
* Written in ES6, which is transpiled into cross-platform ES5 using Babel and Webpack.
* SASS (SCSS) compiled into CSS through Webpack for styling.

## Structure
Entry `src/index.js` file which handles the rendering and logic for the player. `src/player.js` collects all relevant
data for the player and add prototype methods to access stats and compute some others which have multiple stats in the
computation.

Image assets are stored in `src/img`.

Styling is stored in `src/style`, styling uses the BEM organisation.

## Use

### Requirements
* Node 6
* NPM 4+

### Running

After cloning the repository, install packages using `npm install`, then run the development server using `npm start`. Navigate to `http://localhost:8080`

For production build, run `npm run build`, this outputs files in the `/dist` folder.
