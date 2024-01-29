<div class="modal" id="editPaisModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Editar país</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input class="form-control" type="text" id="editCode" maxlength="3" placeholder="Código del país">
        <input class="form-control" type="text" id="editName" maxlength="100" placeholder="Nombre del país">
        <input class="form-control" type="hidden" id="editUrl">
        <div class="alert alert-danger visually-hidden" role="alert" id="errorAlert">
          Error al editar el pais...
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" id="btEditarPais" class="btn btn-primary">Editar país</button>
      </div>
    </div>
  </div>
</div>