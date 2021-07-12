import React from 'react';
import TreillisSolver from '../TreillisSolver';

import './style.css'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Resolverdor de Treliça</h1>
        <div>Insira os nós na tabela abaixo e veja a magica acontecer :)</div>
        </header>
      <main>
        <TreillisSolver />
      </main>
      <footer>
        <span></span>
        <div>Trabalho da diciplina PEF3208 (USP 2020)</div>
        <a href="https://github.com/guissalustiano/pef-trabalinho"><img src="github.png" alt="github logo" height={36}></img></a>
      </footer>
    </div>
  );
}

export default App;
