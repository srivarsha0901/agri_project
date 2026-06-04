import DealerRegister from "./components/DealerDashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <DealerRegister />
    </>
  );
}

export default App;