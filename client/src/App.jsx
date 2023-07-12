import React from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./views/Landing";
import Detail from "./views/Detail";
import Form from "./views/Form";
import Home from "./views/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
};

export default App;