import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MarketOverview from "./pages/MarketOverview/MarketOverview";
import CoinDetail from "./pages/CoinDetail/CoinDetail";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MarketOverview />} />
        <Route path='/coin/:id' element={<CoinDetail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
