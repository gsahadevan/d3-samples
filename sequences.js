$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "population.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

var population = [];
function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            population.push(tarr);
        }
    }

    console.log(population)
}

/*
async function prepare() {
    const url = "population.csv";
    await d3.text(url)
        .then(data => {
            let csv = d3.csvParseRows(data);
            // Remove header
            csv.shift();
            // console.log(JSON.stringify(csv));
            // console.log(this.convertIntoObjects(csv));
            const objectArray = this.getObjectArray(csv);
            population = objectArray.reduce(function (r, a) {
                r[a.year] = r[a.year] || [];
                r[a.year].push(a);
                return r;
            }, Object.create(null));
            // console.log(result);
            console.log(population['2019'])
        });
}

function getObjectArray(array) {
    let populationData = [];
    array.forEach(item => {
        let data = {};
        data.country = item[0];
        data.code = item[1];
        data.year = item[2];
        data.population = item[3];
        populationData.push(data);
    });
    return populationData;
}
*/

function showCurrentRangeValue() {
    var element = document.getElementById('input-range-year');
    var spanElement = document.getElementById('span-range-year');
    spanElement.innerText = element.value;

    var divElement = document.getElementById('population-data');
    divElement.innerHTML = JSON.stringify(population[element.value]);

    console.log(population)
    console.log(element.value)
    console.log(population[element.value])
}

function addYear() {
    var element = document.getElementById('input-range-year');
    element.value = element.value + 1;
    showCurrentRangeValue();
}

function subYear() {
    var element = document.getElementById('input-range-year');
    element.value = element.value - 1;
    showCurrentRangeValue();
}