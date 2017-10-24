// Source from https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes/blob/master/all/all.csv
'use strict';
const join = require('path').join;
const parse = require('csv-parse/lib/sync');
const fs = require('fs');

const countries = parse(fs.readFileSync(join(__dirname,'all.csv')), {columns: true});

module.exports = {
  getCountryAlpha3: (name) => { return countries.find( v => {return v.name === name} )['alpha-3'] },
  getCountryAlpha2: (name) => { return countries.find( v => {return v.name === name} )['alpha-2'] },
  getCountryNameFromAlpha2: (alpha2) => { return countries.find( v => {return v['alpha-2'] === alpha2} ).name },
  getCountryNameFromAlpha3: (alpha3) => { return countries.find( v => {return v['alpha-3'] === alpha3} ).name },
  getCountryName: (input) => {
    if (input.length === 3) { return module.exports.getCountryNameFromAlpha3(input) }
    else if (input.length === 2) { return module.exports.getCountryNameFromAlpha2(input) }
    return input
  }
};
