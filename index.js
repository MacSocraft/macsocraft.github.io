document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
  
    // Replace 'your_external_json_link' with the actual JSON link
    const jsonLink = 'https://market-craftadia-default-rtdb.firebaseio.com/items.json';
    fetch(jsonLink)
    .then(response => response.json())
    .then(data => {
      // Loop through the JSON data and create table rows
      for (const itemName in data) {
        if (data.hasOwnProperty(itemName)) {
          const item = data[itemName];
          const row = document.createElement('tr');
          const nameCell = document.createElement('td');
      
   
          // Create an anchor element for the name with a custom link
          const nameLink = document.createElement('a');
          nameLink.href = `./item?lookup=${itemName}`; // Use 'itemName' for the query parameter
          nameLink.textContent = item.name;
          nameCell.appendChild(nameLink);
     
     
          row.appendChild(nameCell);
 
          tableBody.appendChild(row);
        }
      }
    })
    .catch(error => {
      console.error('Error fetching or processing JSON data:', error);
    });
});

function filterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("itemTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}