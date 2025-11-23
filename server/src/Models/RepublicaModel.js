import mysql from 'mysql2/promise'
import db from '../conexao.js'
import path from 'path';
import fs from 'fs';


export async function createprojeto(projeto, imageFile) {
    console.log(imageFile);
    if (!projeto.id_usuario) {
        throw new Error("ID do usuário é obrigatório.");
    }

    const conexao = mysql.createPool(db);

    const featureMapping = {
        futebol: "Futebol",
        tenis: "Tênis",
        basquete: "Basquete",
        volei: "Võlei",
        pingpong: "Ping Pong",
        ciclismo: "Ciclismo",
    };

    const features = Object.fromEntries(
        Object.keys(featureMapping).map((key) => [
            key,
            projeto.Features?.includes(featureMapping[key]) ? true : false,
        ])
    );

    if (!imageFile) {
        throw new Error("É necessário fornecer uma imagem.");
    }

    // Salvando a imagem no servidor
    const publicFolder = path.join(process.cwd(), "public", "img");
    if (!fs.existsSync(publicFolder)) {
        fs.mkdirSync(publicFolder, { recursive: true });
    }

    const imagePath = `/img/${imageFile}`; 
    // retirei o date now
    const fullPath = path.join(publicFolder, imagePath);
    console.log(imagePath);
    console.log(fullPath);

    // try {
    //     // Salva o arquivo no caminho definido
    //     await imageFile.mv(fullPath);
    // } catch (error) {
    //     throw new Error(`Erro ao salvar a imagem: ${error.message}`);
    // }

    // const acomodacaoMapping = {
    //     Casa: "Casa",
    //     Apartamento: "Apartamento",
    // };

    // const tipoAcomodacao = acomodacaoMapping[projeto.name];
    // if (!tipoAcomodacao) {
    //     throw new Error("O campo 'name' deve ser 'Casa' ou 'Apartamento'.");
    // }

    const campos = {
        titulo: projeto.titulo,
        id_usuario: projeto.id_usuario,
        pais: projeto.pais,
        cep: projeto.cep,
        endereco: projeto.endereco,
        bairro: projeto.bairro,
        cidade: projeto.cidade,
        estado: projeto.estado,
        qtd_participantes: projeto.qtd_participantes || 0,
        descricao: projeto.descricao || "",
        caminhofoto: imageFile,
        ...features,
    };

    const colunas = Object.keys(campos).join(", ");
    const valores = Object.values(campos);
    const placeholders = valores.map(() => "?").join(", ");

    const sql = `INSERT INTO projetos (${colunas}) VALUES (${placeholders})`;

    try {
        const [resultado] = await conexao.query(sql, valores);
        const idprojeto = resultado.insertId;

        if (!idprojeto) {
            throw new Error("Falha ao gerar o ID da república.");
        }

        const imageSql = `INSERT INTO foto_projeto (caminho_foto, id_projeto) VALUES (?, ?)`;
        const imageValues = [imagePath, idprojeto];

        const [resultadoImagem] = await conexao.query(imageSql, imageValues);

        if (!resultadoImagem.affectedRows) {
            throw new Error("A imagem não foi inserida na tabela foto_projeto.");
        }

        return [201, "República cadastrada com sucesso!"];
    } catch (error) {
        return [500, error.message];
    }
}



export async function showprojetos(projeto) {
    const conexao = mysql.createPool(db);

    // Ajustar o SQL para ordenar os resultados em ordem decrescente
    const sql = `SELECT * FROM projetos ORDER BY id_projeto DESC`;

    const params = [
        projeto.titulo,
        projeto.qtd_participantes,
        projeto.descricao,
        projeto.futebol,
        projeto.tenis,
        projeto.basquete,
        projeto.volei,
        projeto.pingpong,
        projeto.ciclismo,
        projeto.id_usuario
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Mostrando projetos em ordem decrescente');
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [502, error];
    }
}


export async function updateprojeto(projeto, id) {
    const conexao = mysql.createPool(db);
    console.log('Atualizando usuário');

    const sql = `UPDATE projetos SET
        titulo = ?,
        qtd_participantes = ?,
        descricao = ?,
        futebol = ?,
        tenis = ?,
        basquete = ?,
        volei = ?,
        pingpong = ?,
        ciclismo = ?,
    WHERE id_projeto = ?
    `
    const params = [
        projeto.titulo,
        projeto.qtd_participantes,
        projeto.descricao,
        projeto.futebol,
        projeto.tenis,
        projeto.basquete,
        projeto.volei,
        projeto.pingpong,
        projeto.ciclismo,
        projeto.id_usuario,
        id
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Atualizando república');
        return [200, retorno]
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function deleteprojeto(id) {
    const conexao = mysql.createPool(db);
    console.log('Deletando usuário');
    const sql = `DELETE FROM projetos WHERE id_projeto = ?`;

    const params = [id];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Deletando usuário');
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function showOneprojeto(id_projeto) {
    console.log('UsuarioModel :: showOneUsuario');
    const conexao = mysql.createPool(db);
    const sql = 'SELECT * FROM projetos WHERE id_projeto = ?';
    const params = [id_projeto];
    try {
        const [retorno] = await conexao.query(sql, params);
        if (retorno.length < 1) {
            return [404, { message: 'Não foi possivel localizar a república' }];
        } else {
            return [200, retorno[0]];
        }
    } catch (error) {
        console.log(error);
        return [500, { message: 'Erro ao exibir a república' }];
    }
}

export async function getprojetoWithFotos(idprojeto) {
    const conexao = mysql.createPool(db);

    try {
        // Obter informações da república
        const [projetoRows] = await conexao.query(
            `SELECT * FROM projetos WHERE id_projeto = ?`,
            [idprojeto]
        );

        if (projetoRows.length === 0) {
            throw new Error('República não encontrada.');
        }

        const projeto = projetoRows[0];

        // Obter as fotos relacionadas
        const [fotosRows] = await conexao.query(
            `SELECT caminho_foto FROM foto_projeto WHERE id_projeto = ? LIMIT 4`,
            [idprojeto]
        );

        projeto.fotos = fotosRows.map((row) => row.caminho_foto);

        return projeto;
    } catch (error) {
        console.error('Erro ao buscar república e fotos:', error);
        throw error;
    }
}


