import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';

export const PlaceOrderScreen = () => {
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	if (!cart.paymentMethod) {
		navigate('/payment');
	}
	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, error, order } = orderCreate;
	const toPrice = (num) => Number(num.toFixed(2)); //5.123="5.12" => 5.12
	cart.itemsPrice = toPrice(
		cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
	);
	cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
	cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
	const dispatch = useDispatch();
	const placeOrderHandler = () => {
		//TODO: dispatch place order action
		dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
	};
	useEffect(() => {
		if (success) {
			navigate(`/order/${order._id}`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [dispatch, order, navigate, success]);
	return (
		<div className='mt-2'>
			<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
			<div className='row g-0'>
				<div className='col-lg-8 col-md-8 col-sm-12'>
					<ul className='list-group'>
						<li className='list-unstyled'>
							<div className="card m-2">
								<div class="card-body">
									<h3>Shipping</h3>
									<p>
										<strong>Name: </strong> {cart.shippingAddress.fullName} <br />
										<strong>Address: </strong> {cart.shippingAddress.address},
										{cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
										{cart.shippingAddress.country}.
									</p>
								</div>
							</div>
						</li>
						<li className='list-unstyled'>
							<div className="card m-2">
								<div class="card-body">
									<h3>Payment</h3>
									<p>
										<strong>Method: </strong> {cart.paymentMethod}
									</p>
								</div>
							</div>
						</li>
						<li className='list-unstyled'>
							<div className="card m-2">
								<div class="card-body">
									<h3>Order Items</h3>
									<ul>
										{
											cart.cartItems.map((item) => (
												<li className='list-unstyled' key={item.product}>

													<div className='row g-0'>
														<div className='col-lg-4 col-md-3 col-sm-6 py-1'>
															<img src={item.image} alt={item.name} className="img-fluid w-25"></img>
														</div>
														<div className='col-lg-4 col-md-4 col-sm-6 d-flex'>
															<Link to={`/product/${item.product}`} className="text-decoration-none text-center">{item.name}</Link>
														</div>
														<div className='col-lg-4 col-md-5 col-sm-12 py-1'>
															{item.qty} x ${item.price} = ${item.qty * item.price}
														</div>
													</div>
												</li>
											))
										}
									</ul>
								</div>
							</div>
						</li>
					</ul>

				</div>
				<div className='col-lg-4 col-md-4 col-sm-12'>
					<div className="card m-2 ">
						<div class="card-body mb-3">
							<ul>
								<li className='list-unstyled'>
									<h3 className='mb-3'> Order Summary</h3>
								</li>
								<li className='list-unstyled'>
									<div className='d-flex justify-content-between'>
										<p>Items</p>
										<div>${cart.itemsPrice.toFixed(2)}</div>
									</div>
								</li>
								<li className='list-unstyled'>
									<div className='d-flex justify-content-between'>
										<p>Shipping</p>
										<div>${cart.shippingPrice.toFixed(2)}</div>
									</div>
								</li>
								<li className='list-unstyled'>
									<div className='d-flex justify-content-between'>
										<p>Tax</p>
										<div>${cart.taxPrice.toFixed(2)}</div>
									</div>
								</li>
								<li className='list-unstyled'>
									<div className='d-flex justify-content-between'>
										<b>Order Total</b>
										<div><b>${cart.totalPrice.toFixed(2)}</b></div>
									</div>
								</li>

								<li className='list-unstyled'>
									<button
										type="button"
										className="btn btn-warning w-100 mt-2 "
										onClick={placeOrderHandler}
										disabled={cart.cartItems.length === 0}>
										Place Order
									</button>
								</li>
								{loading && <LoadingBox></LoadingBox>}
								{error && <MessageBox variant='danger'>{error}</MessageBox>}
							</ul>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
