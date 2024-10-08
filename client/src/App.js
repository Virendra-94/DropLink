import {useRef, useState, useEffect} from 'react'; 
import './App.css';
import {uploadFile} from './services/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const fileInputRef = useRef();

  const logo = 'https://cdni.iconscout.com/illustration/premium/thumb/cloud-uploading-illustration-download-in-svg-png-gif-file-formats--data-hosting-upload-web-pack-business-illustrations-3728472.png';

  // useEffect(() => {
  //   const getImage = async () => {
  //     if (file) {
  //       const data = new FormData();
  //       data.append("name", file.name);
  //       data.append("file", file);

  //       let response = await uploadFile(data);
  //       setResult(response.path);
  //     }
  //   };
  //   getImage();
  // }, [file]);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
  
        let response = await uploadFile(data);
  
        if (response && response.path) {
          setResult(response.path);
        } else {
          console.error('Upload failed or path not available');
        }
      }
    };
    getImage();
  }, [file]);
  
  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(result);
    setCopySuccess("Link copied to clipboard!");

    setTimeout(() => {
      setCopySuccess('');
    }, 3000); // Clear the message after 3 seconds
  };

  return (
    <>
      <div className='container'>
        <div className='left-section'>
          <img src={logo} alt='banner' />
        </div>
        <div className='right-section'>
          <div className='wrapper'>
            <h1>Simple File Sharing App!</h1>
            <p>Upload and share the download link.</p>

            <button onClick={onUploadClick}>Upload</button>
            <input 
              type="file"
              ref={fileInputRef}
              style={{display: 'none'}}
              onChange={(e) => setFile(e.target.files[0])}
            />

            {result && (
              <div className='result-section'>
                <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
                <button className='copy-btn' onClick={onCopyClick}>Copy</button>
              </div>
            )}

            {copySuccess && (
              <div className='copy-success'>
                {copySuccess}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='footer'>
        Developed by <a href="https://www.linkedin.com/in/virendra-kumar25/" target="_blank" rel="noopener noreferrer">Virendra</a>
      </div>
    </>
  );
}

export default App;


