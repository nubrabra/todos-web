import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  OutlinedInput,
  IconButton,
  InputAdornment,
  Stack,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  TablePagination,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { map } from 'lodash';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { fetchTodos, setPage, setLimit } from 'src/store/slices/todoSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
  },
}));

export default function TodoList() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const { todos, total, limit, page } = useSelector((state) => state.todos);

  const tableMaxWidth = { mobile: '100%', desktop: 650 };

  const tableRef = useRef(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    let didCancel = false;
    if (!didCancel) {
      dispatch(fetchTodos({ limit, page }));
      scrollTableToTop();
    }

    return () => {
      didCancel = true;
    };
  }, [dispatch, page, limit]);

  const scrollTableToTop = () => {
    if (tableRef.current) {
      tableRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handlePageChange = (event, newPage) => {
    dispatch(setPage(newPage + 1)); // เปลี่ยนหมายเลขหน้า
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setLimit(event.target.value));
    dispatch(setPage(1));
  };

  const onSearch = () => {
    dispatch(fetchTodos({ limit, page, userId: searchText }));
    scrollTableToTop();
  };

  const handleClearSearch = () => {
    if (searchText) {
      setSearchText('');

      // เวลากดเคลียค่าแล้ว page = 0 มันจะไม่เข้า useEffect ข้างบน เลยต้อง fetch todos เอง
      if (page !== 1) {
        dispatch(setPage(1));
      } else {
        dispatch(fetchTodos({ limit, page }));
      }
    }
  };

  return (
    <Stack flex flexDirection={'column'} gap={1} alignItems={'center'}>
      <Stack
        width={isMobile ? tableMaxWidth.mobile : tableMaxWidth.desktop}
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        gap={1}
      >
        <Stack width={'100%'} flex={1} flexDirection={'row'} alignItems={'center'} gap={1}>
          <Typography>{'Search :'}</Typography>
          <OutlinedInput
            id={'outlined-adornment-weight'}
            aria-describedby={'outlined-weight-helper-text'}
            size={'small'}
            sx={{ paddingRight: '2px' }}
            type={'number'}
            placeholder={'User id'}
            value={searchText}
            endAdornment={
              <InputAdornment position={'end'} sx={{ visibility: searchText ? 'visible' : 'hidden' }}>
                <IconButton aria-label={'clear_search_text'} size={'small'} onClick={handleClearSearch}>
                  <CloseIcon fontSize='small' />
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => {
              setSearchText(e.target.value.replace(/[^0-9]/g, ''));
            }}
          />
          <IconButton aria-label={'search'} color={'primary'} onClick={onSearch}>
            <SearchIcon />
          </IconButton>
        </Stack>
        <TodoForm />
      </Stack>
      <Paper
        sx={{
          width: '100%',
          height: isMobile ? 'calc(100vh - 260px)' : 'calc(100vh - 220px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <TableContainer ref={tableRef} component={Paper}>
          <Table
            stickyHeader
            sx={{
              width: isMobile ? tableMaxWidth.mobile : tableMaxWidth.desktop,
            }}
            aria-label={'table_todo'}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell width={'5%'}>{'ID'}</StyledTableCell>
                <StyledTableCell width={'74%'}>{'Todo'}</StyledTableCell>
                <StyledTableCell width={'15%'} align={'center'}>
                  {'User Id'}
                </StyledTableCell>
                <StyledTableCell width={'5%'} align={'center'}>
                  {'Status'}
                </StyledTableCell>
                <StyledTableCell width={'1%'} align={'right'}>
                  {''}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(todos, (row, index) => (
                <TodoItem key={`todo_item_${index}`} item={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component={'div'}
        count={total}
        rowsPerPage={limit}
        page={page - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
}
