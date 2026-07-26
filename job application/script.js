let firstName = document.getElementById('first-name')
let lastName = document.getElementById('last-name')
let email = document.getElementById('email')
let role = document.getElementById('job-role')
let address = document.getElementById('address')
let city = document.getElementById('city')
let pincode = document.getElementById('pincode')
let date = document.getElementById('date')
let CV = document.getElementById('CV')

let submit = document.getElementById('submit')
let form = document.querySelector('form')

let applications = []

function addAppl() {
    let cvUrl = "";
    if (CV.files.length > 0) {
        cvUrl = URL.createObjectURL(CV.files[0]);
    }

    let applicationInfo = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        role: role.value,
        address: address.value,
        city: city.value,
        pincode: pincode.value,
        date: date.value,
        CV: cvUrl 
    }

    applications.push(applicationInfo)
    showAppl()
    console.log(applicationInfo)

    form.reset(); 
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    addAppl()
})

function showAppl() {
    let show = document.getElementById('show')

    show.innerHTML = "";

    for (let i = 0; i < applications.length; i++) {
        const application = applications[i];

        let div = document.createElement('div')
        div.classList.add('application')

        let nameh3 = document.createElement('h3')
        nameh3.innerText = `${application.firstName} ${application.lastName}`

        let roleh4 = document.createElement('h4')
        roleh4.innerText = application.role

        let emailp = document.createElement('p')
        emailp.innerText = application.email

        let fullAddress = document.createElement('p')
        fullAddress.innerText = `${application.address}\n${application.city}\n${application.pincode}`

        let datep = document.createElement('p')
        datep.innerText = application.date

        let CVfile = document.createElement('a')
        CVfile.href = application.CV
        CVfile.innerText = 'open CV'
        CVfile.target = '_blank'

        div.append(nameh3, roleh4, emailp, fullAddress, datep, CVfile)
        show.appendChild(div)
    }
}
