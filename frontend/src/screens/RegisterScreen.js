import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';

export const RegisterScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	const { search } = useLocation();
	const redirectInUrl = new URLSearchParams(search).get('redirect');
	const redirect = redirectInUrl ? redirectInUrl : '/';

	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo, loading, error } = userRegister;

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Password and confirm password are not match')
		}
		else {
			dispatch(register(name, email, password));
		}
	};
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	return (
		<div className='container mt-5 '>
			<form className='w-50 m-auto' onSubmit={submitHandler}>
				<h3 className='mb-3'>Register</h3>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant='danger'>{error}</MessageBox>}

				<div className="my-4">
					<label htmlFor="name" className="form-label">Name</label>
					<input type="text" className="form-control" id="name" placeholder='Enter Name' required
						onChange={e => setName(e.target.value)} />
				</div>
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
				<div className="my-4">
					<label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
					<input type="password" className="form-control" id="confirmPassword" placeholder='Enter Confirm Password' required
						onChange={e => setConfirmPassword(e.target.value)} />
				</div>
				<button type="submit" className="btn btn-warning w-100">Register</button>

				<div className='mt-3'>
					Already have an account? {' '}
					<Link to='/signin' className='text-decoration-none'>Sign-In</Link>
				</div>
			</form>
		</div>
	)
}
