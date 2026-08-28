
// #################### modal script #####################//

document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init();
});



//##############################################################//
//#############################################################//
//############################################################//


const teachersForm = document.getElementById("teachersForm");
const teachersImagePicker = document.getElementById("teachers-image");
const preview = document.getElementById("preview");
const modalTitleElement = document.getElementById("modal-1-title");
const modalBtnElement = document.getElementById("modalSaveBtn");
const errorElements = document.querySelectorAll(".input-error");


let modalTitle = "Add New Teacher";
let modalBtnLabel = "Add new";

let editableIndex = null;
let currentID = null;
let massage = "";



//###################################################################################// 
// script for getting a teacher info  from HTML form and saving it to local storage //
// ################################################################################//



modalBtnElement.addEventListener("click", (event) => {
    event.preventDefault();
    clearErrors()

    const formData = new FormData(teachersForm);
    const teacher = Object.fromEntries(formData);

    teacher["image"] = teacher.image.name;

    const validateError = validateTeacher(teacher);

    if (Object.keys(validateError).length === 0) {

        if (editableIndex !== null) {

            getTeacher[editableIndex] = teacher;
            currentID = null;
            editableIndex = null;
            massage = "Successfully Updated"
            teachersForm.reset();
            MicroModal.close('modal-1');

        } else {
            massage = "Successfully Saved"
            getTeacher.push(teacher);
            MicroModal.close('modal-1');
            teachersForm.reset();
        }
        clearErrors()
        saveTeacher();
        displayTeachers();
        teachersForm.reset();
        Swal.fire({
            title: `${massage}`,
            icon: "success"
        });

    } else {
        Object.keys(validateError).forEach((key) => {

            const input = teachersForm.elements[key];
            const errorElements = input.nextElementSibling;
            console.log(errorElements);
            errorElements.textContent = "!" + " " + validateError[key];

        });

        // alert("error");
    }



});

//################### Validation function ######################//

function validateTeacher(teacher) {
    const keys = Object.keys(teacher)
    let error = {};
    keys.forEach((keys) => {
        if (teacher[keys].toString().trim() === "") {
            error[keys] = `your ${keys} filed is empty`
        }
    })
    return error;
}

// const teachers = [{
//     id: generateTeacherId(),
//     firstName: "Moshfiqur",
//     lastName: "rahman",
//     class: 10,
//     address: "nayagola",
//     email: "sadik@gmail.com"
// }]

//######################### Save teacher to local storage ########################//

function saveTeacher() {
    localStorage.setItem("teachers", JSON.stringify(getTeacher));
}

// saveteacher();


//######################## preview image ###########################//


teachersImagePicker.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const url = URL.createObjectURL(file);
        preview.src = url;
    }
})




//##############################################################################//
// Script For display in teacher info on HTML by getting it from local storage //
//############################################################################//

const getTeacher = JSON.parse(localStorage.getItem("teachers")) || [];

let tableBody = document.getElementById("tableBody");


function displayTeachers() {
    tableBody.innerHTML = "";

    if (getTeacher.length > 0) {
        getTeacher.forEach(function (getTeacher, index) {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="img/${getTeacher.image}" alt=""></td>
            <td>${getTeacher.firstName} ${getTeacher.lastName}</td>
            <td>${getTeacher.class}</td>
            <td>${getTeacher.email}</td>
            <td>${getTeacher.phone}</td>
            <td>${getTeacher.address}</td>
            <td>
                <button class="delete" onclick="deleteTeacher(${index})"><i data-feather="trash"></i></button>
                <button class="edit" onclick="editTeacher(${index})" data-micromodal-trigger="modal-1"><i data-feather="edit-3"></i></button>
            </td>
        
        `;
            tableBody.appendChild(row);

        });

    } else {
        const row = document.createElement("tr");
        row.innerHTML =
            `
        <td colspan="8" id="empty-massage"><i data-feather="alert-triangle"></i><p>Teacher table is empty</p></td>
        `;
        tableBody.appendChild(row);
    }
    feather.replace();
}

displayTeachers();


//###########################################//
// script for deleting a teacher from table //
//#########################################//

function deleteTeacher(index) {
    // const confirmation = confirm("Are you want to delete this teacher??");
    //  if (!confirmation) return;

    Swal.fire({
        title: "Are you sure to delete this teacher?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(251, 90, 90)",
        cancelButtonColor: "#2a98ff",
        confirmButtonText: "Delete!"
    }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
            getTeacher.splice(index, 1);
            saveTeacher();
            displayTeachers();
            Swal.fire({
                title: "Deleted!",
                // text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}



//##########################################################################//
// Script editing teacher on the table, also editing table title and button//
//########################################################################//



function editTeacher(index) {
    MicroModal.show('modal-1');

    clearErrors()
    modalTitle = "Edit Teacher Info";
    modalBtnLabel = "Update";
    editableIndex = index;

    setModalTitleAndBtn();
    const teacher = getTeacher[index];
    const keys = Object.keys(teacher);


    keys.forEach((keys, index) => {
        if (keys !== "id" && keys !== "image") {
            teachersForm.elements[keys].value = teacher[keys];
        } else if (teacher.image == "") {
            preview.src = "add image.png";
        } else {
            let url = "img/" + teacher.image;
            preview.src = url;
            fetch(url).then(async (result) => {
                const blob = await result.blob();
                const file = new File(
                    [blob],
                    teacher.image,
                    { type: blob.type }
                )
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                teachersImagePicker.files = dataTransfer.files;
            })

        }
    })
    saveTeacher();
}




//############### function for Dynamically changing From title and button ###################//


function setModalTitleAndBtn() {
    modalTitleElement.textContent = modalTitle;
    modalBtnElement.textContent = modalBtnLabel;
}


function setDefaultTitle() {
    editableIndex = null;

    clearErrors()
    teachersForm.reset();
    teachersImagePicker.value = "";
    preview.src = "add image.png";

    modalTitle = "Add New Teacher"
    modalBtnLabel = "Add new";

    setModalTitleAndBtn();

    MicroModal.show("modal-1");
}
setModalTitleAndBtn();


// saveTeacher();


//######################## clearing error ##############################//

function clearErrors() {
    errorElements.forEach((error) => {
        error.textContent = "";
    });
}