class FirebaseUtils {
  constructor() {}

  static handleErrorCode(code) {
    const errorCodes = {
      "auth/email-already-in-use":
        "Este email ya fue registrado por otro usuario",
      "auth/wrong-password": "Contraseña Invalida, Intente nuevamente",
      "auth/user-not-found": "Email no encontrado, Intente nuevamente",
      "auth/invalid-email": "Email Invalido, Intente nuevamente",
      "auth/weak-password": "La contraseña necesita tener minimo 6 caracteres",
      "auth/too-many-requests": "Espere un momento para volver a intentarlo",
    };

    // No hace falta break ya que se topa con return directamente
    // 'code' proviene del trycatch error.code en login/register y algun otro
    return errorCodes[code] || "Error Desconocido";
  }
}

export default FirebaseUtils;
