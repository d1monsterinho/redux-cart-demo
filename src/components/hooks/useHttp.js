import {useDispatch} from "react-redux";
import {uiSliceActions} from "../../store/ui-slice";
import {useCallback} from "react";

const apiEndpoints = {
    sendGetCart: {
        url: 'https://redux-cart-demo-eac5f-default-rtdb.firebaseio.com/cart.json',
        errorMessage: 'Error occurred during cart fetching',
    },
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

    const sendGetCart = useCallback(async () => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending request to fetch cart...',
        }))

        try {
            const response = await fetch(apiEndpoints.sendGetCart.url);

            if (!response.ok) {
                handleRequestError('GET', apiEndpoints.sendGetCart.url, apiEndpoints.sendGetCart.errorMessage)
                return;
            }

            dispatch(uiSliceActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart fetched successfully',
            }));

            return await response.json();
        } catch (error) {
            handleRequestError('GET', apiEndpoints.sendGetCart.url, error.message);
        }
    }, [dispatch, handleRequestError]);

    const sendPutCart = useCallback(async (cart) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending request to update cart...',
        }));

        try {
            const response = await fetch(apiEndpoints.sendPutCart.url, {
                method: 'PUT',
                body: JSON.stringify(cart),
            });

            if (!response.ok) {
                handleRequestError('PUT', apiEndpoints.sendPutCart.url, apiEndpoints.sendPutCart.errorMessage);
                return;
            }

            dispatch(uiSliceActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart updated successfully',
            }));

            return await response.json();
        } catch (error) {
            handleRequestError('PUT', apiEndpoints.sendPutCart.url, error.message);
        }
    }, [dispatch, handleRequestError]);

    return {
        sendGetCart,
        sendPutCart,
    }
}

export default useHttp;



