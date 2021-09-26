class FirebaseUtils {
  cosntructor() {}

  static handleErrorCode(code) {
    // No hace falta break ya que se topa con return directamente
    // 'code' proviene del trycatch error.code en login/register y algun otro
    switch (code) {
      case "auth/email-already-in-use":
        return "Este email ya fue registrado por otro usuario";
      case "auth/wrong-password":
        return "Contraseña Invalida, Intente nuevamente";
      case "auth/user-not-found":
        return "Email no encontrado, Intente nuevamente";
      case "auth/invalid-email":
        return "Email Invalido, Intente nuevamente";
      case "auth/weak-password":
        return "La contraseña necesita tener minimo 6 caracteres";
      case "auth/too-many-requests":
        return "Espere un momento para volver a intentarlo";
      default:
        return "Error Desconocido";
    }
  }
}

export default FirebaseUtils;
