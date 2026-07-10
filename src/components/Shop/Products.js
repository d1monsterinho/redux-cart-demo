import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
    {
        id: 'p1',
        title: 'My First Book',
        price: 10,
        description: 'This is My First Book Description!',
    },
    {
        id: 'p2',
        title: 'My Second Book',
        price: 15,
        description: 'This is My Second Book Description!',
    },
    {
        id: 'p3',
        title: 'My Third Book',
        price: 20,
        description: 'This is My Third Book Description!',
    },
];

const Products = (props) => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {DUMMY_PRODUCTS.map(item => (
                    <ProductItem key={item.id} {...item} />
                ))}
            </ul>
        </section>
    );
};

export default Products;
