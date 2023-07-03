import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from "react";
import FormsPage from './features/forms/FormsPage';

const Forms = React.lazy(() => import("./pages/forms"));
const FormDetail = React.lazy(() => import("./pages/formDetail"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<FormsPage />} />
          <Route path="/" element={<Forms />} />
          <Route path="/forms/:name" element={<FormDetail />} />
          <Route path="/forms/:name" element={<FormsPage/>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
