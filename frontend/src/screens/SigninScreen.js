import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';

export const SigninScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const { search } = useLocation();
	const redirectInUrl = new URLSearchParams(search).get('redirect');
	const redirect = redirectInUrl ? redirectInUrl : '/';

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo, loading, error } = userSignin;

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(signin(email, password));
	}
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	return (
		<div className='mt-5'>
			<form className='w-50 m-auto' onSubmit={submitHandler}>
				<h3 className='mb-3'>Sign In</h3>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant='danger'>{error}</MessageBox>}

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
					<Link to={`/register?redirect=${redirect}`} className='text-decoration-none'>Create your account</Link>
				</div>
			</form>
		</div>
	)
}
