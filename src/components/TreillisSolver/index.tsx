import React, { useState } from 'react';
import { solveTreillis } from '../../helper/treillis';
import TreillisTable from '../TreillisTable';
import TreillisView from '../TreillisView';
import { generateTreillisSample } from './data';

import "./style.css";

const initialTreillis = generateTreillisSample();

const TreillisSolver = () => {
  const [treillis, setTreiliss] = useState(initialTreillis)
  const solvedTreillis = solveTreillis(treillis)
  return (
    <div className="treillis-wrapper">
      <div className="treillis-view-wrapper">
        <TreillisView width={750} treillis={solvedTreillis}/>
      </div>
      <div className="treillis-table-wrapper">
        <TreillisTable onChange={setTreiliss}/>
      </div>
    </div>
  );
};

export default TreillisSolver;
