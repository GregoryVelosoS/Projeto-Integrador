import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Função para obter as repúblicas do backend
async function getRepublicas() {
  try {
    const response = await axios.get(`http://localhost:5000/republicas`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar repúblicas:", error);
    return [];
  }
}

function Home() {
  const [republicas, setRepublicas] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Inicializa com 6 repúblicas visíveis
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRepublicas();
      setRepublicas(data);
      setLoading(false); // Finaliza o carregamento
    };
    fetchData();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Mostra mais 3 repúblicas a cada clique
  };

  const handleNavigate = (id) => {
    if (id) {
      navigate(`/casas/${id}`);
    } else {
      console.error("ID da república está indefinido.");
      alert("Erro ao redirecionar: ID não encontrado.");
    }
  };

  return (
    <>
      <Navbar />
      <h2 className="text-center mb-4 mt-4">Encontrar pelas redondezas de:</h2>

      <div className="App">
        {/* Barra de busca */}
        <div className="container my-4">
          <div className="d-flex justify-content-center mb-4">
            <div className="input-group" style={{ maxWidth: '1000px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar local..."
                style={{ borderRadius: '25px 0 0 25px' }}
              />
              <button
                className="btn"
                style={{
                  backgroundColor: '#78EB78',
                  color: '#000',
                  border: '1px solid #78EB78',
                  borderRadius: '0 25px 25px 0',
                }}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="container">
            {loading ? (
              <div className="text-center mt-5">
                <h4>Carregando...</h4>
              </div>
            ) : republicas.length === 0 ? (
              <div className="text-center mt-5">
                <h4>Nenhum projeto encontrado.</h4>
              </div>
            ) : (
              <div className="row text-center">
                {republicas.slice(0, visibleCount).map((rep) => (
                  <div key={rep.id} className="col-md-4 col-sm-6 mb-4">
                    <div
                      className="republica-card"
                      style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        width: '80%',
                        height: '240px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 'auto',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleNavigate(`${rep.id_projeto}`)}
                    >
                      <img
                        src={`http://localhost:5000/public/${rep.caminhoFoto}`}
                        alt={rep.nome}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    <div className="mt-3">
                      <h6>
                        <a
                          href="#"
                          style={{ fontSize: '1rem', textDecoration: 'none', color: '#000' }}
                        >
                          {rep.nome}
                        </a>
                      </h6>
                      <p className="mb-0" style={{ fontSize: '0.9rem', color: '#555' }}>
                        {rep.bairro}
                      </p>
                      <p className="mb-0" style={{ fontSize: '0.9rem', color: '#777' }}>
                        {rep.estado}
                      </p>
                      <p className="fw-bold mt-1" style={{ color: '#000', fontSize: '1rem' }}>
                        R$ {rep.preco}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Botão Mostrar Mais */}
            {visibleCount < republicas.length && (
              <div className="text-center mt-4">
                <button className="btn custom-button" onClick={handleShowMore}>
                  Mostrar Mais
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Rodapé */}
        <footer className="text-center py-3 border-top" style={{ backgroundColor: '#78EB78' }}>
          <div className="container d-flex justify-content-between align-items-center">
            <div className="text-dark">
              © 2025 Unisport <a href="/privacidade" style={{ color: '#000' }}>Privacidade</a> ·
              <a href="/termos" style={{ color: '#000' }}>Termos</a> ·
              <a href="/detalhes" style={{ color: '#000' }}>Informações do site</a>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-globe me-2" style={{ color: '#000' }}></i> Português (BR)
              <i className="bi bi-currency-dollar mx-2" style={{ color: '#000' }}></i> BRL
              <a href="#" className="ms-2" style={{ color: '#000' }}><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </footer>

        <style>
          {`
            .custom-button {
              background-color: #78EB78;
              color: #000;
              border: 1px solid #78EB78;
              border-radius: 25px;
              padding: 10px 20px;
              font-size: 1rem;
              transition: background-color 0.3s ease;
            }

            .custom-button:hover {
              background-color: #56de56ff;
            }
          `}
        </style>
      </div>
    </>
  );
}

export default Home;
