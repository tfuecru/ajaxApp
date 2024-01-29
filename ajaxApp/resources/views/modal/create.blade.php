
<div class="modal" id="createPaisModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Crear país</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="text" id="code" maxlength="3" placeholder="Código del país">
        <input type="text" id="name" maxlength="100" placeholder="Nombre del país">
        <div class="alert alert-danger visually-hidden" role="alert" id="errorAlert">
          Error al insertar el pais...
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" id="btCrearPais" class="btn btn-primary">Crear país</button>
      </div>
    </div>
  </div>
</div>