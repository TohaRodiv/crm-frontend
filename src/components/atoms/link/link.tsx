import { FC, PropsWithChildren } from 'react';
import NextLink, { LinkProps } from 'next/link';

type TProps = PropsWithChildren<LinkProps> & {
	className?: string
}

const Link: FC<TProps> = ({
	children,
	className,
	...props
}) => {
	const anchorProps: any = {};

	if (className) {
		anchorProps.className = className;
	}

	return (
		<NextLink {...props}>
			{children}
		</NextLink>
	);
};

export {
	Link
};