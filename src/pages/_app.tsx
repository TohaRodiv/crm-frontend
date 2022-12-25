import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, } from 'react';
import NProgress from 'nprogress';
import { NextPage } from 'next';
import { AppTemplate } from '#templates/app';
import '#styles/style.scss';
import { accountRepo } from '#repositories/endpoints';
import remainsStore from '#stores/remains-store';
import { ConfigProvider } from 'antd';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {

	const router = useRouter();

	useEffect(() => {

		const handleStart = () => {
			NProgress.start();
		};

		const handleStop = () => {
			NProgress.done();
		};

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleStop);
		router.events.on('routeChangeError', handleStop);

		(async () => {
			const remains = await accountRepo.getRamains();
			remainsStore.setRemains(remains);
		})();

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleStop);
			router.events.off('routeChangeError', handleStop);
		};

	}, []);

	const pageLayout = (page: ReactElement) => page;
	// eslint-disable-next-line react/no-children-prop
	const appTemplate = ((page: ReactElement) => <AppTemplate children={page} />);
	const getLayout = Component.getLayout ? pageLayout : appTemplate;

	return (
		<ConfigProvider>
			{getLayout(<Component {...pageProps} />)}
		</ConfigProvider>
	);
}

export default App;