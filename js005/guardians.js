
// #################### modal script #####################//

document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init();
});


//##############################################################//
//#############################################################//
//############################################################//


const guardiansForm = document.getElementById("guardiansForm");
const modalTitleElement = document.getElementById("modal-1-title");
const modalBtnElement = document.getElementById("modalSaveBtn");
const errorElements = document.querySelectorAll(".input-error");


let modalTitle = "Add New Guardians";
let modalBtnLabel = "Add new";

let editableIndex = null;
let massage = "";



//###################################################################################// 
// script for getting a guardian info  from HTML form and saving it to local storage //
// ################################################################################//



modalBtnElement.addEventListener("click", (event) => {
    event.preventDefault();
    clearErrors()

    const formData = new FormData(guardiansForm);
    const guardian = Object.fromEntries(formData);

    const validateError = validateGuardian(guardian);

    if (Object.keys(validateError).length === 0) {

        if (editableIndex !== null) {

            getGuardian[editableIndex] = guardian;
            editableIndex = null;
            massage = "Successfully Updated"
            guardiansForm.reset();
            MicroModal.close('modal-1');

        } else {
            massage = "Successfully Saved"
            getGuardian.push(guardian);
            MicroModal.close('modal-1');
            guardiansForm.reset();
        }
        clearErrors()
        saveGuardian();
        displayGuardians();
        guardiansForm.reset();
        Swal.fire({
            title: `${massage}`,
            icon: "success"
        });

    } else {
        Object.keys(validateError).forEach((key) => {

            const input = guardiansForm.elements[key];
            const errorElements = input.nextElementSibling;
            console.log(errorElements);
            errorElements.textContent = "!" + " " + validateError[key];

        });

        // alert("error");
    }



});

//################### Validation function ######################//

function validateGuardian(guardian) {
    const keys = Object.keys(guardian)
    let error = {};
    keys.forEach((keys) => {
        if (guardian[keys].toString().trim() === "") {
            error[keys] = `your ${keys} filed is empty`
        }
    })
    return error;
}

// const guardians = [{
//     id: generateGuardianId(),
//     firstName: "Moshfiqur",
//     lastName: "rahman",
//     class: 10,
//     address: "nayagola",
//     email: "sadik@gmail.com"
// }]

//######################### Save guardian to local storage ########################//

function saveGuardian() {
    localStorage.setItem("guardians", JSON.stringify(getGuardian));
}

// saveguardian();


//######################## preview image ###########################//


// guardiansImagePicker.addEventListener("change", function () {
//     const file = this.files[0];

//     if (file) {
//         const url = URL.createObjectURL(file);
//         preview.src = url;
//     }
// })




//##############################################################################//
// Script For display in guardian info on HTML by getting it from local storage //
//############################################################################//

const getGuardian = JSON.parse(localStorage.getItem("guardians")) || [];

let tableBody = document.getElementById("tableBody");


function displayGuardians() {
    tableBody.innerHTML = "";

    if (getGuardian.length > 0) {
        getGuardian.forEach(function (getGuardian, index) {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${index + 1}</td>
            <td>${getGuardian.firstName} ${getGuardian.lastName}</td>
            <td>${getGuardian.relation}</td>
            <td>${getGuardian.studentsName}</td>
            <td>${getGuardian.id}</td>
            <td>${getGuardian.phone}</td>
            <td>${getGuardian.email}</td>
            <td>
                <button class="delete" onclick="deleteGuardian(${index})"><i data-feather="trash"></i></button>
                <button class="edit" onclick="editGuardian(${index})" data-micromodal-trigger="modal-1"><i data-feather="edit-3"></i></button>
            </td>
        
        `;
            tableBody.appendChild(row);

        });

    } else {
        const row = document.createElement("tr");
        row.innerHTML =
            `
        <td colspan="8" id="empty-massage"><i data-feather="alert-triangle"></i><p>Guardian table is empty</p></td>
        `;
        tableBody.appendChild(row);
    }
    feather.replace();
}

displayGuardians();


//###########################################//
// script for deleting a guardian from table //
//#########################################//

function deleteGuardian(index) {
    // const confirmation = confirm("Are you want to delete this guardian??");
    //  if (!confirmation) return;

    Swal.fire({
        title: "Are you sure to delete this guardian?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(251, 90, 90)",
        cancelButtonColor: "#2a98ff",
        confirmButtonText: "Delete!"
    }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
            getGuardian.splice(index, 1);
            saveGuardian();
            displayGuardians();
            Swal.fire({
                title: "Deleted!",
                // text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}



//##########################################################################//
// Script editing guardian on the table, also editing table title and button//
//########################################################################//



function editGuardian(index) {
    MicroModal.show('modal-1');

    clearErrors()
    modalTitle = "Edit Guardian Info";
    modalBtnLabel = "Update";
    editableIndex = index;

    setModalTitleAndBtn();
    const guardian = getGuardian[index];
    const keys = Object.keys(guardian);


    keys.forEach((keys, index) => {
        if (keys !== "id") {
            guardiansForm.elements[keys].value = guardian[keys];
        }
    })
    saveGuardian();
}

//############### function for Dynamically changing From title and button ###################//


function setModalTitleAndBtn() {
    modalTitleElement.textContent = modalTitle;
    modalBtnElement.textContent = modalBtnLabel;
}


function setDefaultTitle() {
    editableIndex = null;

    clearErrors()
    guardiansForm.reset();

    modalTitle = "Add New Guardian"
    modalBtnLabel = "Add new";

    setModalTitleAndBtn();

    MicroModal.show("modal-1");
}
setModalTitleAndBtn();


// saveGuardian();


//######################## clearing error ##############################//

function clearErrors() {
    errorElements.forEach((error) => {
        error.textContent = "";
    });
}


const guardianStudent = document.getElementById("guardianStudent");
const students = JSON.parse(localStorage.getItem("students")) || [];

function loadStudents() {

    students.forEach((student) => {

        const option = document.createElement("option");

        option.value = student.firstName + " " + student.lastName;
        option.textContent = `${student.firstName} ${student.lastName} - ${student.id}`;

        guardianStudent.appendChild(option);
    });
}

loadStudents();