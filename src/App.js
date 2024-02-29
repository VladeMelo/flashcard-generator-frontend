import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [showTextForm, setShowTextForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [text, setText] = useState('');
  const [quantity, setQuantity] = useState(1); // Estado para gerenciar a quantidade
  const [data, setData] = useState([])

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('https://flashcard-generator-backend.onrender.com/text', {
        quantity: quantity,
        text: text,
      });

      setData(result.data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('quantity', quantity);

    try {
      const result = await axios.post('https://flashcard-generator-backend.onrender.com/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setData(result.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={() => {setShowTextForm(true); setShowImageForm(false);}}>Texto</button>
      <button onClick={() => {setShowImageForm(true); setShowTextForm(false);}}>Imagem</button>

      {showTextForm && (
        <form onSubmit={handleTextSubmit}>
          <input
            type="number"
            min="1"
            max="5"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      )}

      {showImageForm && (
        <div>
          <input
            type="number"
            min="1"
            max="5"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      )}

      <h1>{data}</h1>
    </div>
  );
}

export default App;