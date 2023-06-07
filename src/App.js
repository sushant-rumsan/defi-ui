import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Borrow from './pages/Borrow';
import Stake from './pages/Stake';
import Transfer from './pages/Transfer';
import Admin from './pages/Admin';
import { EthProvider } from './context/Ethstate';
import Dashboard from './pages/Dashboard';
import BorrowConfirm from './pages/BorrowConfirm';
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";


// function App() {
//   return (
//     <EthProvider>
//       <BrowserRouter>
//         <div className="App">
//           <Navbar />
//           <hr className='hr'/>
//           <Routes>
//             <Route path='/' element={<Home />} />
//             <Route path='/stake' element={<Stake />} />
//             <Route path='/borrow' element={<Borrow />} />
//             <Route path='/transfer' element={<Transfer />} />
//             <Route path='/dashboard' element={<Dashboard />} />
//             <Route path='/borrow/borrowconfirm' element={ <BorrowConfirm/> }/>
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </EthProvider>
//   );
// }

function App() {
  return (
    <ThirdwebProvider activeChain="goerli">
      <EthProvider>
        <BrowserRouter>
          <div className="App">
            <hr className='hr'/>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<LandingPage />}/>
              <Route path='/stake' element={<Stake />} />
              <Route path='/borrow' element={<Borrow />} />
              <Route path='/transfer' element={<Transfer />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/admin' element={ <Admin/>}/>
              <Route path='/borrow/borrowconfirm' element={ <BorrowConfirm/> }/>
            </Routes>
          </div>
        </BrowserRouter>
      </EthProvider>
    </ThirdwebProvider>
  )
}

export default App;
