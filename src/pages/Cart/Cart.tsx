import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { CartProduct } from '../../config/types/marketTypes';
import { getCartProducts } from '../../services/repositories/user-repository';
import { AddCircle, CheckCircle, RemoveCircle } from '@mui/icons-material';
import { promptMessage } from '../../store/slices/promptSlice';
import millify from 'millify';
import PriceTag from '../../components/PriceTag/PriceTag';
import './Cart.scss'

const Cart = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(x => x.auth);
    const [products, setProducts] = useState<Array<CartProduct>>([]);

    const total = useMemo(() => {
        const sum = products.reduce((sum, current) => {
            return sum + current.product.price * current.quantity;
        }, 0)
        return millify(sum, {
            precision: 4,
            lowercase: true
        });
    }, [products])
    useEffect(() => {
        const fetchCartProducts = async () => {
            const productsResult = await getCartProducts(auth.uuid);
            const cartProducts: Array<CartProduct> = productsResult.map((product) => ({
                product: product,
                quantity: 1
            }))
            console.log(cartProducts);

            setProducts(cartProducts);
        }
        fetchCartProducts();
    }, [auth])

    const submitPurchase = async () => {
        const msgConfig = "!תודה על קנייתך, פרטי ההזמנה ישלחו במייל";
        dispatch(promptMessage({ message: msgConfig, type: "success" }))

        ///////////// TODO Submit on server side /////////////

        setProducts([]);
    }

    const increment = (product: CartProduct): void => {
        setProducts(x => {
            const newProductsState = [...x];
            const productIndex = newProductsState
                .findIndex(x => x.product.id === product.product.id);

            newProductsState[productIndex].quantity++;


            return newProductsState;
        })
    }

    const decrement = (product: CartProduct): void => {
        setProducts(x => {
            const newProductsState = [...x];
            const productIndex = newProductsState
                .findIndex(x => x.product.id === product.product.id);
            newProductsState[productIndex].quantity--;
            if (newProductsState[productIndex].quantity <= 0) {
                newProductsState.splice(productIndex, 1);
            }
            return newProductsState;
        })
    }

    return (
        <div className="my-cart">
            <div className="cart-products">
                {products.map((p, i) => (
                    <div className="product" key={i}>
                        <div className="quantity">
                            <AddCircle onClick={() => increment(p)} />
                            <div className="amount">x{p.quantity}</div>
                            <RemoveCircle onClick={() => decrement(p)} />
                        </div>
                        <img
                            src={p.product.img}
                            alt="product-preview"
                            className="product-preview" />
                        <PriceTag
                            credits={p.product.price * p.quantity}
                            title={p.product.name}
                            description={p.product.description} />
                    </div>
                ))}
            </div>
            <div className="payment-container">
                <div className="info">
                    <div className="title">סה"כ קרדיטים 💰 </div>
                    <div className="total">{total}  </div>
                </div>
                <div className="seperator"></div>
                <div className="payment" onClick={submitPurchase}>
                    לתשלום
                    <br />
                    לחצו
                    <CheckCircle />
                </div>
            </div>
        </div>
    )
}
export default Cart