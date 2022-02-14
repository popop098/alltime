import "../styles/globals.css";
import { SessionProvider } from "next-auth/react"
import {ThemeProvider} from 'next-themes'
import '@fortawesome/fontawesome-svg-core/styles.css'
export default function App({
                              Component,
                              pageProps: { session, ...pageProps },
                            }) {
  return (
      <SessionProvider session={session}>
          <ThemeProvider defaultTheme="system">
            <Component {...pageProps} />
          </ThemeProvider>
      </SessionProvider>
  )
}
