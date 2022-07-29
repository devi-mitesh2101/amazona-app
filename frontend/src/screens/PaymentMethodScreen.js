import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { savePaymentMethod } from '../actions/cartActions';
import { CheckoutSteps } from '../components/CheckoutSteps'

export const PaymentMethodScreen = () => {
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	if (!shippingAddress.address) {
		navigate('/shipping');
	}
	const [paymentMethod, setPaymentMethod] = useState('PayPal');
	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeholder');
	}
	return (
		<div className='g-0 mt-2 container'>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<form className='w-50 m-auto' onSubmit={submitHandler}>
				<h3 className='mb-3 fw-bold'>Payment Method</h3>
				<div className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name="paymentMethod"
						id="paypal"
						value='PayPal'
						checked required
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					<label className="form-check-label" htmlFor="paypal">
						PayPal
					</label>
				</div>

				<div className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name="paymentMethod"
						id="stripe"
						value='Stripe'
						required
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					<label className="form-check-label" htmlFor="stripe">
						Stripe
					</label>
				</div>
				<button type="submit" className="btn btn-warning w-100 mt-2">Continue</button>
			</form>
		</div>
	)
}
