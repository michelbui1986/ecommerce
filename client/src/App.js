import "./App.css";
import Navbar from "./components/header/Navbar";
import Newnav from "./components/newnavbar/Newnav";
import Maincomp from "./components/home/Maincomp";
import Footer from "./components/footer/Footer";
function App() {
  return (
    <>
      <Navbar />
      <Newnav />
      <Maincomp />
      <Footer />
    </>
  );
}

export default App;
