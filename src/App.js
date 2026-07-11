import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import useHttp from "./components/hooks/useHttp";
import Notification from "./components/UI/Notification";
import {cartSliceActions} from "./store/cart-slice";

let isInitialRender = true;

function App() {
    const {sendPutCart, sendGetCart} = useHttp();
    const uiSlice = useSelector(state => state.ui);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCartData = async () => {
            let cartData = await sendGetCart();
            console.log('cart data: ', cartData);

            if (!cartData.items) {
                cartData.items = [];
            }

            dispatch(cartSliceActions.replaceCart(cartData));
        }

        if (isInitialRender) {
            console.log('initial render');
            isInitialRender = false;
            getCartData();

            return
        }

        sendPutCart(cart);
    }, [cart, dispatch, sendPutCart, sendGetCart]);

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
