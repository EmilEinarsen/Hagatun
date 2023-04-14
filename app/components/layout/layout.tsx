import { IconContext } from '@phosphor-icons/react';

import { Header } from './header';
import { Footer } from './footer';

interface LayoutProps extends React.PropsWithChildren {
	
}
 
function Layout({ children }: LayoutProps) {
	
	return (
		<IconContext.Provider
			value={{
				size: "1rem",
				weight: 'light',
				mirrored: false,
			}}
		>
      <div className="flex flex-col min-h-screen overflow-hidden">

        <Header />
        
        <main className="flex-grow pt-16">
          {children}
        </main>
        
        <Footer />

      </div>
		</IconContext.Provider>
	);
}

export default Layout
