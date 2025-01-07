import { FC, Suspense } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { layouts } from '../layouts'
import { pages } from '../pages'
import { LayoutType } from '../types/routing'

interface PageWrapperProps {
  defaultLayout: LayoutType
}

export const PageWrapper: FC<PageWrapperProps> = ({ defaultLayout }) => {
  const params = useParams<{ lang: string; page: string }>()
  const { lang, page } = params
  const layout = defaultLayout
  
  console.log('PageWrapper params:', { lang, layout, page })
  
  // Sprawdzamy czy mamy wszystkie wymagane parametry
  if (!lang || !page) {
    console.log('Missing required params:', { lang, layout, page })
    return <Navigate to="/pl/public/home" replace />
  }

  // Sprawdzamy czy layout istnieje
  if (!(layout in layouts)) {
    console.log('Layout not found:', layout)
    return <Navigate to="/pl/public/home" replace />
  }

  const Layout = layouts[layout]
  const pageComponents = pages[layout]
  
  // Sprawdzamy czy strona istnieje w danym layoucie
  if (!pageComponents || !(page in pageComponents)) {
    console.log('Page not found:', page)
    return <Navigate to="/pl/public/home" replace />
  }

  const Page = pageComponents[page]

  return (
    <Layout>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      }>
        <Page />
      </Suspense>
    </Layout>
  )
}