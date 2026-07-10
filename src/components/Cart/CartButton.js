import classes from './CartButton.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiSliceActions} from "../../store/ui-slice";

const CartButton = (props) => {
    const totalSize = useSelector(state => state.cart.totalSize);
    const dispatch = useDispatch();

    const handleCartButtonClick = () => {
        dispatch(uiSliceActions.toggleCartVisibility());
    }

    return (
        <button className={classes.button} onClick={handleCartButtonClick}>
            <span>My Cart</span>
            <span className={classes.badge}>{totalSize}</span>
        </button>
    );
};

export default CartButton;
