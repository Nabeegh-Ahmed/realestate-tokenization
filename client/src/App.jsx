import { EthProvider } from "./contexts/EthContext";
import Footer from "./components/Footer";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import AddProperty from "./components/property/addProperty";
import PropertyList from "./components/property/propertyList";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container mx-auto">
          <Register/>
          <Login/>
          <AddProperty/>
          <PropertyList/>
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
