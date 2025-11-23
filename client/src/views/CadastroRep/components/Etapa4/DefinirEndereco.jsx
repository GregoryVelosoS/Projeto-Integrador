import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Configurando o ícone do marcador do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const DefinirEndereco = ({ objetoProjeto, setObjetoProjeto }) => {
  // Função para buscar informações do CEP
  useEffect(() => {
    const fetchEndereco = async () => {
      if (objetoProjeto.cep && objetoProjeto.cep.length === 8) {
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${objetoProjeto.cep}/json/`
          );
          if (!response.data.erro) {
            setObjetoProjeto({
              ...objetoProjeto,
              endereco: response.data.logradouro,
              bairro: response.data.bairro,
              cidade: response.data.localidade,
              estado: response.data.uf,
            });
          }
        } catch (error) {
          console.error("Erro ao buscar informações do CEP:", error);
        }
      }
    };

    fetchEndereco();
  }, [objetoProjeto.cep, setObjetoProjeto]);

  const [position, setPosition] = useState([0, 0]); // Posição inicial do mapa

  // Componente para capturar cliques no mapa
  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);

        // Busca endereço com base na coordenada
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          )
          .then((response) => {
            const { address } = response.data;
            setObjetoProjeto({
              ...objetoProjeto,
              endereco: address.road || "",
              bairro: address.suburb || "",
              cidade: address.city || address.town || address.village || "",
              estado: address.state || "",
              cep: address.postcode || "",
            });
          })
          .catch((error) => console.error("Erro ao buscar endereço:", error));
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <Container className="mt-4 centered-form">
      <Form>
        <Form.Group className="mb-3" controlId="formCountry">
          <Form.Label>País</Form.Label>
          <Form.Control
            type="text"
            placeholder="País"
            value={objetoProjeto.pais}
            onChange={(e) =>
              setObjetoProjeto({ ...objetoProjeto, pais: e.target.value })
            }
            required
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formCEP">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                placeholder="CEP"
                value={objetoProjeto.cep}
                onChange={(e) =>
                  setObjetoProjeto({ ...objetoProjeto, cep: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formEndereco">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Endereço"
                value={objetoProjeto.endereco}
                onChange={(e) =>
                  setObjetoProjeto({
                    ...objetoProjeto,
                    endereco: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBairro">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bairro"
                value={objetoProjeto.bairro}
                onChange={(e) =>
                  setObjetoProjeto({ ...objetoProjeto, bairro: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formCidade">
              <Form.Label>Cidade/Município</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cidade/Município"
                value={objetoProjeto.cidade}
                onChange={(e) =>
                  setObjetoProjeto({ ...objetoProjeto, cidade: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Estado"
                value={objetoProjeto.estado}
                onChange={(e) =>
                  setObjetoProjeto({ ...objetoProjeto, estado: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formApartamento">
              <Form.Label>Apartamento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apartamento"
                value={objetoProjeto.apto}
                onChange={(e) =>
                  setObjetoProjeto({ ...objetoProjeto, apto: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h5>Confirme pra gente</h5>
        <p>Utilize sua localização em tempo real para definir</p>
        <div
          className="map-container mb-3"
          style={{
            height: "300px",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ddd",
          }}
        >
          <MapContainer
            center={[-15.7942, -47.8822]} // Posição inicial (Brasília)
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </Form>
    </Container>
  );
};

export default DefinirEndereco;
