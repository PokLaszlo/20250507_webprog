const cards = document.querySelector('#cards')
const saveButton = document.querySelector('#saveButton')
const addButton = document.querySelector('#addButton')

const idInput = document.querySelector('#id')
const nameInput = document.querySelector('#name')
const cityInput = document.querySelector('#city')
const salaryInput = document.querySelector('#salary')
const empModalLabel = document.querySelector('#empModalLabel')

const url = 'http://localhost:8000/api/employees'

var addMode = true;

saveButton.addEventListener('click', () => {
  //JavaScript objektum
  if(addMode){
    const emp = {
      name: nameInput.value,
      city: cityInput.value,
      salary: salaryInput.value
    }
    addEmployee(emp)
  }else{
    const emp = {
      id: idInput.value,
      name: nameInput.value,
      city: cityInput.value,
      salary: salaryInput.value
    }
    updateEmployee(emp)
  }
  clearFields()
})

addButton.addEventListener('click', () => {
  clearFields()
  addMode = true;
  empModalLabel.innerHTML = 'Hozzáadás'
})

function getEmployees() {
  fetch(url)
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    console.log(result)  
    renderTbody(result.data)
  }); 
}

function renderTbody(empList) {
  var tbodyContent = '';
  empList.forEach((emp) => {
    var row = `
      <div class="card m-3" style="width: 18rem;">
        <div class="card-header">
          <h2>${emp.name}</h2>
        </div>
        <div class="card-body">
          <h5 class="card-title" id="empCount">Település: ${emp.city}</h5>
          <p class="card-text">Fizetés: ${emp.salary}</p>
          <button class="btn btn-warning" 
            data-id="${emp.id}" 
            data-name="${emp.name}" 
            data-city="${emp.city}" 
            data-salary="${emp.salary}"
            data-bs-toggle="modal" 
            data-bs-target="#empModal"
            onclick="editEmployee()">Szerkesztés</button>
          <button class="btn btn-danger" 
            data-id="${emp.id}"  
            data-name="${emp.name}" 
            data-city="${emp.city}" 
            data-salary="${emp.salary}" 
            data-bs-toggle="modal" 
            data-bs-target="#empModal"
            onclick="deleteEmployee(${emp.id})">Törlés</button>
        </div>
      </div>
    `;    
    tbodyContent += row;
  })
  cards.innerHTML = tbodyContent
}

function clearFields() {
  idInput.value = ''
  nameInput.value = ''
  cityInput.value = ''
  salaryInput.value = ''
}

function addEmployee(emp) {
  fetch(url, {
    method: 'post', 
    body: JSON.stringify(emp),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(result => {
    console.log(result)
    getEmployees()
  })
  .catch(err => console.log(err))
}

function deleteEmployee(id){
  const delUrl = url + "/" + id;

  fetch(delUrl, { method: "delete" })
  .then(response => response.json() )
  .then(result => {
    console.log(result)
    getEmployees()
  });
}

function editEmployee() {
  addMode = false;
  empModalLabel.innerHTML = 'Szerkesztés'
  emp = {
    id: this.event.target.getAttribute('data-id'),
    name: this.event.target.getAttribute('data-name'),    
    city: this.event.target.getAttribute('data-city'),
    salary: this.event.target.getAttribute('data-salary'),
  }
  // console.log('emp: ', emp)
  idInput.value = emp.id
  nameInput.value = emp.name
  cityInput.value = emp.city
  salaryInput.value = emp.salary
}
function updateEmployee(emp){
  console.log('emp: ', emp)
  addMode = true;
  empModalLabel.innerHTML = 'Hozzáadás'
  const updUrl = url + "/" + emp.id;
  fetch(updUrl, {
    method: 'put', 
    body: JSON.stringify(emp),
    headers: {
      "Content-Type": "application/json"
    }
    })
  .then(response => response.json())
  .then(result => {
    console.log(result)
    getEmployees()
  })
  .catch(err => console.log(err))
}
getEmployees()
/* <tr class="miniRow">
<td class="mini miniId">${emp.id}</td>      
<td class="mini miniName">${emp.name}</td>      
<td class="mini miniCity">${emp.city}</td>      
<td class="mini miniSalary">${emp.salary}</td>
<td class="mini">
  <button class="btn btn-warning me-2" 
  onclick="deleteEmployee(${emp.id})">Törlés</button>
  <button class="btn btn-secondary"
  onclick="editEmployee()"
  data-id="${emp.id}"
  data-name="${emp.name}"
  data-city="${emp.city}"
  data-salary="${emp.salary}"
  data-bs-toggle="modal" 
  data-bs-target="#empModal"
  >Szerkesztés</button>
</td>

</tr> */