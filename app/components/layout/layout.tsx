import { IconContext } from 'phosphor-react';

import { Header } from './header';
import { Footer } from './footer';

interface LayoutProps extends React.PropsWithChildren {
	
}
 
function Layout({ children }: LayoutProps) {
	
	return (
		<IconContext.Provider
			value={{
				size: "1rem",
				weight: "fill",
				mirrored: false,
			}}
		>
			<Header />
			<main>
				{children}
			</main>
			<Footer />
		</IconContext.Provider>
	);
}

export default Layout
