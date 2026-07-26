let studentName = document.getElementById('name')
let english = document.getElementById('english')
let hindi = document.getElementById('hindi')
let math = document.getElementById('math')
let science = document.getElementById('science')

let show = document.getElementById('show')

students = []
inputs = [studentName, english, hindi, math, science]


function addStudent() {
    info = {
        name: studentName.value,
        english: english.value,
        hindi: hindi.value,
        math: math.value,
        science: science.value
    }

    students.push(info)

    inputs.forEach(element => {
        element.value = null
    });

    showStudents()
}

function showStudents() {
    show.innerHTML = null
    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        let div = document.createElement('div')

        let nameh3 = document.createElement('h3')
        nameh3.innerText = student.name

        let englishMarks = document.createElement('h3')
        englishMarks.innerText = student.english

        let hindiMarks = document.createElement('h3')
        hindiMarks.innerText = student.hindi

        let mathMarks = document.createElement('h3')
        mathMarks.innerText = student.math

        let scienceMarks = document.createElement('h3')
        scienceMarks.innerText = student.science

        let totalMarks = document.createElement('h3')
        totalMarks.innerText = parseInt(student.english) + parseInt(student.hindi) + parseInt(student.math) + parseInt(student.science);

        let grade = document.createElement('h3')
        grade.innerText = showGrade(totalMarks.innerText)

        let btnDiv = document.createElement('div')

        let editBtn = document.createElement('button')
        editBtn.innerText = 'edit'
        editBtn.onclick = () => {
            editStudent(i)
        }


        let delBtn = document.createElement('button')
        delBtn.innerText = 'delete'
        delBtn.onclick = () => {
            delStudent(i)
        }

        btnDiv.append(editBtn, delBtn)

        btnDiv.classList.add('button-div')
        div.classList.add('students')

        div.append(nameh3, englishMarks, hindiMarks, mathMarks, scienceMarks, totalMarks, grade, btnDiv)
        show.appendChild(div)

    }
}

function editStudent(index) {
    let dialog = document.createElement('dialog')
    let dialogDiv = document.createElement('div')
    dialogDiv.classList.add('dialog')

    dialogDiv.innerHTML = `
        <div class="editFields">
            <p>Edit Name</p>
            <input placeholder="edit name" id="editName"> 
        </div>
        <div class="editFields">
            <p>Edit English Marks</p> 
            <input placeholder="edit english marks" id="editEnglish"> 
        </div>
        <div class="editFields">
            <p>Edit Hindi Marks</p> 
            <input placeholder="edit hindi marks" id="editHindi"> 
        </div>
        <div class="editFields">
            <p>Edit Math Marks</p> 
            <input placeholder="edit math marks" id="editMath"> 
        </div>
        <div class="editFields">
            <p>Edit Science</p> 
            <input placeholder="edit science marks" id="editScience"> 
        </div>
        <button onclick="this.closest('dialog').close()">Update</button>
    `

    let editName = dialogDiv.querySelector('#editName')
    editName.value = students[index].name

    let editEnglish = dialogDiv.querySelector('#editEnglish')
    editEnglish.value = students[index].english

    let editHindi = dialogDiv.querySelector('#editHindi')
    editHindi.value = students[index].hindi

    let editMath = dialogDiv.querySelector('#editMath')
    editMath.value = students[index].math

    let editScience = dialogDiv.querySelector('#editScience')
    editScience.value = students[index].science

    dialog.appendChild(dialogDiv)
    document.body.appendChild(dialog)

    dialog.showModal()
    dialog.onclose = () => {
        let std = students[index]
        std.name = editName.value
        std.english = editEnglish.value
        std.hindi = editHindi.value
        std.math = editMath.value
        std.science = editScience.value
        showStudents()
    }


}

function delStudent(index) {
    students.splice(index, 1)
    showStudents()
}

function showGrade(totalMarks) {
    let pct = totalMarks / 400 * 100
    let grade = ''

    if (pct >= 90) {
        grade = 'A+'
    }
    else if (pct < 90 && pct >= 80) {
        grade = 'A'
    }
    else if (pct < 80 && pct >= 70) {
        grade = 'A-'
    }
    else if (pct < 70 && pct >= 60) {
        grade = 'B'
    }
    else if (pct < 60 && pct >= 50) {
        grade = 'C'
    }
    else if (pct < 50 && pct >= 40) {
        grade = 'D'
    }
    else {
        grade = 'F'
    }

    return (grade)
}
