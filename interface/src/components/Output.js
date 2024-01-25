import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import axios from 'axios';
import './Output.css'

const Output = () => {
  const [documents, setDocuments] = useState([]);
  const [translation, setTranslation] = useState('');
  const { selectedDocument, removeDocument } = useContext(AppContext);
  




  const handleManualTranslationChange = (event) => {

    setTranslation(event.target.value);
  };

  const handleTranslationSubmit = () => {
    if (!translation || !selectedDocument) {
      alert('There is nothing to submit.');
      return;
  }
    const answer = window.confirm("Are you sure you want to submit this translation ?");
    if (answer){
      removeDocument(selectedDocument.id);
    // Make an API call to submit the translation
    axios.post('http://localhost:3001/api/submit-translation', {
      documentId: selectedDocument.id,
      translation: translation,
    })
      .then(response => {
        // Remove the document from the sidebar list
        setDocuments(documents.filter(doc => doc.id !== selectedDocument.id));
        setTranslation('');
        removeDocument(selectedDocument.id);
      })
      .catch(error => console.error('Error submitting translation:', error));


    }
  };

  return (
    <div className='output-content'>
      {/* Frame containing the original document */}
      <div className="frame">
        <h2>Original Document</h2>
        <textarea
            value={selectedDocument && selectedDocument.content}
            readOnly
            rows={20} // Adjust the number of rows as needed
            style={{ width: '100%', overflow: 'auto' }}
          />
      </div>

      {/* Frame containing the translation */}
      <div className="frame">
        <h2>Translation</h2>
        <textarea
            value={selectedDocument && selectedDocument.translation}
            readOnly
            rows={20} // Adjust the number of rows as needed
            style={{ width: '100%', overflow: 'auto' }}
          />
      </div>

      {/* Textarea for manual input translation */}
      <textarea
        value={translation}
        rows={20}
        onChange={handleManualTranslationChange}
        placeholder="Enter your translation here"
      />

      {/* Submit button */}
      
<div className="button-container">
      <button onClick={handleTranslationSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Output;

