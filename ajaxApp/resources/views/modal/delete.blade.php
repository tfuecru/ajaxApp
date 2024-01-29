<div class="modal" id="deletePaisModal" tabindex="-1"> 
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Borrar País</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      </div>
        <form id="formDeleteV3" action="{{ url('/') }}" method="post">
            @csrf
            @method('delete')
            <p id="infoDelete"></p>
        <input class="form-control" type="hidden" id="deleteCode" maxlength="3" placeholder="Código del país">
        <input class="form-control" type="hidden" id="deleteName" maxlength="100" placeholder="Nombre del país">
        <input class="form-control" type="hidden" id="deleteUrl">
        </form>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" id="btBorrarPais" class="btn btn-primary">Borrar País</button>
      </div>
    </div>
  </div>
</div>

