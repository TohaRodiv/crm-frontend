export class DateFormatter {
	public static format(date: string | number | Date, options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}) {
		return new Date(date).toLocaleString('ru', options);
	}
}