import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Overview from './pages/Overview';
import Detail from './pages/Detail';
import './index.css';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/detail/:id" element={<Detail />} />
      {/* <Route path="/detail/:id" render={(props) => (
        <Detail id={props.match.params.id} />
      )} /> */}

      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here :)</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter >,
  rootElement
);

reportWebVitals();
