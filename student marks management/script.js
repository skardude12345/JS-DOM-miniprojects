let studentName = document.getElementById('name')
let english = document.getElementById('english')
let hindi = document.getElementById('hindi')
let math = document.getElementById('math')
let science = document.getElementById('science')
let show = document.getElementById('show')

let students = JSON.parse(localStorage.getItem('studentsList')) || []
let inputs = [studentName, english, hindi, math, science]

function addStudent() {
    if (!studentName.value || !english.value || !hindi.value || !math.value || !science.value) {
        return alert("Please fill out all fields before adding a student.")
    }

    let info = {
        name: studentName.value,
        english: english.value,
        hindi: hindi.value,
        math: math.value,
        science: science.value
    }

    students.push(info)
    localStorage.setItem('studentsList', JSON.stringify(students))

    inputs.forEach(element => {
        element.value = ""
    });

    showStudents()
}

function showStudents() {
    show.innerHTML = ""
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
        totalMarks.innerText = parseInt(student.english || 0) + parseInt(student.hindi || 0) + parseInt(student.math || 0) + parseInt(student.science || 0);

        let grade = document.createElement('h3')
        grade.innerText = showGrade(totalMarks.innerText)

        let btnDiv = document.createElement('div')
        btnDiv.classList.add('btn-group')

        let editBtn = document.createElement('button')
        editBtn.innerText = 'Edit'
        editBtn.onclick = () => editStudent(i)

        let delBtn = document.createElement('button')
        delBtn.innerText = 'Delete'
        delBtn.classList.add('delete') // Attaches red styling hook
        delBtn.onclick = () => delStudent(i)

        btnDiv.append(editBtn, delBtn)
        div.classList.add('students')

        div.append(nameh3, englishMarks, hindiMarks, mathMarks, scienceMarks, totalMarks, grade, btnDiv)
        show.appendChild(div)
    }
}

function editStudent(index) {
    let dialog = document.createElement('dialog')
    dialog.classList.add('dialog')

    dialog.innerHTML = `
        <h2>Edit Student Record</h2>
        <div class="editFields">
            <label>Edit Name</label>
            <input placeholder="edit name" id="editName"> 
        </div>
        <div class="editFields">
            <label>Edit English Marks</label> 
            <input type="number" placeholder="edit english marks" id="editEnglish"> 
        </div>
        <div class="editFields">
            <label>Edit Hindi Marks</label> 
            <input type="number" placeholder="edit hindi marks" id="editHindi"> 
        </div>
        <div class="editFields">
            <label>Edit Math Marks</label> 
            <input type="number" placeholder="edit math marks" id="editMath"> 
        </div>
        <div class="editFields">
            <label>Edit Science</label> 
            <input type="number" placeholder="edit science marks" id="editScience"> 
        </div>
        <div class="dialog-actions">
            <button class="save-btn" onclick="this.closest('dialog').close('save')">Update</button>
            <button class="cancel-btn" onclick="this.closest('dialog').close('cancel')">Cancel</button>
        </div>
    `

    let editName = dialog.querySelector('#editName')
    let editEnglish = dialog.querySelector('#editEnglish')
    let editHindi = dialog.querySelector('#editHindi')
    let editMath = dialog.querySelector('#editMath')
    let editScience = dialog.querySelector('#editScience')

    editName.value = students[index].name
    editEnglish.value = students[index].english
    editHindi.value = students[index].hindi
    editMath.value = students[index].math
    editScience.value = students[index].science

    document.body.appendChild(dialog)
    dialog.showModal()

    dialog.onclose = () => {
        if (dialog.returnValue === 'save') {
            let std = students[index]
            std.name = editName.value
            std.english = editEnglish.value
            std.hindi = editHindi.value
            std.math = editMath.value
            std.science = editScience.value

            localStorage.setItem('studentsList', JSON.stringify(students))
            showStudents()
        }
        dialog.remove() 
    }
}

function delStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1)
        localStorage.setItem('studentsList', JSON.stringify(students))
        showStudents()
    }
}

function showGrade(totalMarks) {
    let pct = (totalMarks / 400) * 100
    if (pct >= 90) return 'A+'
    if (pct >= 80) return 'A'
    if (pct >= 70) return 'A-'
    if (pct >= 60) return 'B'
    if (pct >= 50) return 'C'
    if (pct >= 40) return 'D'
    return 'F'
}

showStudents()
