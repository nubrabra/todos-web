import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Backdrop, CircularProgress, Container, Box, useMediaQuery, Snackbar, Typography } from '@mui/material';
import { Portal } from '@mui/base';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import { onClearAlert } from 'src/store/slices/todoSlice';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)');
  const { loading, success, error } = useSelector((state) => state.todos);

  const container = useRef(null);

  return (
    <Container>
      <Box
        sx={{
          py: isMobile ? 2 : 1,
          bgcolor: 'white',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>

      {/* Loading */}
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <CircularProgress data-testid={'loading-spinner'} color={'inherit'} />
      </Backdrop>

      {/* Alert success */}
      <Portal container={() => container.current}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={success}
          onClose={() => dispatch(onClearAlert())}
          key={'snackbar_top_center_success'}
          autoHideDuration={1200}
        >
          <Alert
            severity={'success'}
            variant='filled'
            icon={<CheckCircleOutlineOutlinedIcon fontSize='inherit' sx={{ color: 'white' }} />}
            sx={{ width: '100%' }}
          >
            <Typography variant='body2' sx={{ color: 'white' }}>
              {success}
            </Typography>
          </Alert>
        </Snackbar>
      </Portal>

      {/* Alert error */}
      <Portal container={() => container.current}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={error}
          onClose={() => dispatch(onClearAlert())}
          key={'snackbar_top_center_error'}
          autoHideDuration={1200}
        >
          <Alert severity='error' variant='filled' sx={{ width: '100%' }}>
            <Typography variant='body2' sx={{ color: 'white' }}>
              {error}
            </Typography>
          </Alert>
        </Snackbar>
      </Portal>
    </Container>
  );
}
