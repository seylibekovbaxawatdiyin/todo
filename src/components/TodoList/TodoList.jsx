import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'

const TodoList = ({ todo, _id }) => {
	const dispatch = useDispatch()
	const [mark, setMark] = useState(false)
	return (
		<div>
			<motion.li
				initial={{ y: 10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					y: { type: 'spring', stiffness: 120 },
				}}
				onClick={() => setMark(!mark)}
				className={`${
					mark
						? 'border-l-orange-500 border-oragne-900'
						: 'border-l-green-500 border-green-900'
				} w-full flex justify-between items-center font-titleFont font-medium text-base border-[2px] border-l-[10px] px-2 py-1 cursor-pointer border-green-700 `}
			>
				{todo}
				<span
					onClick={() => dispatch(deleteTodos(_id))}
					className=' hover:text-red-400 duration-300 cursor-pointer'
				>
					<i className='bx bxs-trash-alt'></i>
				</span>
			</motion.li>
		</div>
	)
}
export default TodoList
