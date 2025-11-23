import React, { createContext, useContext, useState } from "react";

const ObjetoContext = createContext();

export const ObjetoProvider = ({ children }) => {
  const [objetoProjeto, setObjetoProjeto] = useState({});

  return (
    <ObjetoContext.Provider value={{ objetoProjeto, setObjetoProjeto }}>
      {children}
    </ObjetoContext.Provider>
  );
};

export const useObjeto = () => useContext(ObjetoContext);
