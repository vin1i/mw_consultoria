import About from "./components/About";
import Diferencial from "./components/About/Diferencial";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Global from "./styles/Global";

function App() {
  return (
    <div>
      {/* Estilos globais aplicados no início */}
      <Global /> 

      {/* Cabeçalho da página */}
      <Header />

      {/* Seção principal */}
      <main>
        {/* Banner principal */}
        <Banner />

        {/* Seção de "About" com "Diferencial" como filho */}
        <About>
          <Diferencial />
        </About>
      </main>
    </div>
  );
}

export default App;
