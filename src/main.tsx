import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from 'virtual:generated-pages-react';
import Layout from './components/layout';
import './index.css';

// export const routes: RouteObject[] = [
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: 'createRegistrationForm', element: <CreateRegistration /> }
//     ]
//   }
// ];


// export const router = createBrowserRouter(routes, {
//   basename: "/registration/",
// });

const router = createBrowserRouter(
  routes.map((route) => ({
    ...route,
    element: <Layout>{route.element}</Layout>,
  })), {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  },
  basename: "/",
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);