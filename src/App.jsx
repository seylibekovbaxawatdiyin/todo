import React from 'react'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'

const App = () => {
	return (
		<div>
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</div>
	)
}

export default App
