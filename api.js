const axios = require('axios');
const Spinner = require('cli-spinner').Spinner;
const loadingSpinner = require('./helpers/loadingAnimation');

loadingSpinner.startLoading();
async function api() {
    let res = await axios.get(`http://59.92.225.188/add/15/20`);
    loadingSpinner.stopLoading();
    console.log(res.data);
}

api();