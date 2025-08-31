import { HeaderMetaInfoProvider } from './HeaderMetaInfoProvider'
import { PageScrollInfoProvider } from './PageScrollInfoProvider'
import { ThemeProvider } from './ThemeProvider'
import { ViewportProvider } from './ViewportProvider'
import { CookiesNoticeProvider } from './CookiesNoticeProvider'

export function Provider(props: {
  pathName: string
  title?: string
  description?: string
  slug?: string
}) {
  return (
    <>
      <HeaderMetaInfoProvider {...props} />
      <PageScrollInfoProvider />
      <ThemeProvider />
      <ViewportProvider />
      <CookiesNoticeProvider />
    </>
  )
}
