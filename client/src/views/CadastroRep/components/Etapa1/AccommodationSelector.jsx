import React from "react";
import { useObjeto } from "../ObjectContext";

const AccommodationSelector = () => {
  const { objetoProjeto, setObjetoProjeto } = useObjeto();

  const options = [
    { name: "Casa", icon: <i className="bi bi-house-door feature-icon"></i> },
    { name: "Apartamento", icon: <i className="bi bi-building feature-icon"></i> },
  ];

  const alterarObjeto = (key, value) => {
    console.log(objetoProjeto);
    setObjetoProjeto((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      <style>
        {`
          .features-container {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin: 20px auto;
          }

          .feature-btn {
            padding: 20px 40px;
            text-align: center;
            background: #78EB78;
            color: #fff;
            border: 1px solid #78EB78;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            transition: background 0.3s, transform 0.2s;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }

          .feature-btn .feature-icon {
            font-size: 32px;
            color: #fff;
          }

          .feature-btn.active {
            background: #78EB78;
            color: #000;
            border-color: #78EB78;
          }

          .feature-btn.active .feature-icon {
            color: #000;
          }

          .feature-btn:hover {
            background: #78EB78;
            transform: scale(1.05);
          }

          .feature-text {
            font-size: 16px;
            font-weight: bold;
          }

          .message {
            text-align: center;
            margin-top: 20px;
            font-size: 18px;
            color: #555;
          }
        `}
      </style>
      <div>
        <div className="features-container">
          {options.map((option, index) => (
            <button
              key={index}
              className={`feature-btn ${
                objetoProjeto.name === option.name ? "active" : ""
              }`}
              onClick={() => {
                alterarObjeto("name", option.name);
              }}
            >
              {option.icon}
              <span className="feature-text">{option.name}</span>
            </button>
          ))}
        </div>
        <div className="message">
          {objetoProjeto.name
            ? `Você selecionou: ${objetoProjeto.name}`
            : "Nenhuma acomodação selecionada."}
        </div>
      </div>
    </>
  );
};

export default AccommodationSelector;
