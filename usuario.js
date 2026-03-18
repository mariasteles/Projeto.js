const express = require("express");
const router = express.Router();

let usuarios = [];
let proximoId = 1;

// Criar usuário
function criarUsuario(req, res) {
    const { nome, idade, email } = req.body;

    if (!nome || nome.trim().length < 3) {
        return res.status(400).json({ erro: "Nome deve ter pelo menos 3 caracteres" });
    }
    if (idade === undefined || idade < 0 || idade > 120) {
        return res.status(400).json({ erro: "Idade inválida" });
    }
    if (!email || email.trim() === "" || !email.includes("@")) {
        return res.status(400).json({ erro: "Email inválido" });
    }

    usuarios.push(novoUsuario);

    res.status(201).json({ mensagem: "Usuário criado com sucesso", usuario: novoUsuario });
}

// Buscar usuário por ID
function buscarUsuario(req, res) {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

    res.json(usuario);
}

// Atualizar usuário
function atualizarUsuario(req, res) {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

    const { nome, idade, email } = req.body;

    if (nome && nome.trim().length < 3) {
        return res.status(400).json({ erro: "Nome deve ter pelo menos 3 caracteres" });
    }
    if (idade !== undefined && (idade < 0 || idade > 120)) {
        return res.status(400).json({ erro: "Idade inválida" });
    }
    if (email && (email.trim() === "" || !email.includes("@"))) {
        return res.status(400).json({ erro: "Email inválido" });
    }

    usuario.nome = nome ?? usuario.nome;
    usuario.idade = idade ?? usuario.idade;
    usuario.email = email ?? usuario.email;

    res.json({ mensagem: "Usuário atualizado com sucesso", usuario });
}

// Deletar usuário
function deletarUsuario(req, res) {
    const id = Number(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).json({ erro: "Usuário não encontrado" });

    usuarios.splice(index, 1);
    res.status(204).send();
}

// Rotas
router.get("/", (req, res) => res.json(usuarios));
router.get("/:id", buscarUsuario);
router.post("/", criarUsuario);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);

module.exports = router;