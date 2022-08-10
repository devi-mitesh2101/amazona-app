import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { detailsOrder } from '../actions/orderActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { PayPalButton } from 'react-paypal-button-v2';

export const OrderScreen = () => {
	const params = useParams();
	const { id: orderId } = params;
	const [sdkReady, setSdkReady] = useState(false);
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;
	const dispatch = useDispatch();
	useEffect(() => {
		const addPayPalScript = async () => {
			const { data } = await Axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
		if (!order) {
			dispatch(detailsOrder(orderId));
		} else {
			if (!order.isPaid) {
				if (!window.paypal) {
					addPayPalScript();
				}
				else {
					setSdkReady(true);
				}
			}
		}

	}, [dispatch, orderId, order, sdkReady]);
	const successPaymentHandler = () => {
		//TODO: dispatch pay order
	}
	return loading ? (<LoadingBox></LoadingBox>) :
		error ? (<MessageBox variant='danger'>{error}</MessageBox>)
			:
			(
				<div className='mt-5'>
					<h3>Order {order._id}</h3>
					<div className='row g-0'>
						<div className='col-lg-8 col-md-8 col-sm-12'>
							<ul className='list-group'>
								<li className='list-unstyled'>
									<div className="card m-2">
										<div class="card-body">
											<h3>Shipping</h3>
											<p>
												<strong>Name: </strong> {order.shippingAddress.fullName} <br />
												<strong>Address: </strong> {order.shippingAddress.address},
												{order.shippingAddress.city}, {order.shippingAddress.postalCode},
												{order.shippingAddress.country}.
											</p>
											{order.isDeliverd ?
												<MessageBox variant='success'>Deliverd At {order.deliveredAt}</MessageBox>
												:
												<MessageBox variant='danger'>Not Deliverd</MessageBox>
											}
										</div>
									</div>
								</li>
								<li className='list-unstyled'>
									<div className="card m-2">
										<div class="card-body">
											<h3>Payment</h3>
											<p>
												<strong>Method: </strong> {order.paymentMethod}
											</p>
											{order.isPaid ?
												<MessageBox variant='success'>Paid At {order.paidAt}</MessageBox>
												:
												<MessageBox variant='danger'>Not Paid</MessageBox>
											}
										</div>
									</div>
								</li>
								<li className='list-unstyled'>
									<div className="card m-2">
										<div class="card-body">
											<h3>Order Items</h3>
											<ul>
												{
													order.orderItems.map((item) => (
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
												<div>${order.itemsPrice.toFixed(2)}</div>
											</div>
										</li>
										<li className='list-unstyled'>
											<div className='d-flex justify-content-between'>
												<p>Shipping</p>
												<div>${order.shippingPrice.toFixed(2)}</div>
											</div>
										</li>
										<li className='list-unstyled'>
											<div className='d-flex justify-content-between'>
												<p>Tax</p>
												<div>${order.taxPrice.toFixed(2)}</div>
											</div>
										</li>
										<li className='list-unstyled'>
											<div className='d-flex justify-content-between'>
												<b>Order Total</b>
												<div><b>${order.totalPrice.toFixed(2)}</b></div>
											</div>
										</li>
										{
											!order.isPaid && (
												<li className='list-unstyled'>
													{!sdkReady ? (<LoadingBox></LoadingBox>) :
														(
															<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}>
															</PayPalButton>
														)
													}
												</li>
											)
										}
									</ul>

								</div>
							</div>
						</div>
					</div>
				</div>
			)
}
