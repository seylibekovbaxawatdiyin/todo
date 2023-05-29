import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetched } from '../../store/reducer/register.slice'
import { useNavigate } from 'react-router-dom'
import './Register.scss'

const Register = () => {
	const state = useSelector(store => store.register)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [user, setUser] = useState({
		name: '',
		phone: '',
		password: '',
	})

	const registerFunc = () => {
		axios.post('http://todo.paydali.uz/api/register', user).then(res => {
			navigate('/login', { replace: true })
		})
	}

	return (
		<div className='auth-container'>
			<div className='register bg-slate-600 flex flex-col '>
				<h1>Register</h1>
				<input
					type='text'
					value={user.name}
					onChange={e => setUser({ ...user, name: e.target.value })}
					required
					placeholder='Enter Name'
				/>
				<input
					type='phone'
					value={user.phone}
					onChange={e => setUser({ ...user, phone: e.target.value })}
					required
					placeholder='Enter Phone'
				/>
				<input
					type='password'
					value={user.password}
					onChange={e => setUser({ ...user, password: e.target.value })}
					required
					placeholder='Enter Password'
				/>
				<button onClick={registerFunc}>Submit</button>
			</div>
		</div>
	)
}

export default Register
