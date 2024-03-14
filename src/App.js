import React, { useState } from 'react';
import axios from 'axios';
import { Container, ButtonsContainer, Button, StylishInput, FormContainer, TextInput, SubmitButton, HiddenFileInput, FileInputLabel, LoadingOverlay, Spinner, FlashcardContainer, FlashcardColumn, FlashcardContent } from './styles'; // Ajuste o caminho do import conforme necessário

function App() {
  const [showTextForm, setShowTextForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [text, setText] = useState('');
  const [quantity, setQuantity] = useState(1); // Estado para gerenciar a quantidade
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadCSV = (csvData) => {
    // Supondo que csvData seja uma string em formato CSV
    // Se csvData não for uma string, você precisará convertê-la para CSV primeiro
  
    // Cria um Blob com os dados em formato CSV
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  
    // Cria uma URL para o Blob
    const url = URL.createObjectURL(blob);
  
    // Cria um elemento de link temporário
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Flashcards.csv'); // Define o nome do arquivo para download
  
    // Anexa o link ao corpo do documento
    document.body.appendChild(link);
  
    // Dispara o clique no link para iniciar o download
    link.click();
  
    // Limpa removendo o link do documento e revoga a URL do Blob
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o loading
  
    try {
      const result = await axios.post('https://flashcard-generator-backend.onrender.com/text', {
        quantity: quantity,
        text: text,
      });
      
      setData(result.data);
      handleDownloadCSV(result.data)
    } catch (error) {
      console.error(error);
      alert('Erro! Tente um novo texto relacionado à Medicina.')
    } finally {
      setIsLoading(false); // Desativa o loading
    }
  };

  const handleImageUpload = async (e) => {
    setIsLoading(true); // Ativa o loading
  
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
  
      setData(result.data);
      handleDownloadCSV(result.data)
    } catch (error) {
      console.error(error);
      alert('Erro! Tente uma nova imagem relacionada à Medicina.')
    } finally {
      setIsLoading(false); // Desativa o loading
    }
  };

  return (
    <Container>
      {isLoading && (
      <LoadingOverlay>
        <Spinner />
      </LoadingOverlay>
    )}

      <ButtonsContainer>
        <Button onClick={() => {setShowTextForm(true); setShowImageForm(false);setData(true)}}>Texto</Button>
        <Button onClick={() => {setShowImageForm(true); setShowTextForm(false);setData(true)}}>Imagem</Button>
      </ButtonsContainer>
      <StylishInput
        type="number"
        min="1"
        max="5"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        placeholder="Quantity"
      />
  
      {showTextForm && (
        <FormContainer as="form" onSubmit={handleTextSubmit}>
          <TextInput
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <SubmitButton type="submit">Enviar</SubmitButton>
        </FormContainer>
      )}
  
      {showImageForm && (
        <>
          <HiddenFileInput
            id="file"
            onChange={handleImageUpload}
            accept="image/*"
          />

          <FileInputLabel htmlFor="file">Escolher Arquivo</FileInputLabel>
        </>
      )}
    </Container>
  );
}

export default App;