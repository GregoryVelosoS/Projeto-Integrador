import mysql from 'mysql2/promise';
import db from '../conexao.js';
import path from 'path';
import fs from 'fs';

const conexao = mysql.createPool(db);

export async function createPerfil(perfil) {
    const sql = `
        INSERT INTO perfil (
            descricao, local_projeto,
            telefone, redes, bio, caminho_foto_perfil, id_usuario
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        perfil.descricao, perfil.local_projeto, perfil.telefone,
        perfil.redes, perfil.bio, perfil.caminho_foto_perfil, perfil.id_usuario // Incluído corretamente
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log(retorno);
        console.log('Perfil cadastrado');
        return [201, 'Perfil cadastrado'];
    } catch (error) {
        console.error('Erro ao criar o perfil:', error.message);
        return [500, error.message];
    }
}



export async function showPerfil() {
    // const conexao = mysql.createPool(db);
    const sql = `SELECT * FROM perfil`;

    try {
        const [retorno] = await conexao.query(sql);
        console.log('Perfis encontrados');
        return [200, retorno];
    } catch (error) {
        console.error('Erro ao buscar perfis:', error);
        return [502, error];
    }
}


export async function updatePerfil(perfil, imageFile, id) {
    console.log('Atualizando perfil...');

    if (!id) {
        throw new Error("ID do usuário é obrigatório.");
    }

    let imagePath = perfil.caminho_foto_perfil || null;

    if (imageFile) {
        const publicFolder = path.resolve('./public/img');

        // Garante que o diretório existe
        if (!fs.existsSync(publicFolder)) {
            fs.mkdirSync(publicFolder, { recursive: true });
        }

        // Usar o nome da imagem que já foi salvo no controller
        imagePath = perfil.caminho_foto_perfil;
    }

    const sql = `
        UPDATE perfil SET 
            descricao = ?,
            local_projeto = ?,
            telefone = ?,
            redes = ?,
            bio = ?,
            caminho_foto_perfil = ?
        WHERE id_usuario = ?
    `;

    const params = [
        perfil.descricao || '',
        perfil.local_projeto || '',
        perfil.telefone || '',
        perfil.redes || '',
        perfil.bio || '',
        imagePath,
        id
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Perfil atualizado com sucesso:', retorno);
        return [200, 'Perfil atualizado com sucesso'];
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        return [500, `Erro ao atualizar perfil: ${error.message}`];
    }
}


export async function deletePerfil(id) {
    // const conexao = mysql.createPool(db);
    console.log('Deletando perfil...');

    const sql = `DELETE FROM perfil WHERE id_perfil = ?`;

    try {
        const [retorno] = await conexao.query(sql, [id]);
        console.log('Perfil deletado com sucesso');
        return [200, 'Perfil deletado com sucesso'];
    } catch (error) {
        console.error('Erro ao deletar perfil:', error);
        return [500, error];
    }
}

export async function getPerfilByIdUsuario(id_usuario) {
    // const conexao = mysql.createPool(db);
    const sql = `SELECT * FROM perfil WHERE id_usuario = ?`;

    try {
        const [retorno] = await conexao.query(sql, [id_usuario]);
        if (retorno.length === 0) {
            console.log('Perfil não encontrado');
            return [404, 'Perfil não encontrado'];
        }
        console.log('Perfil encontrado');
        return [200, retorno[0]];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

