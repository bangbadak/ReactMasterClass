import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';

interface IRouterProps {
    toggleDark: () => void;
    isDark: boolean;
}

function Router({ toggleDark, isDark }: IRouterProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:coinId/*" element={<Coin isDark={isDark} />} />
                <Route path="/" element={<Coins toggleDark={toggleDark} />} />
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