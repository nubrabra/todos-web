import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useForm, Controller } from 'react-hook-form';
import { get } from 'lodash';

import { addTodo } from 'src/store/slices/todoSlice';

export default function TodoForm() {
  const dispatch = useDispatch();
  const [showDialogCreate, setShowDialogCreate] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      todo: '',
      userId: '',
    },
  });

  const onSubmit = (data) => {
    const todo = get(data, 'todo', '');
    const userId = get(data, 'userId', '');
    dispatch(addTodo({ todo, userId }));
    handleClose();
  };

  const handleClickOpen = () => {
    setShowDialogCreate(true);
  };

  const handleClose = () => {
    setShowDialogCreate(false);
    reset();
  };

  return (
    <Box>
      <Button data-testid={'button-open-dialog'} variant={'contained'} sx={{ borderRadius: 99 }} startIcon={<AddCircleIcon />} onClick={handleClickOpen}>
        <Typography variant={'body2'}>{'New Todos'}</Typography>
      </Button>
      <Dialog open={showDialogCreate} onClose={handleClose}>
        <DialogTitle>
          <Typography variant={'h5'} component={'div'}>
            {'Add New Todos'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ maxWidth: 400 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Todo Field */}
              <Controller
                name={'todo'}
                control={control}
                rules={{
                  required: 'Todo is required',
                  maxLength: {
                    value: 256,
                    message: 'Todo must not exceed 256 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={'Todo'}
                    variant={'outlined'}
                    fullWidth
                    margin={'normal'}
                    error={!!errors.todo}
                    helperText={errors.todo?.message}
                    inputProps={{ 'data-testid': 'input-todo' }}
                  />
                )}
              />

              {/* User ID Field */}
              <Controller
                name='userId'
                control={control}
                rules={{
                  required: 'User ID is required',
                  pattern: {
                    value: /^[0-9]{1,8}$/,
                    message: 'User ID must be a number and up to 8 digits',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='User ID'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    error={!!errors.userId}
                    helperText={errors.userId?.message}
                    inputProps={{ 'data-testid': 'input-userId' }}
                  />
                )}
              />

              <Box mt={2} display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} gap={1}>
                <Button data-testid={'button-close-dialog'} variant={'outlined'} onClick={handleClose}>
                  <Typography variant={'subtitle2'}>{'Cancel'}</Typography>
                </Button>
                <Button type={'submit'} variant={'contained'}>
                  <Typography variant={'body2'}>{'Add'}</Typography>
                </Button>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
