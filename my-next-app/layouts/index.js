import React from "react"
import Link from "next/link"
import { Nav, PageBody } from "../styles/styles"
import { Global, css } from "@emotion/core"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }
          a {
            text-decoration: none;
          }
        `}
      />
      <Nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/new">
          <a>New</a>
        </Link>
      </Nav>
      <PageBody>{children}</PageBody>
    </React.Fragment>
  )
}

export default Layout
