import AppRoutes from './routes/AppRoutes';
import { useAuth } from './hooks/useAuth'; // Just for potential initial loading checks
import { useUI } from './context/UIContext';
import Spinner from './components/common/Spinner';

function App() {
  const { isLoading } = useAuth(); // Assume initial auth check
  const { isModalOpen } = useUI(); // Example UI state

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppRoutes />
      {/* Example of a globally managed modal */}
      {/* {isModalOpen && <Modal />} */}
    </div>
  );
}

export default App;