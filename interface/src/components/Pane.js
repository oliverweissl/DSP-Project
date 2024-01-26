import React, { useRef, useState } from 'react';
import './Pane.css'
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from './AppContext';




const Pane = ({ onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('dpcl');
  const [csvFile, setCsvFile] = useState(null);
  const [manualText, setManualText] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const formRef = useRef();
  const {selectDocuments} = useContext(AppContext);

  const documents = [
    // Replace with your actual documents
    { id: 1, title: 'Document 1', content: 'This is a small text snippet.. sdl;fm k;amfkad mdkfmak mf fmakmf alkdmf lkamflka dmflkam lkfmalkfm alkmfkal mflkamflk mafkl a.' },
    { id: 2, title: 'Document 2', content: 'This is a small text snippet...' },
    // ...add more documents as needed
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCsvFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setCsvFile(file);
    setManualText('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!csvFile && !manualText) {
      // Show an alert if both fields are empty
      alert('Please provide a CSV file or manually enter text.');
      return;
  }

  if (csvFile) {
    try {
      const formData = new FormData();
      formData.append('csvFile', csvFile);
      formData.append('method', selectedOption);
      let response;
      response = await axios.post('http://localhost:3001/api/submit-file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        console.log(response.data)
        selectDocuments(response.data)
        setSelectedOption('dpcl');
        setCsvFile(null);
        setManualText('');
        setFileInputKey(Date.now());
      }
      catch{
        alert("Something went wrong...")
      }
      
    }

  else if (manualText) {
    try {
    let response;
    response = await axios.post('http://localhost:5000/process', {
      manualText: manualText,
      method: selectedOption,
    })
    selectDocuments(response.data)
    //console.log(response.data)
    setSelectedOption('dpcl');
    setCsvFile(null);
    setManualText('');
    setFileInputKey(Date.now());
    console.log(response.data)
  }
  catch {
    alert("Something went wrong...")
  }


  }
};

  return (
    <div className='output-content'>
    <form onSubmit={handleSubmit} ref={formRef} className="pane-form">

      <h2>Enter the Documents Manually</h2>
        <textarea
          rows={100}
          value={manualText}
          onChange={(e) => {setManualText(e.target.value)}}
          disabled={!!csvFile} // Disable textarea if CSV file is selected
        />
        
      <h2>Upload a CSV file</h2>
      <input type="file" accept=".csv" onChange={handleCsvFileChange} key={fileInputKey} style={{'background-color' : '#e7e6e1'}}/>

      <h2>Choose the Norm Language</h2>
      <div>
        <label>
          <input
            type="radio"
            value="dpcl"
            checked={selectedOption === 'dpcl'}
            onChange={handleOptionChange}
          />
          DPCL
        </label>
        <label>
          <input
            type="radio"
            value="eflint"
            checked={selectedOption === 'eflint'}
            onChange={handleOptionChange}
          />
          eFlint
        </label>
      </div>
      <div className="button-container">
      <button type="submit" className="submit-button">Submit</button>
      </div>
    </form>
    </div>
  );
};

export default Pane;