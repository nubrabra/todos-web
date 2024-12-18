import { createTheme } from '@mui/material/styles';
import '@fontsource/kanit'; // Import Kanit font

const theme = createTheme({
  typography: {
    fontFamily: 'Kanit, Arial, sans-serif', // กำหนดฟอนต์ Kanit เป็นค่าเริ่มต้น
  },
});

export default theme;
