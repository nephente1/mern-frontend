import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    backgroundColor: 'white', // Tło inputa białe
    // borderBottom: '2px solid orange', // Pomarańczowy border dolny o grubości 2px
  },
  '& .MuiFilledInput-root.Mui-focused': {
    borderBottom: '2px solid red', // Czerwony border dolny w stanie "focus"
  },
  '& .MuiInputLabel-root': {
    color: 'orange', // Pomarańczowy kolor labela
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'orange', // Pomarańczowy kolor labela, gdy input jest aktywny
  },
  '& .MuiFilledInput-input': {
    color: 'black', // Czarny kolor tekstu w środku inputa
  },
  '& .MuiFilledInput-root:after': {
    borderBottom: '2px solid red', // Czerwony border dolny na focus
  },
  '& .MuiFilledInput-root:hover': {
    borderBottom: '2px solid red', // Czerwony border dolny na focus
  },
}));

