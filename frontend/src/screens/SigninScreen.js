import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';

export const SigninScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// const { search } = useLocation();
	// const redirectInUrl = new URLSearchParams(search).get('redirect');
	// const redirect = redirectInUrl ? redirectInUrl : '/';


	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(signin(email, password));
	}


	return (
		<div className='container mt-5 '>
			<form className='w-50 m-auto' onSubmit={submitHandler}>
				<h3>Sign In</h3>
				<div className="my-4">
					<label htmlFor="email" className="form-label">Email address</label>
					<input type="email" className="form-control" id="email" placeholder='Enter Email' required
						onChange={e => setEmail(e.target.value)} />
				</div>
				<div className="my-4">
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password" className="form-control" id="password" placeholder='Enter Password' required
						onChange={e => setPassword(e.target.value)} />
				</div>
				<button type="submit" className="btn btn-warning w-100">Sign In</button>
				<div className='mt-3'>
					New Customer? {' '}
					<Link to='/register' className='text-decoration-none'>Create your account</Link>
				</div>
			</form>
		</div>
	)
}
