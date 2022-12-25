import { ColumnType } from 'antd/es/table';
import { ReactNode } from 'react';
import { IEndpointRepository } from './IEndpointRepository';

export type TSchemaKeyType = 'primary-key' | 'string' | 'textarea' | 'number' | 'boolean' | 'date' | 'relation' | 'date-time'
export type TRelationFormat = 'many-to-one' | 'many-to-many' | 'one-to-many'
export type TSchemaKeyFormat = 'currency' | 'switch' | TRelationFormat

export type TKeySchema = {
	title: string
	type: TSchemaKeyType
	format?: TSchemaKeyFormat
	required?: true
	defaultValue?: string | number | boolean
	display?: false
	edit?: boolean
	repo?: IEndpointRepository<any>
	schema?: TSchema<any>
	referenceField?: string
	hidden?: true
	renderLabel?: (item: any) => ReactNode
}

export type TSchema<TEntity> = {
	[key: string]: TKeySchema & ColumnType<TEntity>
}