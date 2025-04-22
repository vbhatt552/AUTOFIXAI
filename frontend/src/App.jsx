import React from 'react';
import "prismjs/themes/prism-tomorrow.css"
//import "prismjs/components/prism-jsx"
import prism from 'prismjs';
import { useState,useEffect } from 'react';
  import './App.css';
  import Editor from "react-simple-code-editor"
import axios from 'axios'
 import Markdown from 'react-markdown'
 import '@fortawesome/fontawesome-free/css/all.min.css';

 function App() {
  const[code,setCode] = useState(`
`)
const[review,setReview] = useState(``)
  useEffect(()=>{
    prism.highlightAll();
  },[code]);
  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data);
    } catch (err) {
      console.error("Error fetching code review:", err);
      setReview("An error occurred while fetching the review.");
    }
  }
  const copy = (code) => {
    navigator.clipboard.writeText(code)
      .catch((err) => console.error("Copy failed: ", err));
  };
  
  return (
    <>
    <main>
      <div className='app-header'>
      <img src="/AutofixAIlogo.png" alt="AutoFixAI Logo" style={{ height: '100px', marginRight: '10px',marginBottom:'-34px' }} />
      <h4>AUTOFixAI</h4>
      <p>-your AI code debugger</p>
      </div>
      <div className="left">
        <div className="code">
          
        <Editor 
  value={code}
  onValueChange={code => setCode(code)}
  highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
  padding={10}
  className="code-editor"
  style={{
    fontFamily: '"Fira Code", monospace',
    fontSize: 12,
    height: '100%',
    width: '100%',
    borderRadius: '5px',
    overflow: 'auto'
  }}
/>
<button
        onClick={()=>copy(code)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        📋 Copy Code
      </button>
        </div>
        <div className="review">
          <button onClick={reviewCode} className="code-btn">Review</button>
        </div>
      </div>
      <div className="right" style={{fontSize:'14px'}}>
       <Markdown >{review}</Markdown> 
      </div>
    </main>
    <footer className="footer">
  <p>© 2025 Vipul Bhatt</p>
  <div className="social-icons">
    <a href="https://github.com/vbhatt552" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-github"></i>
    </a>
    <a href="https://linkedin.com/in/vipul-bhatt-507104250/" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-linkedin"></i>
    </a>
  </div>
</footer>


    </>
  );
}

export default App;