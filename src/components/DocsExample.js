import PropTypes from 'prop-types'
import React from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCode, cilMediaPlay } from '@coreui/icons'

const url = window.location.href;
const flag = url.substring(url.lastIndexOf('/') + 1);

const DocsExample = (props) => {
  const { children, href } = props

  return (
    <div className="example">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink href={"/#/posts/all"} active={flag === 'all' ? true : false}>
            Published
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href={"/#/posts/all/draft"} active={flag === 'draft' ? true : false}>
            Drafts
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href={"/#/posts/all/trash"} active={flag === 'trash' ? true : false}>
            Trashed
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent className="rounded-bottom">
        <CTabPane className="p-3 preview" visible>
          {children}
        </CTabPane>
      </CTabContent>
    </div>
  )
}

DocsExample.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
}

export default React.memo(DocsExample)
