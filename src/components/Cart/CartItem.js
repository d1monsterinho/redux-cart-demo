import classes from './CartItem.module.css';
import {cartSliceActions} from "../../store/cart-slice";
import {useDispatch} from "react-redux";

const CartItem = (props) => {
    const {id, title, quantity, total, price} = props.item;

    const dispatch = useDispatch();

    const handleAddToCartClick = () => {
        dispatch(cartSliceActions.addItem({
            id,
            title,
            quantity: 1,
            price,
        }));
    }

    const handleRemoveFromCartClick = () => {
        dispatch(cartSliceActions.removeItem(id));
    }

    return (
        <li className={classes.item}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    ${total.toFixed(2)}{' '}
                    <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={handleRemoveFromCartClick}>-</button>
                    <button onClick={handleAddToCartClick}>+</button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
