import {getStudent} from './apiServer'
import {postStudent} from './apiServer'
import {deleteStudent} from './apiServer'
import {patchStudent} from './apiServer'

const HTTP = 'http://localhost:3000/students';

const list = document.querySelector('.student-list')
const btnStudent = document.querySelector('.student-btn')
const deleteBtn = document.querySelector('.student-delete')
const form = document.querySelector('form')

form.addEventListener('submit', onSubmit)

btnStudent.addEventListener('click', ()=>{
    getStudent().then(students => {const addStudent = studentList(students)
        list.insertAdjacentHTML('beforeend', addStudent)
    })
})

function onSubmit(event){
    event.preventDefault()

    const formEl = event.currentTarget.elements
    const newStudent={
      name: formEl.name.value,
      age: formEl.age.value,
      course: formEl.course.value,
      skills: [formEl.skills.value],
      email: formEl.email.value,
      isEnrolled: formEl.isEnrolled.checked
    }

    event.currentTarget.reset()
}

function studentList(addList){
    return addList.map((student)=>{
        return `
        <li>
      <h1>Ім'я: ${student.name}</h1>
      <p>Вік: ${student.age}</p>
      <p>Курс: ${student.course}</p>
      <p>Скіли: ${student.skills}</p>
      <p>Email: ${student.email}</p>
      <p>Зараховано: ${student.isEnrolled}</p>
      <button class="student-delete">Видалити студента</button>
      <button>Оновити студента</button>
    </li>
        `
    })
}

