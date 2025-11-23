import React, { useState, useEffect } from 'react';

const PropertyAd = ({ objetoProjeto = {}, setObjetoProjeto }) => {
  // Inicializa os estados com os valores de `objetoProjeto` ou valores padrão
  const [titulo, setTitulo] = useState(objetoProjeto.titulo || '');
  const [image, setImage] = useState(objetoProjeto.image || null);
  const [descricao, setDescricao] = useState(objetoProjeto.descricao || '');

  useEffect(() => {
    if (setObjetoProjeto) {
      setObjetoProjeto((prevObjeto) => ({
        ...prevObjeto,
        titulo,
        image,
        descricao,
      }));
    } else {
      console.error('setObjetoProjeto não está definido');
    }
  }, [titulo, image, descricao, setObjetoProjeto]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Obtém apenas o primeiro arquivo selecionado
    if (file) {
      setImage(file);
      setObjetoProjeto((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setObjetoProjeto((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const handleTitleChange = (e) => {
    setTitulo(e.target.value);
  };


  const handleDescriptionChange = (e) => {
    setDescricao(e.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="p-4 rounded shadow bg-warning"
        style={{ width: '100%', maxWidth: '800px' }}
      >
        {/* Área para adicionar uma foto */}
        <div className="mb-4">
          <h5>Adicione uma foto do seu espaço</h5>
          <div className="d-flex flex-column align-items-center">
            {image && (
              <div className="position-relative mb-3">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="rounded"
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="position-absolute top-0 end-0 bg-danger text-white rounded-circle border-0"
                  style={{
                    width: '30px',
                    height: '30px',
                    fontSize: '18px',
                    padding: '0',
                    cursor: 'pointer',
                  }}
                >
                  x
                </button>
              </div>
            )}
            {!image && (
              <label
                htmlFor="imageUpload"
                className="d-flex justify-content-center align-items-center bg-light border rounded"
                style={{
                  width: '200px',
                  height: '200px',
                  cursor: 'pointer',
                  border: '2px dashed #6c757d',
                }}
              >
                <span className="fs-3 text-muted">+</span>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>

        {/* Campo para nomear o anúncio */}
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            <h5>Nome do anúncio</h5>
          </label>
          <input
            id="title"
            type="text"
            name="name"
            className="form-control"
            placeholder="Ex: Casa"
            value={titulo}
            onChange={handleTitleChange}
          />
        </div>
        {/* Campo para descrição */}
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            <h5>Descrição</h5>
          </label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Descreva sua propriedade (detalhes sobre quartos, localização, facilidades, etc.)"
            value={descricao}
            onChange={handleDescriptionChange}
            rows="4"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default PropertyAd;