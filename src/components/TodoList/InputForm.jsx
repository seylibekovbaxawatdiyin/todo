import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodos, removeTodos } from '../../redux/TodoSlice'
import ErrMsg from '../../msg/ErrMsg'
import SuccesMsg from '../../msg/SuccessMsg'
import TodoList from './TodoList'
import { motion } from 'framer-motion'
import axios from 'axios'

const InputForm = () => {
	const dispatch = useDispatch()
	const todosItem = useSelector(state => state.todos.todosList)
	const [todoValue, setTodoValue] = useState('')
	const [errMsg, setErrMsg] = useState('')
	const [category, setCategory] = useState('')
	const [successMsg, setSuccessMsg] = useState('')
	const [showErr, setShowErr] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)
	const [showRemove, setShowRemove] = useState(false)
	const [allTasks, setAllTasks] = useState([])
	let formData = new FormData()

	const handleTodo = e => {
		e.preventDefault()
		if (todoValue === '') {
			setErrMsg('Please write your todo!')
			setShowErr(true)
			setShowSuccess(false)
		} else if (category === '') {
			setErrMsg('Select a category!')
			setShowErr(true)
			setShowSuccess(false)
		} else if (category === 'categories') {
			setErrMsg('Select a valid category')
			setShowErr(true)
			setShowSuccess(false)
		} else {
			dispatch(
				addTodos({
					_id: Math.random(),
					todo: todoValue,
					category: category,
				})
			)
			setTodoValue('')
			setShowSuccess(true)
			setShowErr(false)
			setSuccessMsg('Todo added successfully')
		}
	}

	useEffect(() => {
		axios
			.get('http://todo.paydali.uz/api/tasks')
			.then(res => {
				setAllTasks(res.data.payload)
				console.log(res.data.payload)
			})
			.catch(err => console.log(err))

		const timer = setTimeout(() => {
			showErr && setShowErr(false)
			showSuccess && setShowSuccess(false)
		}, 2000)
		return () => clearTimeout(timer)
	}, [showErr, showSuccess])

	return (
		<div className='w-full bg-blue-900 flex flex-col gap-5 p-6'>
			<div className='flex flex-col mdl:flex-row items-center gap-4 mdl:h-12'>
				<input
					onChange={e => setTodoValue(e.target.value)}
					value={todoValue}
					className='w-full mdl:w-[80%] h-12 mdl:h-full bg-blue-900 border-[1px] border-gray-400 px-4 py-2 placeholder:text-gray-400 text-white text-base placeholder:text-sm tracking-wide rounded-md outline-none
					focus-visible:border-orange-600 hover:border-white'
					type='text'
					placeholder='Enter your Todo...'
				/>

				<div className='w-full mdl:w-[20%] h-12 mdl:h-full relative'>
					<select
						onChange={e => setCategory(e.target.value)}
						className='w-[200px] h-[50px] text-center capitalize outline-none bg-blue-900 border-[1px] border-gray-400 px-1 cursor-pointer appearance-none rounded-md focus-visible:border-orange-600 hover:border-white text-white'
					>
						Category
					</select>
					<span className=' text-black cursor-pointer'>
						<i className='bx bx-chevron-down'></i>
					</span>
				</div>
			</div>
			<button
				onClick={handleTodo}
				className='w-full border-[1px] border-gray-400 hover:border-gray-200 duration-300 font-titleFont font-semibold tracking-wider text-gray-300 hover:text-orange-600 h-10 uppercase rounded-md'
			>
				Add Todo
			</button>
			<div className='flex flex-col gap-4'>
				<ul className='grid grid-cols-1 gap-4 border border-gray-400 drop-shadow-lg mt-6 p-4'>
					{todosItem.length > 0 ? (
						<>
							{''}
							{todosItem.map(item => (
								<TodoList key={item._id} todo={item.todo} _id={item._id} />
							))}
						</>
					) : (
						<p className='text-center text-base text-yellow-300 font-titleFont font-medium tracking-wide'>
							Your todo list is Empty!
						</p>
					)}
				</ul>
				{todosItem.length > 0 && (
					<motion.button
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						onClick={() => setShowRemove(true)}
						className='w-40 h-8 text-sm font-titleFont font-semibold mx-auto text-orange-600 bg-transparent border-[1px] border-gray-500 hover:text-red-500 hover:border-red-500 duration-300'
					>
						Remove todos
					</motion.button>
				)}
			</div>
			{showErr && <ErrMsg errMsg={errMsg} />}

			{showSuccess && <SuccesMsg succesMsg={successMsg} />}

			{showRemove && (
				<div className='w-full h-screen fixed bg-blue-900 top-0 left-0 bg-opacity-60'>
					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 bg-blue-900 border border-red-500 rounded-md z-50 flex  flex-col shadow-md'>
						<p className='text-xl text-center font-medium text=red-500 p-4'>
							Are you sure tp{' '}
							<span className='font-semibold underline underline-offset-2 decoration-[2px]'>
								remove
							</span>{' '}
							all the todos?
						</p>
						<div className='flex item-center gap-4 justify-center'>
							<button
								onClick={() => dispatch(removeTodos()) & setShowRemove(false)}
								className='px-6 py-2 text-base font-titleFont  text-orange-600 hover:text-red-600 font-semibold bg-transparent border-[1px] border-gray-400 hover:border-red-500 duration-300'
							>
								Yes
							</button>
							<button
								onClick={() => setShowRemove(false)}
								className='px-6 py-2 text-base font-titleFont  text-orange-600 hover:text-green-600 font-semibold bg-transparent border-[1px] border-gray-400 hover:border-green-500 duration-300'
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
export default InputForm
