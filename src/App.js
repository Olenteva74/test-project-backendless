import React, { useEffect, lazy, Suspense } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  NavLink,
} from "react-router-dom";

import data from "data/tabs.json";

const tabs = data.sort(
  (firstTab, secondTab) => firstTab.order - secondTab.order
);

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(tabs[0]?.id);
  }, []);

  return (
    <>
      <nav>
        {tabs.map(({ id, title }) => {
          return (
            <li key={id}>
              <NavLink to={id}>{title}</NavLink>
            </li>
          );
        })}
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {tabs.map(({ id, path }) => {
            return (
              <Route
                key={id}
                path={id}
                element={React.createElement(lazy(() => import(`./${path}`)))}
              />
            );
          })}
          <Route path="*" element={<Navigate to={tabs[0].id} />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
