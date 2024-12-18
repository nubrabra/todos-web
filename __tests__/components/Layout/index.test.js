import '@testing-library/jest-dom';
import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from 'src/store/store';
import Layout from 'src/components/Layout';
import { setLoading, setSuccess, setError, onClearAlert } from 'src/store/slices/todoSlice';

describe('Layout Component', () => {
  it('renders children correctly', () => {
    const childContent = 'This is a child component';

    render(
      <Provider store={store}>
        <Layout>
          <div>{childContent}</div>
        </Layout>
      </Provider>
    );

    // ตรวจสอบว่า Children ถูก Render
    expect(screen.getByText(childContent)).toBeInTheDocument();
  });

  it('shows loading indicator when loading is true', async () => {
    // Set loading = true.
    store.dispatch(setLoading(true));

    render(
      <Provider store={store}>
        <Layout>
          <div>Loading Test</div>
        </Layout>
      </Provider>
    );

    expect(store.getState().todos.loading).toBe(true);

    await waitFor(() => {
      // ตรวจสอบว่า Backdrop แสดงผล
      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner).toBeInTheDocument();
    });
  });

  it('shows success Snackbar when success is not null', async () => {
    const successMessage = 'Success Message';
    // Set success value.
    store.dispatch(setSuccess(successMessage));

    render(
      <Provider store={store}>
        <Layout>
          <div>Success Test</div>
        </Layout>
      </Provider>
    );

    // ตรวจสอบข้อความใน Snackbar
    await waitFor(() => expect(screen.getByText(successMessage)).toBeInTheDocument());
  });

  it('shows error Snackbar when error is not null', async () => {
    const errorMessage = 'Error Message';
    // Set error value.
    store.dispatch(setError(errorMessage));

    render(
      <Provider store={store}>
        <Layout>
          <div>Error Test</div>
        </Layout>
      </Provider>
    );

    // ตรวจสอบข้อความใน Snackbar
    await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
  });

  it('clear data message when dispatch onClearAlert.', async () => {
    const successMessage = 'Success Message';
    const errorMessage = 'Error Message';

    store.dispatch(setSuccess(successMessage));
    store.dispatch(setError(errorMessage));

    render(
      <Provider store={store}>
        <Layout>
          <div>Snackbar Close Test</div>
        </Layout>
      </Provider>
    );

    expect(store.getState().todos.success).toEqual(successMessage);
    expect(store.getState().todos.error).toEqual(errorMessage);

    // ใช้ act() เพื่อรอการ Re-render ให้เสร็จก่อนทำ Assertions.
    await act(async () => {
      store.dispatch(onClearAlert());
    });

    expect(store.getState().todos.success).toEqual(null);
    expect(store.getState().todos.error).toEqual(null);
  });
});
