const yargs = require('yargs');
const _ = require('lodash');
const weather = require('./weather.js');
const processData = require('./processing');

//COMMAND INPUTS
const dateGiven = {
    describe: 'Date of cached available options: MM/DD/YYYY, no zeros',
    demand: true,
    alias: 'd'
};
const zip = {
    describe: 'zip code or address of location',
    demand: true,
    alias: 'z'
};

//YARGS
const argv = yargs
.command('today', 'Todays weather',{
    zipCode: zip
})
.command('week', 'Todays weather',{
    zipCode: zip
})
.command('list', 'List all days stored in local cache',{
})
.command('read','Read out details from a single stored',{
    date: dateGiven
})
.help()
.argv;
//LODASH
var command = argv._[0];

//PROCESSING COMMAND
if (command === 'today'){
    //TODAYS WEATHER
    console.log('========================');
    var something = () => {
        let theDate = processData.dateStamp();
        let theData = processData.findOne(theDate);
        let dispToday = processData.displayToday(theData);
        console.log('========================');
    };
    weather.weatherCall(argv.zipCode,something);
} else if (command === 'forecast') {
    //WEEKS WEATHER
    console.log('========================');
    var something = () => {
        let theDate = processData.dateStamp();
        let theData = processData.findOne(theDate);
        console.log(theData);
        console.log('========================');
    };
    weather.weatherCall(argv.zipCode,something);
} else if (command === 'list') {
    //LIST DATES OF CACHE
    var listAll = processData.findAllDates(argv.date, argv.timing);
    console.log('========================');
    console.log(listAll);
    console.log('========================');
} else if (command === 'read') {
    //READ FROM FILE
    console.log('========================');
    var readOne = processData.findOne(argv.date);
    console.log(readOne);
    console.log('========================');
} else {
    console.log('Not a valid command');
};