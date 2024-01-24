import React, { useState } from 'react';
import './Sidebar.css';
import { useContext } from 'react';
import { AppContext } from './AppContext';

function Sidebar({ onDocumentSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const { docs, selectDocs, selectDocument } = useContext(AppContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const documents = [
    // Replace with your actual documents
    { id: 1, title: 'Document 1', content: 'This is a small text snippet.. sdl;fm k;amfkad mdkfmak mf fmakmf alkdmf lkamflka dmflkam lkfmalkfm alkmfkal mflkamflk mafkl a.' },
    { id: 2, title: 'Document 2', content: 'This is a small text snippet...' },
    // ...add more documents as needed
  ];



  const handleDocumentClick = (content) => {
    //onDocumentSelect(content);
    selectDocument(content)
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={toggleSidebar} className="toggle-button">
        {isOpen ? '>' : '<'}
      </button>
      <div className="sidebar-content">
        <h3>Choose a Document</h3>
        {docs && docs.map(doc => (
          <div key={doc.id} className="document-rectangle" onClick={() => handleDocumentClick(doc)}>
            <p>{doc.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
