
// #################### modal script #####################//

document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init();
});


//###################### function for id generate ####################// 

function generateStudentId() {
    const students = JSON.parse(localStorage.getItem("students")) || [];

    return 2026000 + students.length;
}


//##############################################################//
//#############################################################//
//############################################################//


const studentForm = document.getElementById("studentForm");
const errors = document.getElementById("errors");
const studentImagePicker = document.getElementById("student-image");
const preview = document.getElementById("preview");
const modalTitleElement = document.getElementById("modal-1-title");
const modalBtnElement = document.getElementById("modalSaveBtn");
const errorElements = document.querySelectorAll(".input-error");


let modalTitle = "Add New Student";
let modalBtnLabel = "Add new";

let editableIndex = null;
let currentID = null;
let massage = "";



//###################################################################################// 
// script for getting a student info  from HTML form and saving it to local storage //
// ################################################################################//



modalBtnElement.addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData(studentForm);
    const student = Object.fromEntries(formData);

    student["image"] = student.image.name;
    student["id"] = currentID ?? generateStudentId();

    const validateError = validateStudent(student);

    if (Object.keys(validateError).length === 0) {

        if (editableIndex !== null) {

            getStudent[editableIndex] = student;
            currentID = null;
            editableIndex = null;
            massage = "Successfully Updated"
            studentForm.reset();
            MicroModal.close('modal-1');

        } else {
            errors.textContent = "";
            massage = "Successfully Saved"
            getStudent.push(student);
            MicroModal.close('modal-1');
            studentForm.reset();
        }
        saveStudent();
        displayStudents();
        studentForm.reset();
        Swal.fire({
            title: `${massage}`,
            icon: "success"
        });

    } else {
        // Object.keys(validateError).forEach((key) => {

        //     const input = studentForm.elements[key];
        //     const errorElement = input.nextElementSibling;
        //     console.log(errorElement);
        //     errorElement.textContent = validateError[key];

        // });

        alert("error");
    }



});


function validateStudent(student) {

    const keys = Object.keys(student)
    let error = {};
    keys.forEach((keys) => {
        if (student[keys].toString().trim() === "") {
            error[keys] = `your ${keys} filed is empty`
        }
    })

    return error;

}

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






//######################## preview image ###########################//


studentImagePicker.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const url = URL.createObjectURL(file);
        preview.src = url;
    }
})




//##############################################################################//
// Script For display in student info on HTML by getting it from local storage //
//############################################################################//

const getStudent = JSON.parse(localStorage.getItem("students")) ?? [];

let tableBody = document.getElementById("tableBody");


function displayStudents() {
    tableBody.innerHTML = "";

    if (getStudent.length > 0) {
        getStudent.forEach(function (getStudent, index) {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="img/${getStudent.image}" alt=""></td>
            <td>${getStudent.firstName} ${getStudent.lastName}</td>
            <td>${getStudent.class}</td>
            <td>${getStudent.id}</td>
            <td>${getStudent.email}</td>
            <td>${getStudent.address}</td>
            <td>
                <button class="delete" onclick="deleteStudent(${index}, ${getStudent.id})"><i data-feather="trash"></i></button>
                <button class="edit" onclick="editStudent(${index}, ${getStudent.id})" data-micromodal-trigger="modal-1"><i data-feather="edit-3"></i></button>
            </td>
        
        `;
            tableBody.appendChild(row);

        });

    } else {
        const row = document.createElement("tr");

        row.innerHTML = `
        
        <td colspan="8" id="empty-massage"><i data-feather="alert-triangle"></i><p>Student table is empty</p></td>
        `;
        tableBody.appendChild(row);
    }
    feather.replace();
}

displayStudents();






//###########################################//
// script for deleting a student from table //
//#########################################//

function deleteStudent(index, id) {
    // const confirmation = confirm("Are you want to delete this student??");
    //  if (!confirmation) return;

    Swal.fire({
        title: "Are you sure to delete this student?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(251, 90, 90)",
        cancelButtonColor: "#2a98ff",
        confirmButtonText: "Delete!"
    }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
            getStudent.splice(index, 1);
            saveStudent();
            displayStudents();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}



//##########################################################################//
// Script editing student on the table, also editing table title and button//
//########################################################################//



function editStudent(index, id) {
    MicroModal.show('modal-1');
    errors.textContent = "";
    modalTitle = "Edit Student Info";
    modalBtnLabel = "Update";
    editableIndex = index;
    currentID = id;

    setModalTitleAndBtn();
    const student = getStudent[index];
    const keys = Object.keys(student);


    keys.forEach((keys, index) => {
        if (keys !== "id" && keys !== "image") {
            studentForm.elements[keys].value = student[keys];
        } else if (student.image == "") {
            preview.src = "add image.png";
        } else {
            preview.src = "img/" + student.image;
        }
    })
    saveStudent();
}

function setModalTitleAndBtn() {
    modalTitleElement.textContent = modalTitle;
    modalBtnElement.textContent = modalBtnLabel;
}


function setDefaultTitle() {
    editableIndex = null;

    studentForm.reset();
    studentImagePicker.value = "";
    preview.src = "add image.png";
    errors.textContent = "";

    modalTitle = "Add New Student";
    modalBtnLabel = "Add new";

    setModalTitleAndBtn();

    MicroModal.show("modal-1");
}
setModalTitleAndBtn();


// saveStudent();
