fetch('http://localhost:8080/student', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    
    }
})
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('table tbody');
        data.data.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.birthday}</td>
                <td>${student.gender ? 'Male' : 'Female'}</td>
                <td>${student.locker ? student.locker.id : 'N/A'}</td>
                <td>${student.lastName}</td>
                <td>${student.name}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));