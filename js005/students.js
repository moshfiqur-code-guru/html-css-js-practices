
document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init();
});

function generateId() {
    return Math.random().toString(36).substring(2, 10);
}

const students = [{
    // id: generateId(),
    // firstName: "Moshfiqur",
    // lastName: "rahman",
    // class: 10,
    // address: "nayagola",
    // email: "sadik@gmail.com"
}]

function saveStudent() {
    // localStorage.setItem("students", JSON.stringify(students))
}

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
                <button class="delete" onclick="deleteStudent(${index})"><i data-feather="trash"></i></button>
                <button class="edit" onclick="editStudent(${index})"><i data-feather="edit-3"></i></button>
            </td>
        </tr>
        
        `;
        tableBody.appendChild(row);

    });
    feather.replace();
}

displayStudents();


function deleteStudent(index) {

}

function editStudent(index) {

}

saveStudent();
