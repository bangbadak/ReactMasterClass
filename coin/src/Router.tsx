import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:coinId" element={<Coin />} />
                <Route path="/" element={<Coins />} />
            </Routes>
        </BrowserRouter>
    )
}

// const Router = () => {
//     return (
//         <BrowserRouter>
//             <Switch>
//                 <Route path="/:coinId">
//                     <Coin />
//                 </Route>

//                 <Route path="/">
//                     <Coins />
//                 </Route>
//             </Switch>
//         </BrowserRouter>
//     )
// }

export default Router;