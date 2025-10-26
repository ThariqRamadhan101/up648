import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { lazy, Suspense } from 'react';

// Lazy load pages
const Board = lazy(() => import('./pages/Board'));
const Backlog = lazy(() => import('./pages/Backlog'));
const Map = lazy(() => import('./pages/Map'));
const Overview = lazy(() => import('./pages/Overview'));
const Data = lazy(() => import('./pages/Data'));

function App() {
  return (
    // 👇 Important: add basename for GitHub Pages
    <Router basename="/up648">
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* 👇 Remove the leading slash so it respects basename */}
            <Route path="/" element={<Navigate to="board" replace />} />
            <Route path="board" element={<Board />} />
            <Route path="backlog" element={<Backlog />} />
            <Route path="map" element={<Map />} />
            <Route path="overview" element={<Overview />} />
            <Route path="data" element={<Data />} />
            {/* 👇 Optional: catch-all to redirect unknown paths */}
            <Route path="*" element={<Navigate to="board" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
