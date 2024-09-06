let id = document.getElementById('CrudMoviles__input');
let marca = document.getElementById('marcaMoviles__input');
let modelo = document.getElementById('modeloMoviles__input');
let color = document.getElementById('colorMoviles__input');
let almacenamiento = document.getElementById('almacenamientoMoviles__input');
let procesador = document.getElementById('procesadorMoviles__input');

function obtenerInformacion(url) {
    axios.get(url)
        .then(function (respuesta) {
            let listaMoviles = document.getElementById('table__Contenido');
            for (let i = 0; i < respuesta.data.dispositivos.length; i++) {
                let nuevaFila = document.createElement('tr');

                //insert ID
                let itemFila1 = document.createElement('td');
                itemFila1.textContent = respuesta.data.dispositivos[i].id;
                nuevaFila.appendChild(itemFila1);

                //insert Marca
                let itemFila2 = document.createElement('td');
                itemFila2.textContent = respuesta.data.dispositivos[i].marca;
                nuevaFila.appendChild(itemFila2);

                //insert Modelo
                let itemFila3 = document.createElement('td');
                itemFila3.textContent = respuesta.data.dispositivos[i].modelo;
                nuevaFila.appendChild(itemFila3);

                //insert Color
                let itemFila4 = document.createElement('td');
                itemFila4.textContent = respuesta.data.dispositivos[i].color;
                nuevaFila.appendChild(itemFila4);

                //insert Almacenamiento
                let itemFila5 = document.createElement('td');
                itemFila5.textContent = respuesta.data.dispositivos[i].almacenamiento;
                nuevaFila.appendChild(itemFila5);

                //insert Procesador
                let itemFila6 = document.createElement('td');
                itemFila6.textContent = respuesta.data.dispositivos[i].procesador;
                nuevaFila.appendChild(itemFila6);

                //Insertar toda las celdas con a fila en la tabla
                listaMoviles.querySelector('tbody').appendChild(nuevaFila);
            }
        })
        .catch(function (error) {
            console.log(error)
        }
        )
}

function eliminar() {
    if (id.value <= 10) {
        let url = ('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id.value)
        axios.delete(url)
            .then(response => {
                //Si la eliminacion fue exitosa
                alert('Recurso eliminado con éxito:', response.data);
                console.log(response.data);
            })
            .catch(error => {
                //Error si ocurrió algun problemita 
                alert('Hubo un error al intentar eliminar el recurso:', error);
            });
    }
    else {
        alert('ID no existe')
    }
}

function cambiar() {
    let urlSelected = ('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id.value)
    fetch(urlSelected, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "id": id.value,
            "marca": marca.value,
            "modelo": modelo.value,
            "color": color.value,
            "almacenamiento": almacenamiento.value,
            "procesador": procesador.value
        })
    })
        .then(respuesta => respuesta.json())
        .then(data => alert(JSON.stringify(data, null, 2)))
        .catch(error => console.error('error', error))
}

obtenerInformacion('https://my-json-server.typicode.com/fedegaray/telefonos/db');
