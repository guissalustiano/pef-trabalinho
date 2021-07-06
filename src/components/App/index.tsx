import React from 'react';
import TreillisSolver from '../TreillisSolver';

import './style.css'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Projetinho top de PEF</h1>
        <div>Se eu fizer um projeto desses e reprovar por falta eu vou ficar mt puto</div>
        <div>Resolvido magicamente seguindo o metodo descrito nesse <a href="https://edisciplinas.usp.br/pluginfile.php/4109576/mod_resource/content/1/Notas%20de%20aula-%20v2.pdf">pdf</a></div>
      </header>
      <main>
        <TreillisSolver />
      </main>
      <footer>
        Feito pelos mais fodas, para diciplina do humilde Guilherme, codigo futuramente disponivel no github
      </footer>
    </div>
  );
}

export default App;
