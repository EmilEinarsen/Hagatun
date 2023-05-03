import {Header} from './header'
import {Footer} from './footer'

type LayoutProps = React.PropsWithChildren

function Layout({children}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow pt-16">{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
