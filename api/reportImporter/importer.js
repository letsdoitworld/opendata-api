require('dotenv').config()
var trashoutToken = 'a0c84fe524f970d1a404fb3ccf985f71';
var trashoutServiceUrl = 'https://api.trashout.ngo/v1/trash/?attributesNeeded=id,gpsFull,created,types,size,' +
    'note,userInfo,url,status&limit=10000000000000';
var trashoutConverter = require("../reportImporter/TrashoutConverter");
var importingService = require("../reportImporter/importService");
var countryresourceDao = require("../reportImporter/countryresourceDao");
var countryDao = require("../reportImporter/countryDao");

updateReports = async ()=> {
    try {
        await importingService.importReportsAll(trashoutServiceUrl, 'Trashout', trashoutToken, trashoutConverter);
    } catch (error) {
        console.log('error' + error);
        throw error;
    }
};
updateReportsDaily = async ()=> {
    try {
        await importingService.importReportsDaily(trashoutServiceUrl, 'Trashout',
            trashoutToken, trashoutConverter, process.env.TRASHOUT_REQ_DELAY);
    } catch (error) {
        console.log('error' + error);
        throw error;
    }
};
updateCountries = async ()=> {
  try {
    await countryDao.storeCountryStatistics();
  } catch (error) {
    console.log('error' + error);
    throw error;
  }
};
updateCountryResources = async ()=> {
  try {
    await countryresourceDao.storeCountryResources();
  } catch (error) {
    console.log('error' + error);
    throw error;
  }
};
module.exports.init = function () {
  console.log('hi');
};

updateCountryResources();
updateCountries();

