function fileFormatter(options) {
    return (new Date()).toLocaleString() + ' [' + options.level.toUpperCase() + '] ' + options.message;
}

module.exports = fileFormatter;
