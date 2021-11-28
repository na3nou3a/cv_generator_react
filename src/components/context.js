import React, { useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [previewMode, setPreviewMode] = useState(false);
  const editCv = () => {
    return setPreviewMode(false);
  };
  const previewCv = () => {
    return setPreviewMode(true);
  };

  return (
    <AppContext.Provider
      value={{
        previewMode,
        editCv,
        previewCv,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
