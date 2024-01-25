import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [docs, setDocs] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState({});

  const selectDocument = (content) => {
    setSelectedDocument(content);
  };

  const selectDocuments = (docos) => {
    setDocs(docs => [...docs, ...docos]);
    console.log(docs)
  }

  const removeDocument = (id) => {

    setDocs(docs => docs.filter(doc => doc.id !== id));
    setSelectedDocument(selectedDocument => {})
    console.log(selectedDocument)
  };

  return (
    <AppContext.Provider value={{ docs, selectDocuments, selectedDocument, selectDocument, removeDocument }}>
      {children}
    </AppContext.Provider>
  );
};
