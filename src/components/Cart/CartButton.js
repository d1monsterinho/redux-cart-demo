import classes from './CartButton.module.css';
import {useDispatch} from "react-redux";
import {uiSliceActions} from "../../store/ui-slice";

const CartButton = (props) => {
    const dispatch = useDispatch();

    const handleCartButtonClick = () => {
        dispatch(uiSliceActions.toggleCartVisibility());
    }

    return (
        <button className={classes.button} onClick={handleCartButtonClick}>
            <span>My Cart</span>
            <span className={classes.badge}>1</span>
        </button>
    );
};

export default CartButton;
