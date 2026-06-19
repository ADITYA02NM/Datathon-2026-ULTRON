import KSPHeader from './components/KSPHeader';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Maps from './pages/Maps';
import Network from './pages/Network';
import Intelligence from './pages/Intelligence';
import Admin from './pages/Admin';
import IntelGraph from './pages/IntelGraph';
import { useNavStore } from './stores/navStore';
import { useAuthStore } from './stores/authStore';

function App() {
  const { currentPage } = useNavStore();
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn || currentPage === 'login') {
    return <Login />;
  }

  if (currentPage === 'intelgraph') {
    return <IntelGraph />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0e1a] text-slate-200 overflow-hidden">
      <KSPHeader />
      
      <main className="flex-1 w-full h-full relative overflow-hidden flex flex-col">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'maps' && <Maps />}
        {currentPage === 'network' && <Network />}
        {currentPage === 'intelligence' && <Intelligence />}
        {currentPage === 'admin' && <Admin />}
      </main>
    </div>
  );
}

export default App;
