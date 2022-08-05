const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const {
  WebpackManifestPlugin
} = require('webpack-manifest-plugin');
//__webpack_public_path__ = myRuntimePublicPath;
module.exports = {
  mode: "development",
  entry: {
    home: "./demos/index.js",
    h5: "./demos/h5/index.js",
    demo1: "./demos/demo1/index.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].[contenthash].js",
    clean: true
  },
  optimization: {
    runtimeChunk: true,
    //runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[hash:8].[ext]',
          esModule: false //不使用es6的模块语法
        }
      }],
      type: 'javascript/auto' //默认使用自定义的
    }, {
      test: /\.css$/i,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          url: true
        }
      }]
    }, {
      test: /\.less$/i,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
            minimize: true,
            math: 'always'
          }
          
        }
      }]
    }, {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ["@babel/env", "@babel/preset-react"]
        }
      }]

    }, {
      test: /\.tsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'ts-loader'
      }]
    }]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".td", ".ts", ".tsx"],
    alias:{
      //避免本地link调试时，react版本不统一的错误
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "./demos/index.html",
      inject: "body",
      chunks: ['simple'],
      scriptLoading: "blocking",
      publicPath: "/"
    }),
    new htmlWebpackPlugin({
      filename: "h5/index.html",
      template: "./demos/h5/index.html",
      inject: "body",
      chunks: ['simple'],
      scriptLoading: "blocking",
      publicPath: "/h5/"
    }),
    new htmlWebpackPlugin({
      filename: "demo1/index.html",
      template: "./demos/demo1/index.html",
      inject: "body",
      chunks: ['simple'],
      scriptLoading: "blocking",
      publicPath: "/demo1/"
    }),
    new WebpackManifestPlugin()
  ],
  devServer: {
    static: [{
      publicPath: "/",
      directory: "./dist"
    }, {
      publicPath: "/",
      directory: "./static"
    }],
    //contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    //本地服务输出给用户的页面里，资源文件地址的前缀路径,只有在你想要提供静态文件时才需要
    historyApiFallback: true, //使得所有访问路径可以访问到首页
  },
}