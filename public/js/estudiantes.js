const API_URL = 'http://localhost:3000/estudiantes';

// Función para obtener todos los estudiantes
async function obtenerEstudiantes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener estudiantes');
    const { data: estudiantes } = await response.json(); // Asumiendo que el array viene en "data"
    console.log(estudiantes); // Para verificar los datos
    actualizarTabla(estudiantes);
  } catch (error) {
    console.error(error);
    alert('Hubo un error al obtener los estudiantes');
  }
}

// Función para agregar un nuevo estudiante
async function agregarEstudiante(estudiante) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estudiante),
    });
    if (!response.ok) throw new Error('Error al agregar estudiante');
    const resultado = await response.json();
    alert(resultado.message);
    obtenerEstudiantes(); // Actualiza la lista de estudiantes
  } catch (error) {
    console.error(error);
    alert('Hubo un error al agregar el estudiante');
  }
}

// Función para actualizar un estudiante
async function actualizarEstudiante(cod_e, estudiante) {
  try {
    const response = await fetch(`${API_URL}/${cod_e}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estudiante),
    });
    if (!response.ok) throw new Error('Error al actualizar estudiante');
    const resultado = await response.json();
    alert(resultado.message);
    obtenerEstudiantes();
  } catch (error) {
    console.error(error);
    alert('Hubo un error al actualizar el estudiante');
  }
}

// Función para eliminar un estudiante
async function eliminarEstudiante(cod_e) {
  try {
    const response = await fetch(`${API_URL}/${cod_e}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar estudiante');
    const resultado = await response.json();
    alert(resultado.message);
    obtenerEstudiantes(); // Actualiza la lista después de eliminar
  } catch (error) {
    console.error(error);
    alert('Hubo un error al eliminar el estudiante');
  }
}

// Función de búsqueda de estudiantes
function buscarEstudiantes() {
  const busqueda = document.getElementById('buscar-estudiantes').value.toLowerCase();
  const estudiantes = document.querySelectorAll('#tabla-estudiantes tr');
  estudiantes.forEach((fila) => {
    const nombre = fila.querySelector('td:nth-child(2)')?.textContent?.toLowerCase() || '';
    fila.style.display = nombre.includes(busqueda) ? '' : 'none';
  });
}

// Función para actualizar la tabla de estudiantes
function actualizarTabla(estudiantes) {
  const tabla = document.getElementById('tabla-estudiantes');
  tabla.innerHTML = ''; // Limpia la tabla antes de actualizar
  estudiantes.forEach((estudiante) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${estudiante.cod_e}</td>
      <td>${estudiante.nom_e}</td>
      <td>${estudiante.dir_e}</td>
      <td>${estudiante.tel_e}</td>
      <td>${new Date(estudiante.fech_nac).toLocaleDateString()}</td>
      <td>
        <button onclick="eliminarEstudiante(${estudiante.cod_e})">Eliminar</button>
        <button onclick="mostrarFormularioActualizar(${estudiante.cod_e})">Actualizar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// Llamar a obtenerEstudiantes cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
  obtenerEstudiantes();
});
