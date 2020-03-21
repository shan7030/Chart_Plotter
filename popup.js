document.getElementById("myButton").addEventListener("click", plot);


function plot() {
    if (document.querySelector('#myFile').files.length == 0) {
        alert('Select the File!');
        return;
    }

    if (document.getElementById('quantity_1').value == null || document.getElementById('quantity_2').value == null || document.getElementById('quantity_3').value == null) {
        alert('Enter valid column numbers!');
        return;
    }

    var col_1 = document.getElementById('quantity_1').value;
    var col_2 = document.getElementById('quantity_2').value;
    var col_3 = document.getElementById('quantity_3').value;
    var file = document.querySelector('#myFile').files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    var rows_array = [];
    var column_array = [];


    var ctx = document.getElementById('myChart').getContext('2d');

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [],
            datasets: [{
                label: 'Datapoint',
                borderColor: '#00FFFF',
                data: []
            }
            ]
        },

        // Configuration options go here
        options: {}
    });

    //if you need to read a csv file with a 'ISO-8859-1' encoding
    /*reader.readAsText(file,'ISO-8859-1');*/

    //When the file finish load
    reader.onload = function (event) {

        //get the file.
        var csv = event.target.result;


        //split and get the rows in an array
        var rows = csv.split('\n');

        //move line by line
        for (var i = col_3 - 1; i < rows.length; i++) {
            //split by separator (,) and get the columns
            cols = rows[i].split(',');

            if (cols[col_1 - 1] != null && cols[col_1 - 1] != "" && cols[col_2 - 1] != null && cols[col_2 - 1] != "")
                addData(chart, cols[col_1 - 1], cols[col_2 - 1]);

        }
    }

}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

