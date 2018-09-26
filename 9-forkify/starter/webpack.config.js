// To be able to use an **absolute path, we will use built in Node package
const path = require('path');

//including html webpack plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

// one object in which we will specify our 
// configurationsettings.

// Then we will ***export this object from 
// this file, using NodeJS syntax.

// This is configuration object. The Webpack 
// will take this object and will use it...


module.exports = {
    // Writing this configuration we need to 
    // know 4 CORE CONSEPTS: 
    //1.ENTRY POINT 2.THE OUTPUT 3.LOADERS 
    // 4.PLUGGINS

    // ENTRY pointi s where the Webpack will start the bundling(??), ie. it
    // is a file where Webpack will start looking for all the dependencies, 
    // which then should be bundled together. 

    // For now we jus want one entry file - 'index.js'
    // NOTE: './' - dot means a current file
    entry: ['@babel/polyfill', './src/js/index.js'],

    //output property will tell where to save ***bundle 
    // file
    output: {
        //here we put he path to the folder, and the 
        // file name
        path: path.resolve(__dirname, 'dist'), // it should be an absolute path. SO we will ***join an absolute path - '__dirname' with the one that we want our bundle to be in - 'dist/js'
        filename: 'js/bundle.js'

        // NOW Webpack will output our file to this directory, with 'bundle.js' filename.
    },

    // configuring dev server
    devServer: {
        //specifying folder from whitch ***webpack
        // should serv our files:
        contentBase: './dist'

    },

    //plugins allows us to do complex processing of our input files (in this case 'index.html'). We need to use a plugin called 'htmlwebpackplugin'(?). In order to use it we need to install it.

    // it receives an array of all the plugins that we are using
    plugins: [
                // common way in JS to pass an ***options by using objects




        // When we are bundling our JS files, we also
        // want to copy our source html into ****dist 
        // (distribution) folder and include the 
        // script into JS bundle.
        new HtmlWebpackPlugin({
            filenamw: 'index.html',

            //that is our starting html file, and it is located at '/src'
            template: './src/index.html'

        })
    ],
    
    
    module: {
        //rules property. Rules will receive an array of all of the loaders that we want to use. AND for each loader we need an ***object
        
        
        rules: [
            
            //WHAT DOES THIS RULE DOES?
            //A: -It tests for .js at the end of files, and then IT WILL APPLU BABEL LOADER
            {
                // will use 'regular expression'. And in this regular expressions we need to say is ***that we want to test for all JS files***
                test: /\.js$/,
                
                // we want to 'exclude' everything what is in the node modules... If we will not do this, then Babel will applay to all the 1000-s of JS files, that are inside of node_modules folder.
                exclude: /node_modules/, // we use it as a 'regular expression with '/' slashes around it.
                
                //all of JS files will use the Babel loader:
                use: {
                    loader: 'babel-loader' /// 'babel-loader' - is the package that we have installed
                }
            }
            
            
        ]
    }
    
};


// We can make it a litle better coz we have 'production' and the 'developement' modes.

//'developement' mode simply builds our ***bundle without minifying our code in order to be AS FAST AS POSSIBLE

// 'production' mode will automaticaly enable all kind-off optimisation eg. minifkation, treeshaking in order to ***reduce the FINAL BUNDLE SIZE



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// webpack as well provides a ***development server***, which will automaticaly bundle all our JS AND THEN WILL RELOAD AN APP IN THE BROWSER, WHENEVER WE CHANGE THE FILE (it saves time).
// For it need to instal ***webpack dev server***


// dev server is simulating real environment with real http server (THAT IS MUCH BETTER).



// BABEL - is a JS compiler, allowes to use Next generation JS


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//LOADERS

//Loaders in webpack alloves to ***import or to ***load diferent filesb, AND to process them. IE. eg. converting ses(?) to css code, OR convert ES6 code to ES5 JS.
// For this purpose we need ***BABEL loader***, because Babel is the one that will convert that ES6 to ES5.







































