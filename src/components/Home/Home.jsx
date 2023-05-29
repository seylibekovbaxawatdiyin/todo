import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputForm from '../TodoList/InputForm'

const Home = () => {
	const navigate = useNavigate()
	useEffect(() => {
		if (localStorage.getItem('token')) {
			axios
				.get('http://todo.paydali.uz/api/getMe', {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				})
				.then(res => console.log(res))
		} else if (!localStorage.getItem('token')) {
			navigate('/login', { replace: true })
		}
	}, [])

	return (
		<div>
			<InputForm />
		</div>
	)
}

export default Home
