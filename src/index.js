import {getStudent} from './apiServer'
import {postStudent} from './apiServer'
import {deleteStudent} from './apiServer'
import {patchStudent} from './apiServer'

const HTTP = 'http://localhost:3000/students';

const list = document.querySelector('.student-list')
const btnStudent = document.querySelector('.student-btn')
const form = document.querySelector('form')

const modal = document.getElementById("updateModal");
const closeModal = document.querySelector(".close");
const updateForm = document.getElementById("updateForm");

let currentStudentId = null;  

form.addEventListener('submit', onSubmit)

btnStudent.addEventListener('click', () => {
    getStudent().then(students => {
        const addStudent = studentList(students)
        list.innerHTML = '';  
        list.insertAdjacentHTML('beforeend', addStudent);
        attachHandlers(); 
    })
})

function onSubmit(event) {
    event.preventDefault()

    const formEl = event.currentTarget.elements
    const newStudent = {
      name: formEl.name.value,
      age: formEl.age.value,
      course: formEl.course.value,
      skills: [formEl.skills.value],
      email: formEl.email.value,
      isEnrolled: formEl.isEnrolled.checked
    }
    postStudent(newStudent).then(() => {
        alert('Студента додано');
        btnStudent.click(); 
    });
    event.currentTarget.reset();
}

function studentList(addList) {
    return addList.map((student) => {
        return `
        <li data-id="${student.id}">
            <h1>Ім'я: ${student.name}</h1>
            <p>Вік: ${student.age}</p>
            <p>Курс: ${student.course}</p>
            <p>Скіли: ${student.skills}</p>
            <p>Email: ${student.email}</p>
            <p>Зараховано: ${student.isEnrolled}</p>
            <button class="student-delete">Видалити студента</button>
            <button class="student-update">Оновити студента</button>
        </li>
        `
    }).join('');
}

function attachHandlers() {
    document.querySelectorAll('.student-delete').forEach(button => {
        button.addEventListener('click', onDeleteStudent);
    });
    document.querySelectorAll('.student-update').forEach(button => {
        button.addEventListener('click', onUpdateStudent);
    });
}

function onDeleteStudent(event) {
    const studentElement = event.target.closest('li');
    const studentId = studentElement.dataset.id;

    deleteStudent(studentId).then(() => {
        alert('Студента видалено');
        studentElement.remove(); 
    });
}

function onUpdateStudent(event) {
    const studentElement = event.target.closest('li');
    currentStudentId = studentElement.dataset.id;

    const student = {
        name: studentElement.querySelector('h1').textContent.replace("Ім'я: ", ""),
        age: studentElement.querySelector('p:nth-of-type(1)').textContent.replace("Вік: ", ""),
        course: studentElement.querySelector('p:nth-of-type(2)').textContent.replace("Курс: ", ""),
        skills: studentElement.querySelector('p:nth-of-type(3)').textContent.replace("Скіли: ", ""),
        email: studentElement.querySelector('p:nth-of-type(4)').textContent.replace("Email: ", ""),
        isEnrolled: studentElement.querySelector('p:nth-of-type(5)').textContent.includes('true')
    };

    updateForm.name.value = student.name;
    updateForm.age.value = student.age;
    updateForm.course.value = student.course;
    updateForm.skills.value = student.skills;
    updateForm.email.value = student.email;
    updateForm.isEnrolled.checked = student.isEnrolled;

    modal.style.display = "block";  
}


closeModal.onclick = () => { modal.style.display = "none"; };

updateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const updatedStudent = {
        name: updateForm.name.value,
        age: updateForm.age.value,
        course: updateForm.course.value,
        skills: updateForm.skills.value.split(','), 
        email: updateForm.email.value,
        isEnrolled: updateForm.isEnrolled.checked
    };

    patchStudent(currentStudentId, updatedStudent).then(() => {
        alert('Дані студента оновлено');
        modal.style.display = "none"; 
        btnStudent.click();
    });
});

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}