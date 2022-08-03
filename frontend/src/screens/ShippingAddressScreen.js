import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { saveShippingAddress } from '../actions/cartActions';
import { CheckoutSteps } from '../components/CheckoutSteps'

export const ShippingAddressScreen = () => {
	const navigate = useNavigate();
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	if (!userInfo) {
		// props.history.push('/signin');
		navigate('/signin');
	}
	const [fullName, setFullName] = useState(shippingAddress.fullName);
	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }));
		navigate('/payment');
		//TODO: dispatch save shippting address action
	}
	return (
		<div className='g-0 mt-2'>
			<CheckoutSteps step1 step2></CheckoutSteps>
			<form className='w-50 m-auto' onSubmit={submitHandler}>
				<h3 className='mb-3 fw-bold'>Shipping Address</h3>
				<div className="mb-2">
					<label htmlFor="fullname" className="form-label">Full Name</label>
					<input
						type="text"
						className="form-control"
						id="fullname"
						placeholder="Enter Full Name"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						required
					/>
				</div>


				<div className="mb-2">
					<label htmlFor="address" className="form-label">Address</label>
					<input
						type="text"
						className="form-control"
						id="address"
						placeholder="Enter Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</div>

				<div className="mb-2">
					<label htmlFor="city" className="form-label">City</label>
					<input
						type="text"
						className="form-control"
						id="city"
						placeholder="Enter City"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					/>
				</div>

				<div className="mb-2">
					<label htmlFor="postalcode" className="form-label">Postal code</label>
					<input
						type="text"
						className="form-control"
						id="postalcode"
						placeholder="Enter Postal Code"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="country" className="form-label">Country</label>
					<input
						type="text"
						className="form-control"
						id="country"
						placeholder="Enter Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						required
					/>
				</div>
				<label />
				<button type="submit" className="btn btn-warning w-100">Continue</button>

			</form>
		</div>
	)
}
