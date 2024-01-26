
import './App.css';
import Pane from './components/Pane';
import Output from './components/Output';
import React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import { AppProvider } from './components/AppContext';


function App() {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(!isSubmitted);
  };

  const [selectedDoc, setSelectedDoc] = useState("");

  const handleDocumentSelect = (docText) => {
    setSelectedDoc(docText);
    console.log(selectedDoc)
  };

  return (
    <AppProvider>
    <div className="app-container">
      <div className="components-container">
        <div className="pane-container">
          <Pane onSubmit={handleSubmit} />
        </div>
        <div className="output-container">
          <Output/>
        </div>
        <Sidebar onDocumentSelect={handleDocumentSelect}/>

        </div>
      </div>
      </AppProvider>


  );
}

export default App;
