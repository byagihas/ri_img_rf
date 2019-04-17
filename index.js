'use strict';

const fs = require('fs');
const request = require('request');
const rp = require('request-promise');
const inquirer = require('inquirer');
var imageType = '';

var questions = [
  {
    type: 'input',
    name: 'Authkey',
    message: 'Enter your Responsys Auth key: '
  },
  {
    type: 'input',
    name: 'content1',
    message: 'Enter the path of content file 1 (new creative): ',
    validate: function (value){
    var pass = value.match('([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)');
       if (pass) {
        if (value.match('([/|.|\w|\s|-])*\.(?:png)')){
          imageType = 'png';
          return true;
        }
        else if (value.match('([/|.|\w|\s|-])*\.(?:jpg)')){
          imageType = 'jpg';
          return true;
        }
        else if (value.match('([/|.|\w|\s|-])*\.(?:jpeg)')){
          imageType = 'jpeg';
          return true;
        }
        else if (value.match('([/|.|\w|\s|-])*\.(?:gif)')){
          imageType = 'gif';
          return true;
        }
        else {
          return "file must be one of .gif, .png, .jpeg, or .jpg";
        }
      } else {
        return "file must be .gif, .png, or.jpg";
      }
    }
  },
  {
    type: 'input',
    name: 'content2',
    message: 'Enter the path of content file 2 (old image that will be updated): ',
    validate: function (value){
      var pass = value.match('([/|.|\w|\s|-])*\.(?:' + imageType + ')')
       if (pass) {
        return true;
      } else {
        return "filetype for content files 1 and 2 must match";
      }
    }
  }
];

// Use Inquirer to pull in user input for authKey, contentName1, contentName 2
inquirer.prompt(questions).then(answers => {

let authKey = answers.Authkey
let contentName1 = answers.content1
let contentName2 = answers.content2

let getApiPath = "https://api2-011.responsys.net/rest/api/v1.3/clItems" + contentName1;
let postApiPath = "https://api2-011.responsys.net/rest/api/v1.3/clItems" + contentName2;

let postContentPath = contentName2;

let itemData1 = "";
let itemPath1 = "";
let itemParsed = "";

var optionsGet = {
  method: 'GET',
  url: getApiPath,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': authKey
  },
  json: true,
  resolveWithFullResponse: true
};

var optionsPost = {}

//GET Responsys Content Path and Data:
rp(optionsGet)
    .then(function (response) {
        // resolved
      console.log(response.statusCode);
      optionsPost = {
        method: 'POST',
        url: postApiPath,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authKey
        },
        json: {
          itemPath: postContentPath,
          itemData: response.body.itemData
        },
        resolveWithFullResponse: true
      }
      rp(optionsPost)
        .then(function(response){
          console.log(response.statusCode);
          return
        })
        .catch(function (error) {
        // rejected
          console.log(error.statusCode);
          return
        });
     })
    .catch(function (err) {
        // rejected
        console.log(err.statusCode);
        return
    });
});

/*
// Encode base64 if needed
let data = 'stackabuse.com';
let buff = new Buffer(data);
let base64data = buff.toString('base64');

// Decode base64
let data = 'c3RhY2thYnVzZS5jb20=';
let buff = new Buffer(data, 'base64');
let text = buff.toString('UTF-8');

console.log('"' + data + '" converted from Base64 to ASCII is "' + text + '"');
*/




