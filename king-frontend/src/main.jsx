import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Create from '~/pages/Create/index.jsx';
import Detail from '~/pages/Detail/index.jsx';
import ErrorPage from '~/pages/ErrorPage/index.jsx';
import Home from '~/pages/Home/index.jsx';
import Login from '~/pages/Login/index.jsx';
import EditProfile from '~/pages/EditProfile/index.jsx';
import Profile from '~/pages/Profile/index.jsx';
import Register from '~/pages/Register/index.jsx';
import Search from '~/pages/Search/index.jsx';
import App from './App.jsx';
import './index.scss';
import EditPin from '~/pages/EditPin/index.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '~/app/store.js';
import PrivateRoute from '~/components/PrivateRoute/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/create',
        element: (
          <PrivateRoute>
            <Create />
          </PrivateRoute>
        )
      },
      {
        path: '/pin/:pinId',
        element: <Detail />
      },
      {
        path: '/pin/edit/:pinId',
        element: (
          <PrivateRoute>
            <EditPin />
          </PrivateRoute>
        )
      },
      {
        path: '/profile/:profileId',
        element: <Profile />
      },
      {
        path: '/profile/edit/:profileId',
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        )
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
