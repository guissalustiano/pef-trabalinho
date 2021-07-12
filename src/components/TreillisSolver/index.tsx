import React, { useState } from 'react';
import { solveTreillis } from '../../helper/treillis';
import TreillisTable from '../TreillisTable';
import TreillisView from '../TreillisView';
// import { generateTreillisSample } from './data';

import "./style.css";

// const initialTreillis = generateTreillisSample();

const TreillisSolver = () => {
  const [treillis, setTreiliss] = useState(null)
  const solvedTreillis = solveTreillis(treillis);

  return (
    <div className="treillis-wrapper">
      <div className="treillis-table-wrapper">
        <TreillisTable onChange={setTreiliss} />
      </div>
      <div className="treillis-view-wrapper">
        {solvedTreillis == null ?
          <h3 className="error">treliça hipostática</h3> :
          <TreillisView width={750} treillis={solvedTreillis} />
        }
      </div>
    </div>
  );
};

export default TreillisSolver;
