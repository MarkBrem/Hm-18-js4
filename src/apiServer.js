const HTTP = 'http://localhost:3000/students';

export async function getStudent() {
    const result = await fetch(`${HTTP}`)
    const student = await result.json()
    return student
}

const studentToAdd = {
    "name": "Marko Husyanicya",
    "age": 15,
    "course": "FrontEnd",
    "skills": ["Networking", "Ethical Hacking", "Linux"],
    "email": "mgusanica@gmail.com",
    "isEnrolled": true
}

export async function postStudent(newStudent) {
    const options = {
        method: 'POST',
        body: JSON.stringify(newStudent),
        headers: {
        "Content-Type": "application/json; charset=UTF-8",
        },
    }

    const result = await fetch(`${HTTP}`, options)
    const student = await result.json()
    return student
}

// postStudent(studentToAdd)

export async function deleteStudent(id){
    const options = {
        method: 'DELETE',
    }

    const result = await fetch(`${HTTP}/${id}`, options)
    const student = await result.json()
    return student
}

// deleteStudent("8947")



export async function patchStudent(id, studentUpdate){
    const options={
        method: 'PATCH',
        body: JSON.stringify(studentUpdate),
        headers: {
        "Content-Type": "application/json; charset=UTF-8",
        },
    }

    const result = await fetch(`${HTTP}/${id}`, options)
    const student = await result.json()
    return student
}
