import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MarketOverview from "./pages/MarketOverview/MarketOverview";
import CoinDetail from "./pages/CoinDetail/CoinDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MarketOverview />} />
        <Route path='/coin/:id' element={<CoinDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
