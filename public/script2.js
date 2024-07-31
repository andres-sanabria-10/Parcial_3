document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.getElementById('Principal');
    const PracticeTeacher = document.getElementById('PracticeTeacher');
    const MobieinicioLink = document.getElementById('PracticeTeacherMobile');


    

    function handlePracticeTeacherClick(e) {
        e.preventDefault();
        const practiceTeacherHTML = `
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <hr>
                    <div class="mb-4">
                        <br>
                        <label for="IdPractica" class="form-label">A partir de un ID de una práctica el sistema debe proveer el listado de estudiantes que asisten a la práctica</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="IdPractica" name="IdPractica" required>
                            <button id="searchButton" class="btn btn-primary">Buscar</button>
                        </div>
                        <div class="invalid-feedback">
                            Por favor proporcione el id de la Practica.
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div id="studentTableContainer" class="mt-4"></div>
                </div>
            </div>
        </div>
        `;

        // Reemplaza el contenido del main
        mainContent.innerHTML = practiceTeacherHTML;
        MobieinicioLink.addEventListener('click', function (e) {
            e.preventDefault();
            mainContent.innerHTML = practiceTeacherHTML;
        });
        // Añade el event listener al botón de búsqueda
        document.getElementById('searchButton').addEventListener('click', fetchStudents);
    }

    function fetchStudents() {
        const practiceId = document.getElementById('IdPractica').value;
        if (!practiceId) {
            alert('Por favor, ingrese un ID de práctica válido');
            return;
        }

        fetch(`http://localhost:8080/practices/${practiceId}/students`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(students => {
                displayStudents(students);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Hubo un error al buscar los estudiantes. Por favor, intente de nuevo.');
            });

    }

    function displayStudents(students) {
        const tableContainer = document.getElementById('studentTableContainer');
        if (students.length === 0) {
            tableContainer.innerHTML = '<p>No se encontraron estudiantes para esta práctica.</p>';
            return;
        }

        let tableHTML = `
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Código</th>
                </tr>
            </thead>
            <tbody>
        `;

        students.forEach(student => {
            tableHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.lastName}</td>
                <td>${student.code}</td>
            </tr>
            `;
        });

        tableHTML += `
            </tbody>
        </table>
        `;

        tableContainer.innerHTML = tableHTML;
    }

    if (PracticeTeacher) {
        PracticeTeacher.addEventListener('click', handlePracticeTeacherClick);
    }
    if (PracticeMobile) {
        PracticeMobile.addEventListener('click', handlePracticeTeacherClick);
    }
});