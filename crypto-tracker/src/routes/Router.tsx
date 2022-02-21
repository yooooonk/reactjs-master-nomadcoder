import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Coins from "./Coins";
import Coin from "./Coin";

function Router(){
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Coins />}/>
            <Route path=":coinId" element={<Coin />}/>
        </Routes>
    </BrowserRouter>)
}

export default Router;