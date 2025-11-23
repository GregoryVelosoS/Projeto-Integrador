import React, { useState, useEffect } from "react";
import AccommodationSelector from "../components/Etapa1/AccommodationSelector";
import RoomDistribution from "../components/Etapa1/RoomDistribution";
import EssentialInfo from "../components/Etapa1/EssentialInfo";
import HighlightFeatures from "../components/Etapa2/HighlightFeatures";
import PropertyAd from "../components/Etapa3/PropertyAd";
import DefinirEndereco from "../components/Etapa4/DefinirEndereco";
import Navbar from "../../../components/Navbar";
import { Button } from "react-bootstrap";
import { useObjeto } from "../components/ObjectContext";
import { useNavigate } from "react-router-dom";

const FormRepublica = () => {
  const [essentialInfo, setEssentialInfo] = useState({
      Participantes: 0,
  });

  const [features, setFeatures] = useState([]);
  const { objetoProjeto, setObjetoProjeto } = useObjeto();
  const navigate = useNavigate();

  useEffect(() => {
    const idUsuario = localStorage.getItem("id_usuario");
    if (!idUsuario) {
      alert("Efetue Login");
      navigate("/login");
    } else {
      setObjetoProjeto((prev) => ({
        ...prev,
        id_usuario: idUsuario,
      }));
    }
  }, []);

  const toggleFeature = (feature) => {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  useEffect(() => {
    setObjetoProjeto((prev) => ({
      ...prev,
      Features: features,
    }));
  }, [features]);

  const validarDados = (dados) => {
    console.log(objetoProjeto);
    
    const camposObrigatorios = ["pais", "cep", "endereco", "bairro", "cidade", "estado"];
    for (let campo of camposObrigatorios) {
      if (!dados[campo] || dados[campo].trim() === "") {
        alert(`O campo ${campo} é obrigatório.`);
        return false;
      }
    }
    return true;
  };

  const cadastrarRepublica = async (infoRepublica) => {
    
    const essentialInfoFormatted = {
      ...essentialInfo,
      Participantes: parseInt(essentialInfo.Participantes, 10) || 0,
    };

    const objetoProjetoFinal = {
      ...objetoProjeto,
      EssentialInfo: essentialInfoFormatted,
    };

    const formData = new FormData();
    formData.append("infoprojeto", JSON.stringify(objetoProjetoFinal));

    if (objetoProjeto?.image) {
      formData.append("image", objetoProjeto.image);
    }

    if (!validarDados(objetoProjetoFinal)) {
      alert("Dados inválidos. Verifique as informações fornecidas.");
      return;
    }
    console.log("Aqui",objetoProjetoFinal);
    console.log("Alo",formData);


    try {
      const resposta = await fetch(`http://localhost:5000/republicas`, {
        method: "POST",
        body: formData,
      });

      if (!resposta.ok) {
        console.log("Erro ao cadastrar a república");
        alert("Erro ao cadastrar. Tente novamente.");
      } else {
        console.log("República cadastrada com sucesso");
        alert("República cadastrada com sucesso!");
        setObjetoProjeto({
          Features: [],
          pais: "",
          cep: "",
          endereco: "",
          bairro: "",
          cidade: "",
          estado: "",
          id_usuario: null,
          imagem: null,
        });
        setEssentialInfo({
          Participantes: 0,
        });
      }
    } catch (error) {
      console.error("Erro ao cadastrar a república", error);
      // alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {/* <style>
          {`
              .section {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                margin-bottom: 20px;
                max-width: 800px;
                margin-left: auto;
                margin-right: auto;
              }

              .section h5, .section h2, .section p {
                text-align: left;
                margin: 0 0 10px 0;
              }
            `}
        </style> */}
        <div className="section mt-5">
          <h3>Adicione informações essenciais</h3>
          <EssentialInfo
            objetoProjeto={objetoProjeto}
            setObjetoProjeto={setObjetoProjeto}
            values={essentialInfo}
            onUpdate={(key, value) => setEssentialInfo({ ...essentialInfo, [key]: value })}
          />
        </div>

        <div className="section mt-5">
          <h5>Etapa 2</h5>
          <h3>Faça seu projeto se destacar</h3>
          <p>Selecione as modalidades do seu projeto:</p>
        </div>
        <HighlightFeatures
          objetoProjeto={objetoProjeto}
          setObjetoProjeto={setObjetoProjeto}
          onToggle={toggleFeature}
        />
        <div className="section mt-5">
          <h5>Etapa 3</h5>
          <h2 className="mb-4">Vamos preparar seu anúncio</h2>
          <p>Monte como seu anúncio vai aparecer para os interessados</p>
        </div>
        <PropertyAd
          objetoProjeto={objetoProjeto}
          setObjetoProjeto={setObjetoProjeto}
        />

        <div className="section mt-5">
          <h5>Etapa 5</h5>
          <h2>Defina seu endereço</h2>
          <p>Configure a localização do projeto para ser encontrado</p>
        </div>
        <DefinirEndereco
          objetoProjeto={objetoProjeto}
          setObjetoProjeto={setObjetoProjeto}
        />
      </div>
      <div className="section mt-5">
        <Button
          variant="warning"
          className="float-center w-100"
          onClick={() => cadastrarRepublica(objetoProjeto)}
        >
          Confirmar
        </Button>
      </div>
    </>
  );
};

export default FormRepublica;
