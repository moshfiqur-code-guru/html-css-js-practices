
// #################### modal script #####################//

document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init();
});


//###################### function for id generate ####################// 

function generateStudentId() {
    const students = JSON.parse(localStorage.getItem("students")) || [];

    return 2026000 + students.length;
}



//###################################################################################// 
// script for getting a student info  from HTML form and saving it to local storage //
// ################################################################################//

const studentForm = document.getElementById("studentForm");

const errors = document.getElementById("errors");

modalSaveBtn.addEventListener("click", () => {
    event.preventDefault();
    const formData = new FormData(studentForm);
    const student = Object.fromEntries(formData);

    if (editableIndex !== null) {

    } else if (student.firstName.trim() == "" || student.lastName.trim() == "" || student.class.trim() == "" || student.email.trim() == "" || student.address.trim() == "") {
        errors.textContent = "Please fill all the input !!";
    } else {
        errors.textContent = "";
        student["id"] = generateStudentId();
        getStudent.push(student);
        MicroModal.close('modal-1');
        studentForm.reset();
    }
    saveStudent();
    displayStudents();

});

// const students = [{
//     id: generateStudentId(),
//     firstName: "Moshfiqur",
//     lastName: "rahman",
//     class: 10,
//     address: "nayagola",
//     email: "sadik@gmail.com"
// }]


function saveStudent() {
    localStorage.setItem("students", JSON.stringify(getStudent));
}

// saveStudent();



//##############################################################################//
// Script For display in student info on HTML by getting it from local storage //
//############################################################################//

const getStudent = JSON.parse(localStorage.getItem("students"));

let tableBody = document.getElementById("tableBody");


function displayStudents() {
    tableBody.innerHTML = "";

    getStudent.forEach(function (getStudent, index) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <tr>
            <td>${index + 1}</td>
            <td><img src="avater.jpg" alt=""></td>
            <td>${getStudent.firstName} ${getStudent.lastName}</td>
            <td>${getStudent.class}</td>
            <td>${getStudent.id}</td>
            <td>${getStudent.email}</td>
            <td>${getStudent.address}</td>
            <td>
                <button class="delete" onclick="deleteStudent(${index}, ${getStudent.id})"><i data-feather="trash"></i></button>
                <button class="edit" onclick="editStudent(${index}, ${getStudent.id})" data-micromodal-trigger="modal-1"><i data-feather="edit-3"></i></button>
            </td>
        </tr>
        
        `;
        tableBody.appendChild(row);

    });
    feather.replace();
}

displayStudents();




//###########################################//
// script for deleting a student from table //
//#########################################//

function deleteStudent(index, id) {
    const confirmation = confirm("Are you want to delete this student??");

    if (!confirmation) return;
    getStudent.splice(index, 1);
    saveStudent();
    displayStudents();
}



//##########################################################################//
// Script editing student on the table, also editing table title and button//
//########################################################################//

let modalTitle = "Add New Student";
let modalBtnLabel = "Add new";
const modalTitleElement = document.getElementById("modal-1-title");
const modalBtnElement = document.getElementById("modalSaveBtn");

let editableIndex = null;

function editStudent(index) {
    errors.textContent = "";
    modalTitle = "Edit Student Info";
    modalBtnLabel = "Update";
    editableIndex = index;
    setModalTitleAndBtn();
    const student = getStudent[index];
    console.log(student);
}

function setModalTitleAndBtn() {
    modalTitleElement.textContent = modalTitle;
    modalBtnElement.textContent = modalBtnLabel;
}


function setDefaultTitle() {
    errors.textContent = "";
    modalTitle = "Add New Student";
    modalBtnLabel = "Add new";
    setModalTitleAndBtn();
}
setModalTitleAndBtn();


saveStudent();
