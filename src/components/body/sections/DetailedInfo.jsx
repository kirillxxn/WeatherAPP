import { CloudyIcon, Moon, Sun, SunAndCloud } from '../utils/TempState'

const DetailedInfo = ({ detailedWeatherStates }) => {
	return (
		<section className='section__detailed-info'>
			{Object.keys(detailedWeatherStates).map(id => {
				const hourStr = id.replace('text', '')
				const formattedHour = hourStr.padStart(2, '0') // Добавляем ведущий ноль, если необходимо

				return (
					<article className='detailed-info' key={id}>
						{formattedHour}:00
						<p className='detailed__info-text' id={`${id}_temp`}>
							{detailedWeatherStates[id].temperature}°C
						</p>
						<p className='detailed__info-weather' id={`${id}_weather`}>
							{detailedWeatherStates[id].icon}
						</p>
					</article>
				)
			})}
		</section>
	)
}

export default DetailedInfo
