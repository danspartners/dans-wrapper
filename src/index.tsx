import type { Page, PageConfig } from './pages'
export type { PageConfig, Page } from './pages'

import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import Skeleton from '@mui/material/Skeleton'
import styled from "@emotion/styled"

import LanguageBar from './layout/LanguageBar'
import MenuBar from './layout/MenuBar'
import Footer from './layout/Footer'

import { theme } from './theme'

export { GenericPageWrapper } from './layout/pages/generic'

const Wrapper = styled.div`
	display: grid;
	grid-template-rows: auto auto 1fr auto auto;
	min-height: 100vh;
	max-width: 100%;
	width: 100vw;
`

interface Props {
	pages: PageConfig[]
}
export function DansWrapper(props: Props) {
	const pages = extendPages(props.pages)
	if (pages == null) return null

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Wrapper>
					<Suspense fallback={<Skeleton width={200} height={30} />}>
						<LanguageBar />
					</Suspense>
					<MenuBar pages={pages} />
					<Container>
						<Routes>
						{
							// Map over the page to create a route for each page
							pages.map(page =>
								// Map over the page paths (a page can have multiple paths)
								// For example Home: ['/', '/home']
								page.path.map(path =>
									<Route
										key={page.id}
										path={path}
										element={<page.Component page={page} />}
									/>
							    )	
							)
						}
						</Routes>
					</Container>
					<Footer />
				</Wrapper>
			</BrowserRouter>
			{/* <NotificationList /> */}
		</ThemeProvider>
	)
}

function extendPages(pages: PageConfig[]): Page[] | undefined {
	const [extendedPages, setExtendedPages] = React.useState<Page[] | undefined>(undefined)

	React.useEffect(() => {
		setExtendedPages(pages.map(page => {
			const { path, ...rest } = page

			const extendedPage: Page = {
				inMenu: true,	
				path: [`/${page.id}/*`],
				title: page.id.charAt(0).toUpperCase() + page.id.slice(1),
				...rest
			}

			if (path != null) {
				extendedPage.path = Array.isArray(path)
					? path
					: [path]
			}

			return extendedPage
		}))
	}, [pages])

	return extendedPages
}
		// Component: React.lazy(() => import(`./pages/${page.id}`))
