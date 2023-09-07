import Login from "./pages/Login";
import OptionPanelPage from "./pages/OptionPanelPage";
import { useGlobalContext } from "./context/GlobalContext";

function App() {
  const { user } = useGlobalContext();
  return <div>{!user ? <Login /> : <OptionPanelPage />}</div>;
}

export default App;
