const usuarios = [];

class UsuarioRepository {
  criar(usuario) {
    usuario.id = usuarios.length + 1;
    usuarios.push(usuario);
    return usuario;
  }

  buscarPorEmail(email) {
    return usuarios.find(u => u.email === email);
  }
}

export default new UsuarioRepository();
