import { Routes,Route } from "react-router-dom";

function Home(){
  return(
    <div className="text-4xl font-bold text-center mt-20">
      🚴 Bike Selling & Renting Platform
    </div>
  )
}

function App(){
  return(
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App;