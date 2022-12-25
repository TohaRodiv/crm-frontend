import { IEndpointRepository } from '#types/IEndpointRepository';
import { TSchemaKeyFormat } from '#types/TSchema';
import { ReactNode } from 'react';
import { ManyToMany } from './many-to-many';
import { ManyToOne } from './many-to-one';
import { OneToMany } from './one-to-many';

export const createRelation = (format: TSchemaKeyFormat, repo: IEndpointRepository<any>, renderLabel?: (item: any) => string | ReactNode) => {
	switch (format) {
		case 'many-to-one':
			return <ManyToOne repo={repo} renderLabel={renderLabel} />;

		case 'many-to-many':
			return <ManyToMany repo={repo} renderLabel={renderLabel} />;

		case 'one-to-many':
			return <OneToMany repo={repo} renderLabel={renderLabel} />;

		default:
			return 'Не удалось определить тип связи!';
	}
};