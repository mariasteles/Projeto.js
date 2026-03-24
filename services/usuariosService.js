const pool = require("../database/db");

let usuarios = [];
let proximoId = 1;

function listarUsuarios() {
  return usuarios;
}

function buscarUsuarioPorId(id) {
  return usuarios.find((u) => u.id === id);
}

function criarUsuario(nome, idade) {
  if (!nome || nome.trim() === "") {
    throw new Error("Nome é obrigatório");
  }

  const novoUsuario = {
    id: proximoId++,
    nome,
    idade,
  };
  
  function criarUsuario(req, res) {
    const { nome, idade } = req.body;

    // Validação do nome
    if (!nome || nome.trim() === "") {
        return res.status(400).json({ erro: "Nome não pode ser vazio" });
    }

    if (nome.length < 3) {
        return res.status(400).json({ erro: "Nome deve ter no mínimo 3 caracteres" });
    }

    // Validação da idade
    if (idade < 0) {
        return res.status(400).json({ erro: "Idade não pode ser negativa" });
    }

    if (idade > 120) {
        return res.status(400).json({ erro: "Idade não pode ser maior que 120" });
    }

    // Se passou em todas as validações
    const usuario = {
        nome,
        idade
    };

    return res.status(201).json(usuario);
}

  usuarios.push(novoUsuario);

  return novoUsuario;
}

function atualizarUsuario(id, nome, idade) {
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return null;
  }

  usuario.nome = nome ?? usuario.nome;
  usuario.idade = idade ?? usuario.idade;

  return usuario;
}

function deletarUsuario(id) {
  const index = usuarios.findIndex((u) => u.id === id);

  if (index === -1) {
    return false;
  }

  usuarios.splice(index, 1);

  return true;
}

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
};