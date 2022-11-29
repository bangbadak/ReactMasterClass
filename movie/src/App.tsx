import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './Routes/Search';
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="movies/:movidId" element={<Home />} />
        </Route>
        < Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </Router>

  )
}

export default App;
