let task = document.getElementById("task")
let addBtn = document.getElementById('add-task')
let listDisplay = document.getElementById('show-list')
let updateBtn = document.getElementById('update-task')
updateBtn.style.display = 'none'

let listArr = []

let ind = -1

function addTask() {
    listArr.push(task.value)
    task.value = null
    showList()
}


function showList() {
    listDisplay.innerHTML = null
    for (let i = 0; i < listArr.length; i++) {

        let div = document.createElement('div')
        let btnDiv = document.createElement('div')

        let h1 = document.createElement('h1')
        h1.innerText = listArr[i]

        let editBtn = document.createElement('button')
        editBtn.innerText = 'edit'
        editBtn.onclick = () => {
            editTask(i)
        }

        let delBtn = document.createElement('button')
        delBtn.innerText = 'delete'
        delBtn.onclick = () => {
            deleteTask(i)
        }


        btnDiv.appendChild(editBtn)
        btnDiv.appendChild(delBtn)

        div.appendChild(h1)
        div.appendChild(btnDiv)


        div.classList.add('task-div')

        listDisplay.appendChild(div)
    }

}

function editTask(index) {
    task.value = listArr[index]
    ind = index
    addBtn.style.display = 'none'
    updateBtn.style.display = 'inline'
}

function updateTask() {
    listArr[ind] = task.value

    addBtn.style.display = 'inline'
    updateBtn.style.display = 'none'

    task.value = null
    showList()
}

function deleteTask(index) {
    listArr.splice(index, 1)
    console.log(listArr)
    showList()
}