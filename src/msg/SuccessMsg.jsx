import React from 'react'
import { motion, spring } from 'framer-motion'
import { ImSpinner, ImSpinner9 } from 'react-icons/im'

const SuccesMsg = ({ successMsg }) => {
	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ y: { type: 'spring', stiffness: 120 } }}
			className={`border-b-green-400 text-green-500 absolute shadow-todoShodow font-titleFont tracking-wide font-medium text-lg bottom-10 left-[40%] bg-blue-900 px-10 py-4 rounded-sm border-b-[6px]`}
		>
			<p className='flex items-centergap-4'>
				<span className='text-xl animate-spin'>
					<ImSpinner9 />
				</span>
				{successMsg}
			</p>
			Success message
		</motion.div>
	)
}
export default SuccesMsg
