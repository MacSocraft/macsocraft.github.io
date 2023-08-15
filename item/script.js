// Function to update table header
function updateTableHeader(paramValue) {
    // Get the element with ID 'table-title'
    var tableTitleElement = document.getElementById('table-title');

    // Update the content of the table header
    if (tableTitleElement) {  // Check if the element exists
        tableTitleElement.textContent = paramValue;
    }
}

var url = new URL(window.location.href);
var searchParams = new URLSearchParams(url.search);
var paramValue = searchParams.get('lookup');


// Wrap the code inside an async function
async function fetchDataAndGenerateChart(){
    const tableBody = document.getElementById('table-body');
    const minPriceElement = document.getElementById('min-price');
    const maxPriceElement = document.getElementById('max-price');
    const avgPriceElement = document.getElementById('avg-price');
    const jsonLink = 'https://market-craftadia-default-rtdb.firebaseio.com/items/'+ paramValue +'.json';

    document.title = "Item: " + paramValue;
    
    try {
        const response = await fetch(jsonLink);
        const data = await response.json();

        if (data === null) {
            updateTableHeader("Item does not exist.");
            console.error('JSON data is null');
            return;
        }

        updateTableHeader("Item: " + paramValue);

        let minValue = Infinity;
        let maxValue = -Infinity;
        let sum = 0;
        let count = 0;

        for (const date in data) {
            if (data.hasOwnProperty(date)) {
                const value = parseFloat(data[date].replace('$', ''));
                const row = document.createElement('tr');
                const dateCell = document.createElement('td');
                const valueCell = document.createElement('td');

                dateCell.textContent = date;
                valueCell.textContent = data[date];

                row.appendChild(dateCell);
                row.appendChild(valueCell);

                tableBody.appendChild(row);

                minValue = Math.min(minValue, value);
                maxValue = Math.max(maxValue, value);
                sum += value;
                count++;
            }
        }

        const average = sum / count;

        minPriceElement.textContent = `$${minValue.toFixed(2)}`;
        maxPriceElement.textContent = `$${maxValue.toFixed(2)}`;
        avgPriceElement.textContent = `$${average.toFixed(2)}`;

        // ... (chart generation code)
        var ctx = document.getElementById('myChart').getContext('2d');
        var table = document.getElementById('table-price');
        var rows = table.getElementsByTagName('tr');
        console.log(rows)
        var labels = [];
        var values = [];
        
        // Skip the first row (header row) and start from index 1
        console.log(rows.length)
        for (var i = 1; i < rows.length; i++) {
          var cells = rows[i].getElementsByTagName('td');
          
          if (cells.length === 2) {
            labels.push(cells[0].textContent);
            values.push(parseFloat(cells[1].textContent.replace('$', '')));
          }
        }
     
        if (labels.length > 0 && values.length > 0) {
            var chartData = {
                labels: labels,
                datasets: [{
                    label: 'Price',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    data: values
                }, {
                    label: 'Min Value',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: Array(values.length).fill(minValue) // Array of minValue repeated
                }, {
                    label: 'Max Value',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    data: Array(values.length).fill(maxValue) // Array of maxValue repeated
                }, {
                    label: 'Average Value',
                    borderColor: 'rgba(7, 92, 192, 0.8)',
                    data: Array(values.length).fill(average) // Array of average repeated
                }]
            };
              
              var options = {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false
                  }
                }
              };
              console.log(chartData)
              var myChart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: options
              });
        }
    } catch (error) {
        console.error('Error fetching or processing JSON data:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchDataAndGenerateChart);

        
    
  
    