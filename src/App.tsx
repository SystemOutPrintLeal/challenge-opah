import { Main } from "./pages/Main";
import { Tooltip } from "react-tooltip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Tooltip id="info-tooltip" />
      <ToastContainer />
      <Main />
    </>
  );
}

export default App;
