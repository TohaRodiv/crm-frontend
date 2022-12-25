import { FC } from 'react';
import classNames from 'classnames';
import styles from './style.module.scss';

type TProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
	mode?: 'dark' | 'light'
};

const Logo: FC<TProps> = ({
	className,
	mode,
	...props
}) => {
	return (
		<span
			className={classNames(styles.logo, styles[`logo--${mode}`], className)}
			{...props}>
			Electronly
		</span>
	);
};

Logo.defaultProps = {
	mode: 'light',
};

export {
	Logo
};