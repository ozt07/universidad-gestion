const API_URL = "http://localhost:3000/api/asignaturas";

// Registrar asignatura
document.getElementById("form-registro").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const intensidad = document.getElementById("intensidad").value;
  const creditos = document.getElementById("creditos").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, intensidad, creditos }),
  });

  const data = await response.json();
  alert(data.message || "Asignatura registrada");
  document.getElementById("form-registro").reset();
});

// Consultar todas las asignaturas
document.getElementById("btn-consulta-total").addEventListener("click", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
});

// Consultar asignatura por ID
document.getElementById("form-consulta-individual").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("consulta-id").value;

  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
});

// Actualizar asignatura
document.getElementById("form-actualizar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("update-id").value;
  const nombre = document.getElementById("update-nombre").value;
  const intensidad = document.getElementById("update-intensidad").value;
  const creditos = document.getElementById("update-creditos").value;

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, intensidad, creditos }),
  });

  const data = await response.json();
  alert(data.message || "Asignatura actualizada");
  document.getElementById("form-actualizar").reset();
});

// Eliminar asignatura
document.getElementById("form-eliminar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("delete-id").value;

  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  const data = await response.json();
  alert(data.message || "Asignatura eliminada");
  document.getElementById("form-eliminar").reset();
});
