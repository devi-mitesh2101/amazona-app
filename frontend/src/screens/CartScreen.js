import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { MessageBox } from '../components/MessageBox';

export default function CartScreen(props) {
	const navigate = useNavigate();
	const params = useParams();
	const { id: productId } = params;

	const { search } = useLocation();
	const qtyInUrl = new URLSearchParams(search).get('qty');
	const qty = qtyInUrl ? Number(qtyInUrl) : 1;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const dispatch = useDispatch();
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		// delete action
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate('/signin?redirect=/shipping')
	}
	return (
		<div className='row my-4 align-content-center g-0'>
			<div className='col-lg-8'>
				<h5 className='mb-3'>Shopping Cart</h5>
				{cartItems.length === 0 ? <MessageBox>
					Cart is Emty.<Link to='/' className='text-decoration-none'> Go Shopping</Link>
				</MessageBox>
					:
					(
						<ul>
							{
								cartItems.map((item) => (
									<li className='list-unstyled my-3 ' key={item.product}>
										<div className='container'>
											<div className='row align-content-center'>
												<div className='col-lg-1 py-2'>
													<img src={item.image} alt={item.name} className="img-fluid small"></img>
												</div>
												<div className='col-lg-3 py-2 ms-5'>
													<Link to={`/product/${item.product}`} className="text-decoration-none text-center">{item.name}</Link>
												</div>
												<div className='col-lg-1 py-2 ms-5'>
													<select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))} className="p-2">
														{
															[...Array(item.countInStock).keys()].map(x => (
																<option key={x + 1} value={x + 1}>{x + 1}</option>
															))
														}
													</select>
												</div>
												<div className='col-lg-2 py-2 ms-5'>
													${item.price}
												</div>
												<div className='col-lg-2 py-2 ms-5'>
													<button type='button' className='btn btn-light' onClick={() => removeFromCartHandler(item.product)}>Delete</button>
												</div>
											</div>

										</div>

									</li>
								))
							}
						</ul>
					)
				}
			</div>

			<div className='col-lg-4'>
				<div className='card w-100 align-content-center'>
					<div className='card-body py-4 bg-light'>
						<h5 className="card-title">Subtotal
							({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
							{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
						</h5>
						<button type="button" className="btn btn-warning w-100 mt-3" onClick={checkoutHandler} disabled={cartItems.length === 0}>Proceed to Checkout</button>
					</div>

				</div>
			</div>
		</div>
	)
}
