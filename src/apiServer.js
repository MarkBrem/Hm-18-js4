const HTTP = 'http://localhost:3000/students';

export function getStudent() {
    return fetch(`${HTTP}`)
    .then(res=>res.json())
}

const studentToAdd = {
    "name": "Marko Husyanicya",
    "age": 15,
    "course": "FrontEnd",
    "skills": ["Networking", "Ethical Hacking", "Linux"],
    "email": "mgusanica@gmail.com",
    "isEnrolled": true
}

export function postStudent(newStudent) {
    const options = {
        method: 'POST',
        body: JSON.stringify(newStudent),
        headers: {
        "Content-Type": "application/json; charset=UTF-8",
        },
    }

    return fetch(`${HTTP}`, options)
    .then(res=>res.json())
}

// postStudent(studentToAdd)

export function deleteStudent(id){
    const options = {
        method: 'DELETE',
    }

    return fetch(`${HTTP}/${id}`, options)
    .then(res=>res.json())
}

// deleteStudent("d383")

const studentToUpdate ={
    "id": "5",
      "name": "Mykola",
      "age": 15,
      "course": "Cybersecurity",
      "skills": [
        "Networking",
        "Ethical Hacking",
        "Linux"
      ],
      "email": "mykola.bondarenko@example.com",
      "isEnrolled": true
}

export async function patchStudent(id, studentUpdate){
    const options={
        method: 'PATCH',
        body: JSON.stringify(studentUpdate),
        headers: {
        "Content-Type": "application/json; charset=UTF-8",
        },
    }
    await fetch(`${HTTP}/${id}`, options)
    
}
patchStudent("5", studentToUpdate)