/* global bootstrap fetch */
(() => {
    'use strict'

    let btCrearPais = document.getElementById('btCrearPais');
    let code = document.getElementById('code');
    let name = document.getElementById('name');
    let editCode = document.getElementById('editCode');
    let editName = document.getElementById('editName');
    let editUrl = document.getElementById('editUrl');
    let infoDelete = document.getElementById('infoDelete');
    let deleteCode = document.getElementById('deleteCode');
    let deleteName = document.getElementById('deleteName');
    let deleteUrl = document.getElementById('deleteUrl');

    const csrf = document.querySelector('meta[name="csrf-token"]')['content'];
    const url = document.querySelector('meta[name="url-base"]')['content'];

    document.addEventListener("DOMContentLoaded", function(event) {
        peticionPaises();
        btCrearPais.onclick = function() {
            let data = {
              code: code.value,
              name: name.value,
            };
            //validar en js, nos lo saltamnos
            llamadaAjax(data);
        };
    });

    document.getElementById('btEditarPais').onclick = () =>{
        peticionEditPais();
    };
    document.getElementById('btBorrarPais').onclick = () =>{
        peticionDeletePais();
    };
    
    var editPaisModal = document.getElementById('editPaisModal')
    editPaisModal.addEventListener('shown.bs.modal', function (event) {
      /*console.table({
          dataset : event.relatedTarget.dataset.url,
          datasetCode : event.relatedTarget.dataset.code,
      });*/
      //let url = event.relatedTarget.dataset.url;
      //let code = event.relatedTarget.dataset.code;
      peticionPais(event.relatedTarget.dataset);
      
      /*editCode.value = code;
      editUrl.value = url;
      editName.value = '';*/
    });
    
    editPaisModal.addEventListener('hidden.bs.modal', function (event) {
        editCode.value = '';
        editUrl.value = '';
        editName.value = '';
    });
    
    var deletePaisModal = document.getElementById('deletePaisModal')
    deletePaisModal.addEventListener('shown.bs.modal', function (event) {
      console.table({
          dataset : event.relatedTarget.dataset.url,
          datasetCode : event.relatedTarget.dataset.code,
      });
      //let url = event.relatedTarget.dataset.url;
      //let code = event.relatedTarget.dataset.code;
      //peticionPais(event.relatedTarget.dataset);
      peticionDatosDeletePais(event.relatedTarget.dataset);
      
      /*editCode.value = code;
      editUrl.value = url;
      editName.value = '';*/
    });
    
    deletePaisModal.addEventListener('hidden.bs.modal', function (event) {
        infoDelete.innerHTML ='';
        deleteCode.value = '';
        deleteUrl.value = '';
        deleteName.value = '';
    });



    function llamadaAjax(data) {
        fetch(url + '/pais', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrf
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
              console.log(data);
            /*for (var prop in data) {
              console.log(prop);
              console.log(data[prop]);
            }*/
            if(data.result > 0) {
                var modalElem = document.querySelector('#createPaisModal');
                var modalInstance = bootstrap.Modal.getInstance(modalElem);
                modalInstance.hide();
                var okAlert = document.getElementById('okAlert');
                okAlert.className = 'alert alert-success';
                solucionAriel(data, false);
            } else {
                var errorAlert = document.getElementById('errorAlert');
                errorAlert.className = 'alert alert-danger';
            }
        })
        .catch(error => {
            console.log("Error:", error);
          }
        );
    }

    function peticionEditPais() {
        let data = {
              code: editCode.value,
              name: editName.value,
        };
        fetch(editUrl.value, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrf
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if(data.result > 0) {
                var modalElem = document.querySelector('#editPaisModal');
                var modalInstance = bootstrap.Modal.getInstance(modalElem);
                modalInstance.hide();
                solucionAriel(data, false);
            }
        })
        .catch(error => console.error("Error:", error));
    };
    
     function peticionDeletePais() {
        let data = {
              code: deleteCode.value,
              name: deleteName.value,
        };
        fetch(deleteUrl.value, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrf
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.result > 0) {
                var modalElem = document.querySelector('#deletePaisModal');
                var modalInstance = bootstrap.Modal.getInstance(modalElem);
                modalInstance.hide();
                solucionAriel(data, false);
            }
        })
        .catch(error => console.error("Error:", error));
    };

    function peticionPais(data) {
        fetch(data.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(ajaxData => {
            //console.log(ajaxData);
            editCode.value = data.code;
            editCode.value = ajaxData.pais.code;
            editUrl.value = data.url;
            editName.value = ajaxData.pais.name;
        })
        .catch(error => console.error("Error:", error));
    } 
    
    function peticionDatosDeletePais(data) {
        fetch(data.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(ajaxData => {
            console.log(ajaxData);
            deleteCode.value = data.code;
            deleteCode.value = ajaxData.pais.code;
            deleteUrl.value = data.url;
            deleteName.value = ajaxData.pais.name;
            infoDelete.innerHTML ='¿Estás seguro de que quieres eliminar el País "' + deleteName.value + '" con codigo "' + deleteCode.value + '"?';
        })
        .catch(error => console.error("Error:", error));
    } 

    function peticionPaises() {
        fetch(url + '/pais')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            //console.log(da                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ta.paises.length);
            solucionAriel(data, true);
            //recorrePaises(data.paises);
        })
        .catch(error => console.error("Error:", error));
    }

    function recorrePaises(paises) {
      //const contentDiv = document.querySelector('.content');
      const contentDiv = document.getElementById("content");

      paises.forEach(pais => {
          let divPais = document.createElement('div');
          divPais.className = 'd-flex justify-content-between mb-2 align-items-center';
  
          let countryDetails = document.createElement('div');
          countryDetails.className = 'd-flex flex-column';
          countryDetails.textContent = '${pais.name} (${pais.code})';
  
          let linkView = document.createElement('a');
          linkView.href = '#';
          linkView.className = 'btn btn-primary btn-view me-1 px-3';
          linkView.textContent = 'View';
  
          let linkEdit = document.createElement('a');
          linkEdit.href = '#';
          linkEdit.className = 'btn btn-warning btn-edit me-1 px-3';
          linkEdit.textContent = 'Edit';
  
          let linkDelete = document.createElement('a');
          linkDelete.href = '#';
          linkDelete.className = 'btn btn-danger btn-delete px-3';
          linkDelete.textContent = 'Delete';
  
          divPais.appendChild(countryDetails);
          let btnWrapper = document.createElement('div');
          btnWrapper.className = 'd-flex';
          btnWrapper.appendChild(linkView);
          btnWrapper.appendChild(linkEdit);
          btnWrapper.appendChild(linkDelete);
          divPais.appendChild(btnWrapper);
  
          contentDiv.appendChild(divPais);
      });
    }

    function solucionAriel(data, condicion) {
        let contentDiv = document.getElementById("content");
        contentDiv.innerHTML = '';
        contentDiv.classList.add('table-responsive');
        contentDiv.classList.add('small');
        
        let addBtn = document.createElement("a");
        addBtn.className = "btn btn-success mt-2 mb-3";
        addBtn.setAttribute('data-bs-toggle', 'modal');
        addBtn.setAttribute('data-bs-target', '#createPaisModal');
        addBtn.innerHTML = "Add pais";
        contentDiv.appendChild(addBtn);
        
        let addBtn2 = document.createElement("a");
        addBtn2.className = "btn btn-info mt-2 mb-3 ms-2";
        addBtn2.innerHTML = "Refresh (don't do it this way, never)";
        contentDiv.appendChild(addBtn2);
        addBtn2.onclick = function() {
            peticionPaises();
        };
        
        let clase = '';
        if(condicion) {
            clase = 'visually-hidden';
        } 
        let divSuccessAlert = document.createElement('div');
        divSuccessAlert.setAttribute('id', 'okAlert');
        divSuccessAlert.className = 'alert alert-success ' + clase;
        divSuccessAlert.setAttribute('role', 'alert');
        divSuccessAlert.innerHTML = 'La operación se realizó correctamente.';
        contentDiv.appendChild(divSuccessAlert);
        
        
        
  
        // Creamos la tabla
        let table = document.createElement("table");
        table.classList.add('table');
        table.classList.add('table-striped');
        table.classList.add('table-sm');
        
        // Creamos la cabecera de la tabla
        let head = document.createElement("thead");
        let thtr = document.createElement("tr");
        
        let tcode = document.createElement("th");
        tcode.setAttribute("scope", "col");
        tcode.innerHTML = 'Code';
        thtr.appendChild(tcode);
        
        let tname = document.createElement("th");
        tname.setAttribute("scope", "col");
        tname.innerHTML = 'Name';
        thtr.appendChild(tname);
        
        let tactions = document.createElement("th");
        tactions.setAttribute("scope", "col");
        tactions.innerHTML = "Actions";
        thtr.appendChild(tactions);
        
        // AÃ±adimos la fila a la cabecera
        head.appendChild(thtr);
        
        // AÃ±adimos la cabecera a la tabla
        table.appendChild(head);
        
        // Creamos el cuerpo de la tabla
        let body = document.createElement("tbody");
        
        // Hacemos bucle para recorrer data
        for(const pais of data.paises) {
            let row = document.createElement('tr');
            let code = document.createElement('td');
            let name = document.createElement('td');
            let actions = document.createElement('td');
            
            code.innerHTML = pais.code;
            name.innerHTML = pais.name;
            
            let showBtn = document.createElement('a');
            let editBtn = document.createElement('a');
            let deleteBtn = document.createElement('a');
            
            showBtn.classList.add('btn');
            showBtn.classList.add('btn-primary');
            showBtn.style.marginRight = '1rem';
            showBtn.setAttribute('data-code', pais.code);
            showBtn.setAttribute('data-name', pais.name);
            showBtn.onclick = (e) => {
              alert('País ' + e.target.dataset.name + ' con codigo ' + e.target.dataset.code);
            }
    
            editBtn.classList.add('btn');
            editBtn.classList.add('btn-warning');
            editBtn.style.marginRight = '1rem';
            editBtn.setAttribute('data-bs-toggle', 'modal');
            editBtn.setAttribute('data-bs-target', '#editPaisModal');
            editBtn.setAttribute('data-code', pais.code);
            editBtn.setAttribute('data-url', url + '/pais/' + pais.code);
            
            deleteBtn.classList.add('btn');
            deleteBtn.classList.add('btn-danger');
            deleteBtn.style.marginRight = '1rem';
            deleteBtn.setAttribute('data-bs-toggle', 'modal');
            deleteBtn.setAttribute('data-bs-target', '#deletePaisModal');
            deleteBtn.setAttribute('data-code', pais.code);
            deleteBtn.setAttribute('data-url', url + '/pais/' + pais.code);
            

        

            
            showBtn.innerHTML = 'View';
            editBtn.innerHTML = 'Edit';
            deleteBtn.innerHTML = 'Delete';
            
            actions.appendChild(showBtn);
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            
            row.appendChild(code);
            row.appendChild(name);
            row.appendChild(actions);
            body.appendChild(row);
        }
        table.appendChild(body);
        contentDiv.appendChild(table);
    }

})()