import { Moment } from 'moment';

export type TAccount = {
	id: number
	recivied_at: Date|Moment|string
	title: string
	sum: number
}

export type TAccountBasicParameters = {
	expenses: number
	incomes: number
	remains: number
}