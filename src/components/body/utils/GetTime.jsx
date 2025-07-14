// GetTime.jsx
const getTime = async (rounderLat, rounderLon) => {
	try {
		const response = await fetch(
			`https://api.api-ninjas.com/v1/worldtime?lat=${rounderLat}&lon=${rounderLon}`,
			{
				headers: {
					'X-Api-Key': `${import.meta.env.VITE_API_KEY}`,
				},
			}
		)
		const data = await response.json()
		const datetime = new Date(data.datetime)

		// Обновляем время и дату в DOM
		const formattedTime = datetime.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
		})
		const formattedDate = datetime.toLocaleDateString('ru-RU', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})

		// Находим элементы DOM и обновляем их содержимое
		const timeDOM = document.querySelector('.day__info-time')
		const dateDOM = document.querySelector('.day__info-date')

		if (timeDOM) {
			timeDOM.textContent = formattedTime
		}
		if (dateDOM) {
			dateDOM.textContent = formattedDate
		}
		return formattedTime
	} catch (error) {
		throw Error('Ошибка при получении времени:', error)
	}
}

export default getTime
