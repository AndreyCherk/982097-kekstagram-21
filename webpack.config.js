const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/load.js",
    "./js/fullsize-picture.js",
    "./js/pictures-rendering.js",
    "./js/pictures-filters.js",
    "./js/pictures.js",
    "./js/upload-form-status-message.js",
    "./js/upload-form-image-settings.js",
    "./js/upload-form-validity.js",
    "./js/upload-form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
