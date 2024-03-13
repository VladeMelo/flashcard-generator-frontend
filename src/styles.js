import styled, { keyframes } from 'styled-components'
import logo from './logo.jpg'; // Ajuste o caminho conforme necessário

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const sharedButtonAndInputStyles = `
  background-color: #333; /* Matching background */
  border: 2px solid #555; /* Stylish border */
  color: white;
  font-size: 1rem; /* Font size consistency */
  display: inline-flex; /* Use inline-flex for alignment */
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Align items vertically for button */
  box-shadow: 0 0 15px rgba(255, 105, 180, 0.5); /* Glow effect */
  border-radius: 12px; /* General border-radius */

  &:hover {
    border-color: #777; /* Lighten border on hover */
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 20px rgba(255, 105, 180, 0.9); /* Stronger glow on focus */
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height of the viewport */
  flex-direction: column;
  background-color: #121212; /* Dark background */
`

export const ButtonsContainer = styled.div`
  display: flex; /* Aligns buttons horizontally */
  gap: 36px; /* Increases space between buttons */
`;

export const Button = styled.button`
  ${sharedButtonAndInputStyles}
  width: 200px; /* Set width */
  height: 200px; /* Set height */
  margin-left: -2px; /* Align closely with inputs if next to them */
  cursor: pointer;
`;

export const StylishInput = styled.input`
  ${sharedButtonAndInputStyles}
  padding: 10px 20px; /* Adjust padding to match height */
  margin: 20px 0; /* Adjust as needed */
  width: auto; /* Adjust width to content */
`;

export const TextInput = styled.input`
  ${sharedButtonAndInputStyles}
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex-grow: 1; /* Ensure it fills available space */
  padding: 0 12px;
`;

export const FormContainer = styled.div`
  display: flex;
  gap: 0; /* Remove gap between elements */
`;

export const SubmitButton = styled.button`
  ${sharedButtonAndInputStyles}
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 10px 20px; /* Adjust padding to match height with input */
  cursor: pointer;
`;

export const HiddenFileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`;

export const FileInputLabel = styled.label`
  ${sharedButtonAndInputStyles} // Reutilizando estilos compartilhados
  padding: 10px 20px;
  cursor: pointer;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3); /* Cor mais clara para o círculo de "loading" */
  border-top: 4px solid #fff; /* Cor mais escura para a parte superior do círculo */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${rotate} 1.2s linear infinite;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
  font-size: 2rem;

  /* Adicionando o Spinner ao centro do Overlay */
  & > ${Spinner} {
    /* Ajustes adicionais ao Spinner, se necessário */
  }
`;

// export const FlashcardContainer = styled.div`
//   width: 200px; /* Largura da div */
//   height: 160px; /* Altura da div */
//   border-radius: 12px;
//   position: relative;
//   z-index: 0;
  
//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-image: url(${logo});
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//     opacity: 0.2; /* Ajuste o nível de opacidade conforme necessário */
//     z-index: -1;
//     border-radius: 12px;
//   }
// `

export const FlashcardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 180px;
  background: #fff;
  margin-top: 28px;
`

export const FlashcardContent = styled.div`
  padding: 0 8px;
`