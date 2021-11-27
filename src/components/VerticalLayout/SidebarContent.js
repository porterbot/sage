import PropTypes from 'prop-types'
import React, { useEffect } from "react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show")

        const parent3 = parent2.parentElement

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement
          if (parent4) {
            parent4.classList.add("mm-active")
          }
        }
      }
      return false
    }
    return false
  }

  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title">{props.t("Menu")} </li>
	 
	            <li>
	              <Link to="/dashboard" className=" waves-effect">
	                <i className="mdi mdi-desktop-mac-dashboard"></i>
	                <span>{props.t("Dashboard")}</span>
	              </Link>
	            </li>


                    <li>
	                        <Link to="/resources" className=" waves-effect">
	                          <i className="bx bx-archive"></i>
	                          <span>{props.t("Resources")}</span>
	                        </Link>
	                      </li>

          <li>
            <Link to="/calendar" className=" waves-effect">
              <i className="bx bx-calendar"></i>
              <span>{props.t("Planting Calendar")}</span>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any
}

export default withRouter(withTranslation()(SidebarContent))
