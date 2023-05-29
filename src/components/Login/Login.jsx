import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchedLogin } from '../../store/reducer/login.slice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const state = useSelector(store => store.login)
	const dispatch = useDispatch()
	const [userLogin, setUserLogin] = useState({
		phone: '',
		password: '',
	})
	const navigate = useNavigate()

	useEffect(() => {
		axios
			.get('http://todo.paydali.uz/api/getMe', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => console.log(res))
			.catch(err => {
				navigate('/login', { replace: true })
			})

		if (state.token) {
			navigate('/', { replace: true })
		}
	}, [localStorage.getItem('token')])

	const LoginFunc = () => {
		axios
			.post('http://todo.paydali.uz/public/api/login', userLogin)
			.then(res => {
				localStorage.setItem('token', res.data.payload.token),
					navigate('/', { replace: true })
				console.log(res)
			})
	}

	return (
		<div className='auth-container'>
			<div className='login'>
				<h1>Login</h1>
				<input
					type='phone'
					value={userLogin.phone}
					onChange={e => setUserLogin({ ...userLogin, phone: e.target.value })}
					required
					placeholder='Enter Phone'
				/>
				<input
					type='password'
					value={userLogin.password}
					onChange={e =>
						setUserLogin({ ...userLogin, password: e.target.value })
					}
					required
					placeholder='Enter Password'
				/>
				<button onClick={LoginFunc}>Submit</button>
			</div>
		</div>
	)
}

export default Login
