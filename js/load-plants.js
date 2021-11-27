const plants = document.getElementById('plants');
const error = document.getElementById('error');

(()=>{
    const token = 'Bearer ' + localStorage.getItem('token');

    fetch(base_url + '/planta/mine',
    {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then(r => r.json())
    .then(resp => {
        console.log(resp);
        if(resp.length == 0){
            error.innerHTML = `
            <div class="my-5">
                <h1>
                    No tienes ninguna plantita
                    😭
                </h1>
            </div>`;
        }
        plants.innerHTML = '';

        resp.forEach(r => {
            const last = r['last_rec'];
            const body = `
            <div class="card shadow">
                <img class="card-img-top plant" src="assets/images/plant.png" alt="Mi plantita">
                <div class="card-body">
                    <h5 id="nombre" class="card-title text-center font-weight-bold">
                        Planta #${ r['id_micro'] }
                    </h5>
                    <div class="text-center my-3">
                        <i class="far fa-clock mr-1"></i>
                        ${ new Date(last['recTime']) }
                        <br>
                        <i class="fas fa-tint ml-3 mr-1 humedad"></i>
                        ${ last['humedad'] } %
                        <i class="fas fa-thermometer-three-quarters ml-3 mr-1 temperatura"></i>
                        ${ last['temperatura'] } °C
                        <i class="fas fa-sun ml-3 mr-1 luminosidad"></i>
                        ${ last['luminosidad'] } lx
                    </div>
                    <div class="text-center">
                        <a href="plant.html?id=1" class="btn btn-success px-5">
                            Más detalles
                        </a>
                    </div>
                </div>
            </div>`

            plants.innerHTML += body;
        });
    }).catch(error=>{
        console.log(error);
        if(error){
            alertar('Error al recibir plantitas', 'danger');
        }
    });

})();
