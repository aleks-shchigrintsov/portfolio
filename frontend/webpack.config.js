var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var BundleTracker = require('webpack-bundle-tracker')

const NODE_ENV = process.env.NODE_ENV || 'development';

var ROOT_PATH = path.resolve(__dirname, '..');
var FRONTEND_PATH = path.resolve(ROOT_PATH, 'frontend');
var SRC_PATH = path.resolve(FRONTEND_PATH, 'src');
var COMPONENTS_PATH = path.resolve(SRC_PATH, 'components');
var PAGES_PATH = path.resolve(SRC_PATH, 'pages');
var COMMON_CSS_PATH = path.resolve(FRONTEND_PATH, 'css');
var BUILD_PATH = path.resolve(ROOT_PATH, 'static/build');
var IMAGE_PATH = path.resolve(SRC_PATH, 'img');
var NODE_MODULES_PATH = path.resolve(FRONTEND_PATH, 'node_modules');
var cssModulesConfigStr = 'modules&sourceMap&camelCase=dashes&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';


module.exports = {
    devtool: NODE_ENV == 'development' ? 'eval-source-map' : 'cheap-module-source-map',
    entry: path.resolve(SRC_PATH,'index.js'),

    output: {
        path: BUILD_PATH,
        publicPath: NODE_ENV == 'development' ? 'http://localhost:4000/static/build/' : '/static/build',
        filename: "[name]-[hash].js",
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: [FRONTEND_PATH, NODE_MODULES_PATH, SRC_PATH]
    },

    module: {
        loaders: [
            { test: /\.png$/, loader: "url-loader?limit=500000&mimetype=image/png" },
            { test: /\.jpg$/, loader: "url-loader?limit=500000&mimetype=image/jpg", include: IMAGE_PATH },
            { test: /\.json$/, loaders: ['json-loader'], include: NODE_MODULES_PATH },
            { test: /\.gif$/, loader: "file-loader" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/, loader: 'file?name=[path][name].[ext]?[hash]'}
        ],
    },

    postcss: function () {
        return [precss, autoprefixer];
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],

    devServer: {
        contentBase: path.resolve(ROOT_PATH, 'main/templates/main'),
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port: 4000
    }

};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false}
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.NoErrorsPlugin()
    );

    module.exports.module.loaders.push(
        {
            test: /\.js/,
            loader: 'babel',
            include: SRC_PATH,
            exclude: NODE_MODULES_PATH
        },

        {
            test: /\.css/,
            include: [COMPONENTS_PATH, COMMON_CSS_PATH],
            loader: 'style?sourceMap!css?' + cssModulesConfigStr
        }
    )
}

if (NODE_ENV == 'development') {
    module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
    module.exports.module.loaders.push({
            test: /\.js/,
            loaders: ['react-hot', 'babel'],
            include: SRC_PATH,
            exclude: NODE_MODULES_PATH
        },
        {
            test: /\.css/,
            include: [COMPONENTS_PATH, COMMON_CSS_PATH],
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?' + cssModulesConfigStr)
        }
    )
}
