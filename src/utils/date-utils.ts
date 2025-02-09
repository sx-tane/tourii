class DateUtils {
	/**
	 * Formats a Date object into a string of format "2 Feb 2023".
	 * @param {Date} date - The date to format.
	 * @returns {string} - The formatted date string.
	 */
	static formatDate(date: Date) {
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		const day = date.getDate();
		const monthIndex = date.getMonth();
		const year = date.getFullYear();

		return `${day} ${months[monthIndex]} ${year}`;
	}
}

export default DateUtils;
