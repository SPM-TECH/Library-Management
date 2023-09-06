import Login from "./pages/Login";
import Optionpannel from "./pages/Optionpannel";
import { useGlobalContext } from "./context/GlobalContext";

function App() {
  const { user } = useGlobalContext();
  return <div>{!user ? <Login /> : <Optionpannel />}</div>;
}

export default App;
