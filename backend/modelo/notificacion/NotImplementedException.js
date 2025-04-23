class NotImplementedError extends Error {
    constructor(message = "Esta funcionalidad no está implementada.") {
      super(message);
      this.name = "NotImplementedError";
    }
  }