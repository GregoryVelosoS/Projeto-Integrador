create DATABASE UNISPORT;

USE UNISPORT;

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
  id_usuario int(11) NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL,
  senha varchar(200) NOT NULL,
  nome varchar(120) NOT NULL,
  sobrenome varchar(120) NOT NULL,
  data_nasc date NOT NULL,
  cpf varchar(45) NOT NULL,
  status varchar(20) DEFAULT 'ativo',
  PRIMARY KEY (id_usuario)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS perfil;
CREATE TABLE perfil (
  id_perfil int(11) NOT NULL AUTO_INCREMENT,
  descricao varchar(200) DEFAULT '"Editar"',
  local_projeto varchar(45) DEFAULT '"Editar"',
  telefone varchar(100) DEFAULT '"Editar"',
  redes varchar(45) DEFAULT '"Editar"',
  bio varchar(600) DEFAULT '"Editar"',
  id_usuario int(11) NOT NULL,
  caminho_foto_perfil varchar(200) DEFAULT NULL,
  PRIMARY KEY (id_perfil),
  KEY fk_perfil_usuarios1_idx (id_usuario),
  CONSTRAINT fk_perfil_usuarios1 FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- Se quiser recriar do zero (cuidado em produção)
DROP TABLE IF EXISTS foto_projeto;
DROP TABLE IF EXISTS projetos;

-- 1) Cria projetos sem a constraint para foto_projeto
CREATE TABLE projetos (
  id_projeto int(11) NOT NULL AUTO_INCREMENT,
  titulo varchar(100) NOT NULL,
  qtd_participantes int(11) NOT NULL,
  descricao varchar(400) NOT NULL,
  futebol tinyint(4) DEFAULT NULL,
  tenis tinyint(4) DEFAULT NULL,
  basquete tinyint(4) DEFAULT NULL,
  volei tinyint(4) DEFAULT NULL,
  pingpong tinyint(4) DEFAULT NULL,
  ciclismo tinyint(4) DEFAULT NULL,
  pais varchar(45) NOT NULL,
  cep varchar(45) NOT NULL,
  endereco varchar(200) NOT NULL,
  bairro varchar(100) NOT NULL,
  cidade varchar(45) NOT NULL,
  estado varchar(100) NOT NULL,
  caminhoFoto varchar(300) DEFAULT NULL,
  id_usuario int(11) NOT NULL,
  id_foto int(11) DEFAULT NULL,              -- mantemos o campo, sem FK por enquanto
  PRIMARY KEY (id_projeto),
  KEY fk_projetos_usuarios1_idx (id_usuario),
  KEY idx_projetos_id_foto (id_foto),
  CONSTRAINT fk_projetos_usuarios1 FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 2) Cria foto_projeto com FK para projetos (projetos já existe)
CREATE TABLE foto_projeto (
  id_foto int(11) NOT NULL AUTO_INCREMENT,
  caminho_foto varchar(200) NOT NULL,
  id_projeto int(11) NOT NULL,
  PRIMARY KEY (id_foto),
  KEY fk_foto_projeto_projetos1_idx (id_projeto),
  CONSTRAINT fk_foto_projeto_projetos1 FOREIGN KEY (id_projeto)
    REFERENCES projetos (id_projeto) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 3) Agora que ambas as tabelas existem, adicionamos a FK em projetos para foto_projeto
ALTER TABLE projetos
  ADD CONSTRAINT fk_foto_projeto FOREIGN KEY (id_foto)
    REFERENCES foto_projeto (id_foto)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

