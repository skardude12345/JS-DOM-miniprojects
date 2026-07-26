let expenseName = document.getElementById("name")
let amt = document.getElementById("amt")
let addBtn = document.getElementById('add-expense')
let listDisplay = document.getElementById('show-expenses')
let updateBtn = document.getElementById('update-expense')

updateBtn.style.display = 'none'

let listArr = JSON.parse(localStorage.getItem('listArr')) || []

let ind = -1

function addExpense() {

    if (!expenseName.value || !amt.value) return alert("Please fill out both fields")

    listArr.push({expenseName: expenseName.value, expenseAmt: amt.value})
    localStorage.setItem('listArr', JSON.stringify(listArr))
    
    expenseName.value = ""
    amt.value = ""
    showList()
}

function showList() {
    listDisplay.innerHTML = "" 


    for (let i = 0; i < listArr.length; i++) {
        let div = document.createElement('div')
        let btnDiv = document.createElement('div')

        let nameH1 = document.createElement('h1')
        nameH1.innerText = listArr[i].expenseName

        let amtH1 = document.createElement('h1')
        amtH1.innerText = listArr[i].expenseAmt

        let editBtn = document.createElement('button')
        editBtn.innerText = 'edit'
        editBtn.onclick = () => editExpense(i)

        let delBtn = document.createElement('button')
        delBtn.innerText = 'delete'
        delBtn.onclick = () => deleteExpense(i)

        btnDiv.appendChild(editBtn)
        btnDiv.appendChild(delBtn)

        div.appendChild(nameH1)
        div.appendChild(amtH1)
        div.appendChild(btnDiv)

        div.classList.add('task-div')
        listDisplay.appendChild(div)
    }
}

function editExpense(index) {
    expenseName.value = listArr[index].expenseName
    amt.value = listArr[index].expenseAmt
    ind = index
    addBtn.style.display = 'none'
    updateBtn.style.display = 'inline'
}

function updateExpense() {
    listArr[ind].expenseName = expenseName.value
    listArr[ind].expenseAmt = amt.value

    localStorage.setItem('listArr', JSON.stringify(listArr))

    addBtn.style.display = 'inline'
    updateBtn.style.display = 'none'

    expenseName.value = ""
    amt.value = ""
    showList()
}

function deleteExpense(index) {
    listArr.splice(index, 1)
    
    localStorage.setItem('listArr', JSON.stringify(listArr))
    showList()
}

showList()
