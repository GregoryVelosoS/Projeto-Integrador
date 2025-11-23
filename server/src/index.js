import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import {
    criarUsuario,
    logarUsuario,
    mostrarUsuario,
    atualizarUsuario,
    deletarUsuario,
    mostrarUmUsuario
} from './Controllers/UsuarioController.js';
import {
    criarPerfil,
    mostrarPerfil,
    atualizarPerfil,
    deletarPerfil,
    buscarPerfilPorUsuario
} from './Controllers/PerfilController.js';
//import { atualizarMusicaPerfil } from './Controllers/PerfilController.js';
import {
    criarprojeto,
    mostrarprojeto,
    atualizarprojeto,
    deletarprojeto,
    mostrarUmaprojeto,
    // fetchRepublica,
    downloadImagem
} from './Controllers/RepublicaController.js';
import {
    cadastrarImagens,
    listarRepublicas,
    detalhesRepublica,
    excluirImagem
} from './Controllers/ImagemController.js';
import { editarImagem } from './Controllers/ImagemPerfilController.js';



const app = express();
const porta = 5000;

// Middleware
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 MB
}));

// Rota inicial
app.get('/', (req, res) => {
    res.send('API Hive funcionando :)');
});

// Configuração de CORS
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // Para navegadores mais antigos
};
app.use(cors(corsOptions));

// Rotas para CRUD de usuários
app.post('/usuarios', criarUsuario);
app.get('/usuarios', mostrarUsuario);
app.put('/usuarios/:id', atualizarUsuario);
app.delete('/usuarios/:id', deletarUsuario);
app.get('/usuarios/:id', mostrarUmUsuario);

app.get('/public/:nomeImg',downloadImagem);

// Rota de login
app.post('/login', logarUsuario);

// Rotas para CRUD de perfis
app.post('/perfil', criarPerfil);
app.get('/perfil', mostrarPerfil);
app.put('/perfil/:id', atualizarPerfil);
app.get('/perfil/:id_usuario', buscarPerfilPorUsuario);
app.delete('/perfil/:id', deletarPerfil);

// Rotas para CRUD de repúblicas
app.post('/republicas', criarprojeto); // Cadastro de república com imagens
app.get('/republicas', mostrarprojeto);
app.put('/republicas/:id', atualizarprojeto);
app.delete('/republicas/:id', deletarprojeto);
app.get('/republicas/:id', mostrarUmaprojeto);

// Rotas para manipulação de imagens
app.post('/imagens', cadastrarImagens);
app.get('/imagens', listarRepublicas);
app.delete('/imagens/:id', excluirImagem);
app.get('/imagens/:id', detalhesRepublica);

app.put('/img_perfil/:id_perfil', editarImagem)

//app.put('/perfil/:id_usuario/music', atualizarMusicaPerfil);

// Fetch para fotos relacionadas a uma república
// app.get('/republicas/:id/fotos', fetchRepublica);

// Inicialização do servidor
app.listen(porta, () => {
    console.log(`API rodando na porta: ${porta}`);
});
