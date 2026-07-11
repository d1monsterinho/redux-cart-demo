import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import useHttp from "./components/hooks/useHttp";
import Notification from "./components/UI/Notification";

let isInitialRender = true;

function App() {
    const {sendPutCart} = useHttp();
    const uiSlice = useSelector(state => state.ui);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        if (isInitialRender) {
            isInitialRender = false;
            return
        }
        sendPutCart(cart);
    }, [cart, sendPutCart]);

    return (
        <Fragment>
            {uiSlice.notification && <Notification {...uiSlice.notification}/>}
            <Layout>
                {uiSlice.cartIsVisible && <Cart/>}
                <Products/>
            </Layout>
        </Fragment>
    );
}

export default App;
