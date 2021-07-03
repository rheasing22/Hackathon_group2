const Spinner = require('cli-spinner').Spinner;
const spinner = new Spinner('Processing ...');

function startLoading() {
    spinner.setSpinnerString('->|->/->\\');
    spinner.start();
}

function stopLoading() {
    spinner.stop(true);
}

module.exports = { startLoading, stopLoading };