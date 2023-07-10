import type { PageProps } from '../../pages'

import React from 'react'

import './generic.css'

interface Props extends PageProps {
    noTitle?: boolean
}

export const GenericPageWrapper = ({ children, page, noTitle = false }: Props) =>
  <div className="dans-wrapper__generic-page-wrapper">
    {
      !noTitle &&
      <h2>
          {page.title}
      </h2>
    }
    {children}
  </div>