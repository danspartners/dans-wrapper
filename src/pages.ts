export interface Page extends Required<PageConfig> {
  path: string[]
}

export interface PageProps {
    children?: React.ReactNode
    page: Page
}

export interface PageConfig {
  id: string
  Component: (props: PageProps) => JSX.Element

  inMenu?: boolean

  // The path to the page. A page can have multiple paths.
  // For example, a page with the path `["/about", "/about-us"]` will be
  // accessible at both `/about` and `/about-us`.
  // If no path is given, the page will be accessible at `/${page.id}/*`.
  path?: string | string[] 

  // If no title is given, the page title will be the page id capitalised.
  title?: string
}