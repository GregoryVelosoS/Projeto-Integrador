import React, { useState } from "react";
import { useObjeto } from "../ObjectContext";

const EssentialInfo = () => {
  const { objetoProjeto, setObjetoProjeto } = useObjeto();

  const MIN_VALUE = 0;
  const MAX_VALUE = 10;

  const [values, setValues] = useState({
    qtd_participantes: objetoProjeto.qtd_participantes || 1,
  });

  const fieldLabels = {
    qtd_participantes: "Participantes"
  };

  const onUpdate = (key, value) => {
    const numericValue = Math.max(MIN_VALUE, Math.min(MAX_VALUE, parseInt(value, 10) || 0));
    setValues((prevValues) => ({
      ...prevValues,
      [key]: numericValue,
    }));
    setObjetoProjeto((prevObjeto) => ({
      ...prevObjeto,
      [key]: numericValue,
    }));
  };

  return (
    <div>
      <style>
        {`
          .btn-yellow {
            background-color: #78EB78;
            color: #fff;
            border: 1px solid #78EB78;
            transition: background 0.3s, color 0.3s;
          }

          .btn-yellow:hover {
            background-color: #78EB78;
            border-color: #78EB78;
            color: #fff;
          }

          .btn-yellow:disabled {
            background-color: #78EB78;
            color: #000;
            border: 1px solid #78EB78;
          }

          .btn-yellow span {
            color: #000;
          }

          .item-container {
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 10px;
            background-color: #f9f9f9;
            width: 800px;
          }

          .componentes {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 30vh;
          }
        `}
      </style>
      <div className="componentes">
        {Object.keys(values).map((key, index) => (
          <div className="item-container" key={index}>
            <div className="d-flex align-items-center justify-content-between">
              <span>{fieldLabels[key]}</span>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-yellow me-2"
                  onClick={() => {
                    if (values[key] > MIN_VALUE) {
                      onUpdate(key, values[key] - 1);
                    }
                  }}
                  disabled={values[key] <= MIN_VALUE}
                >
                  <span>-</span>
                </button>
                <span>{values[key]}</span>
                <button
                  className="btn btn-yellow ms-2"
                  onClick={() => {
                    if (values[key] < MAX_VALUE) {
                      onUpdate(key, values[key] + 1);
                    }
                  }}
                  disabled={values[key] >= MAX_VALUE}
                >
                  <span>+</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EssentialInfo;