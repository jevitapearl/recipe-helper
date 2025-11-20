import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage.jsx';
import BillboardsPage from './pages/BillboardsPage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import OffersPage from './pages/OffersPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'billboards', element: <BillboardsPage /> },
      { path: 'about-us', element: <AboutUsPage /> },
      { path: 'offers', element: <OffersPage /> },
    ],
  },
]);

export default router;