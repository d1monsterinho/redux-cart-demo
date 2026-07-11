import {useDispatch} from "react-redux";
import {uiSliceActions} from "../../store/ui-slice";
import {useCallback} from "react";

const apiEndpoints = {
    sendPutCart: {
        url: 'https://redux-cart-demo-eac5f-default-rtdb.firebaseio.com/cart.json',
        errorMessage: 'Error occurred during during cart update'
    },
}

const useHttp = () => {
    const dispatch = useDispatch();

    const handleRequestError = useCallback((method, url, message) => {
        console.log(`Error occurred during request: ${method} ${url}`);

        dispatch(uiSliceActions.showNotification({
            status: 'error',
            title: 'Error!',
            message,
        }));
    }, [dispatch]);

    const sendGetCart = async () => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending request to get your cart...',
        }))

        const response = await fetch(apiEndpoints.cart);

        if (!response.ok) {
            console.log(`Error occurred during request: GET ${apiEndpoints.cart}`);
            return;
        }

        return await response.json();
    }

    const sendPutCart = useCallback(async (cart) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending request to update cart...',
        }));

        const response = await fetch(apiEndpoints.sendPutCart.url, {
            method: 'PUT',
            body: JSON.stringify(cart),
        }).catch((error) => {
            console.log(error.message);
        });

        if (!response || !response.ok) {
            handleRequestError('PUT', apiEndpoints.sendPutCart, apiEndpoints.sendPutCart.errorMessage);
            return;
        }

        dispatch(uiSliceActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Cart updated successfully',
        }));

        return await response.json();
    }, [dispatch, handleRequestError]);

    return {
        sendGetCart,
        sendPutCart,
    }
}

export default useHttp;



