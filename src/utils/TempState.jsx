import '/src/assets/styles/icons.css'
export const CloudyIcon = () => {
	return (
		<>
			<img
				className='cloud-icon'
				src='/src/assets/icons/statecloud.png'
				alt='Изображение облака, если погода облачная'
			></img>
		</>
	)
}
export const Sun = () => {
	return (
		<>
			<img
				className='sun-icon'
				src='/src/assets/icons/statesun.png'
				alt='Изображение солнца, если погода солнечная'
			></img>
		</>
	)
}
export const Moon = () => {
	return (
		<>
			<img
				className='moon-icon'
				src='/src/assets/icons/statemoon.png'
				alt='Изображение луны, если на улице вечер или ночь'
			></img>
		</>
	)
}
export const SunAndCloud = () => {
	return (
		<>
			<img
				className='mooncloud-icon'
				src='/src/assets/icons//statemooncloud.png'
				alt='Изображение солнца за луной, если погода малооблачная'
			></img>
		</>
	)
}
