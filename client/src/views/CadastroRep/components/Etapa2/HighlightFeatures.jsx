import React from "react";

const HighlightFeatures = ({ objetoProjeto, setObjetoProjeto, onToggle }) => {
  // Lista de itens organizados por seções
  const sections = [
    {
      title: "Modalidades",
      items: [
         { name: "Futebol", icon: <i className='fas fa-futbol' style={{fontSize:'24px'}}></i> },
         { name: "Tênis", icon: <i className='fas fa-baseball-ball'style={{fontSize:'24px'}}></i> },
         { name: "Basquete", icon: <i className='fas fa-basketball-ball' style={{fontSize:'24px'}}></i> },
         { name: "Vôlei", icon: <i className='fas fa-volleyball-ball'style={{fontSize:'24px'}}></i> },
         { name: "Ping Pong", icon: <i className='fas fa-table-tennis' style={{fontSize:'24px'}}></i> },
         { name: "Ciclismo", icon: <i className="bi bi-bicycle"></i> },
      ],
    },
  ];

  const handleToggle = (name) => {
    // Atualiza o objeto global com a alternância da feature
    setObjetoProjeto((prevObjeto) => {
      const updatedFeatures = prevObjeto.Features.includes(name)
        ? prevObjeto.Features.filter((feature) => feature !== name)
        : [...prevObjeto.Features, name];

      return {
        ...prevObjeto,
        Features: updatedFeatures,
      };
    });
  };

  return (
    <div>
      <style>
        {`
.section-container {
            margin-bottom: 40px;
          }

          .section-title {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
            color: #333;
          }

          .features-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
            max-width: 800px;
            margin: 0 auto;
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
            max-width: 800px;
            margin: 0 auto;
          }

          .feature-btn {
            flex: 0 1 calc(33.333% - 16px);
            flex: 0 1 calc(33.333% - 16px);
            max-width: calc(33.333% - 16px);
            padding: 20px;
            text-align: center;
            background: #78EB78;
            color: #fff;
            background: #78EB78;
            color: #fff;
            border: 1px solid #78EB78;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s, color 0.3s, transform 0.2s;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }

          .feature-btn.active {
            background: #78EB78;
            color: #000;
            border-color: #78EB78;
            background: #78EB78;
            color: #000;
            border-color: #78EB78;
          }

          .feature-btn:hover {
            background: #78EB78;
            color: #000;
            transform: scale(1.05);
            background: #78EB78;
            color: #000;
            transform: scale(1.05);
          }

          .feature-icon {
            font-size: 32px;
            font-size: 32px;
          }

          .feature-text {
            font-size: 16px;
            font-size: 16px;
            font-weight: bold;
          }
        `}
      </style>

      <div>
        {sections.map((section, index) => (
          <div key={index} className="section-container">
            {/* Título da seção */}
            <div className="section-title">{section.title}</div>

            {/* Botões da seção */}
            <div className="features-container">
              {section.items.map((item, idx) => (
                <button
                  key={idx}
                  className={`feature-btn ${objetoProjeto.Features && objetoProjeto.Features.includes(item.name) ? "active" : ""
                    }`}
                  onClick={() => handleToggle(item.name)}
                >
                  <span className="feature-icon">{item.icon}</span> {/* Emoji como ícone */}
                  <span className="feature-text">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighlightFeatures;
