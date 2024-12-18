import { Box, Stack, Typography } from '@mui/material';

import TodoList from 'src/components/Todo/TodoList';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        pt: 2,
        gap: 4,
      }}
    >
      <Typography variant={'h4'}>Todos</Typography>
      <TodoList />
    </Box>
  );
}
