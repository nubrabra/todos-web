import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { Button, TableCell, IconButton, Menu, MenuItem, TableRow, Tooltip, Typography, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { deleteTodo, markTodoCompleted, markTodoUnCompleted } from 'src/store/slices/todoSlice';

export default function TodoList(props) {
  const item = get(props, 'item', {});
  const dispatch = useDispatch();

  const id = get(item, 'id', '');
  const todo = get(item, 'todo', '');
  const status = get(item, 'completed', false);
  const userId = get(item, 'userId', '');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    status
      ? {
          key: `uncompleted_todo_${id}`,
          onClick: () => {
            dispatch(markTodoUnCompleted({ id: item?.id }));
            handleClose();
          },
          content: (
            <Stack flex flexDirection={'row'} gap={1} alignItems={'center'}>
              <CancelIcon fontSize={'small'} color={'error'} />
              <Typography variant={'subtitle2'}>{'Mark as uncompleted'}</Typography>
            </Stack>
          ),
        }
      : {
          key: `completed_todo_${id}`,
          onClick: () => {
            dispatch(markTodoCompleted({ id: item?.id }));
            handleClose();
          },
          content: (
            <Stack flex flexDirection={'row'} gap={1} alignItems={'center'}>
              <CheckCircleIcon fontSize={'small'} color={'success'} />
              <Typography variant={'subtitle2'}>{'Mark as completed'}</Typography>
            </Stack>
          ),
        },
    {
      key: `delete_todo_${id}`,
      onClick: () => {
        dispatch(deleteTodo({ id: item?.id }));
        handleClose();
      },
      content: (
        <Stack flex flexDirection={'row'} gap={1} alignItems={'center'}>
          <DeleteIcon fontSize={'small'} sx={{ color: '#171717' }} />
          <Typography variant={'subtitle2'}>{'Delete'}</Typography>
        </Stack>
      ),
    },
  ];

  return (
    <TableRow key={`todo_item_row${id}`} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell data-testid={`todo_item_${id}_id`} component='th' scope='row'>
        {id}
      </TableCell>
      <TableCell data-testid={`todo_item_${id}_todo`}>{todo}</TableCell>
      <TableCell data-testid={`todo_item_${id}_userId`} align={'center'}>
        {userId}
      </TableCell>
      <TableCell data-testid={`todo_item_${id}_status`} align={'center'}>
        {status ? (
          <Tooltip data-testid={`todo_item_${id}_status_tooltip`} title={'Completed'}>
            <CheckCircleIcon color={'success'} />
          </Tooltip>
        ) : (
          <Tooltip data-testid={`todo_item_${id}_status_tooltip`} title={'Uncompleted'}>
            <CancelIcon color={'error'} />
          </Tooltip>
        )}
      </TableCell>
      <TableCell data-testid={`todo_item_${id}_more`} align={'right'}>
        <IconButton
          aria-label={`todo_item_${id}_button_more`}
          id={'long-button'}
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup={'true'}
          onClick={handleClick}
        >
          <MoreVertIcon fontSize={'small'} />
        </IconButton>
        <Menu
          id='long-menu'
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{}}
        >
          {options.map((option) => (
            <MenuItem key={option.key} onClick={option.onClick}>
              {option.content}
            </MenuItem>
          ))}
        </Menu>
      </TableCell>
    </TableRow>
  );
}
