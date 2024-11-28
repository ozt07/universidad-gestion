// Función para obtener estudiantes desde la API
async function fetchStudents() {
    try {
        const response = await fetch('http://localhost:3000/estudiantes');
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        console.error("Error al obtener estudiantes:", error);
    }
}

// Función para mostrar la lista de estudiantes en la página
function displayStudents(students) {
    const studentsList = document.getElementById('students');
    studentsList.innerHTML = '';  // Limpiar la lista antes de agregar elementos

    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.nom_e} - ${student.cod_e}`;
        studentsList.appendChild(li);
    });
}

// Llamar a la función para obtener los estudiantes cuando se cargue la página
window.onload = fetchStudents;
