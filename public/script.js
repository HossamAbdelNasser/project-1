
const form = document.getElementById('form');
const editForm = document.getElementById('edit-form');
const editSubmit = document.getElementById('edit-submit')

//Post Data
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('username').value;
    const id = document.getElementById('userid').value;
    console.log(name + " " + id)

    fetch("http://localhost:5000/person")
    .then(res => res.json())
    .then(data =>{
        fetch("http://localhost:5000/person", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                id: `${++data.length}`,
                name: `${name}`,
                age: `${id}`
            })
        })
        .then(data=>{
            console.log(data)
            x=data;
        })
        .catch(error=> console.log("Error"))
    .catch(error=> console.log('Error'))
    })

document.getElementById('username').value = '';
document.getElementById('userid').value = ''
})

//Edit record
const edit = (id, name, age)=> {
    fetch(`http://localhost:5000/person/${id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                id: `${id}`,
                name: `${name}`,
                age: `${age}`
            })
        })
        .then(data=>{
            console.log(data)
        })
        .catch(error=> console.log("Error"))
    }


//Delete record
const deleteRecord = (id)=> {
  if (confirm('Are you sure?')) {
    fetch(`http://localhost:5000/person/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        },
    })
    .then(data=>{
        console.log(data)
    })
    .catch(error=> console.log("Error"))}
    else {
        return;
    }
}

//Fetch Data
fetch("http://localhost:5000/person")
.then(res=> res.json())
.then(data=> {
    console.log(data)  
    
var items = data.map(element=> {
    
    return (`<li class='items' title='${element.age}'> <span class='item-util'><i class='far fa-trash-alt' title='Delete Record' onclick='deleteRecord(${element.id})'></i> <i class="fas fa-cog" title='Edit' onclick='editItem(${element.id}, ${JSON.stringify(element.name)}, ${element.age})'></i></span> <span class='item-text'> ${element.name} </span> </li>`)
})
items = items.join('')
const display = document.getElementById('display');
display.innerHTML = items
}
)

function editItem(id, name, age){
    editForm.classList.toggle('hidden');
    document.getElementById('edit-id').value = id
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-age').value = age;

}


    editForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const editId = document.getElementById('edit-id').value;
        const editName = document.getElementById('edit-name').value;
        const editAge = document.getElementById('edit-age').value;

        edit(editId, editName, editAge);

        document.getElementById('edit-name').value  = '';
        document.getElementById('edit-age').value = '';
    })


