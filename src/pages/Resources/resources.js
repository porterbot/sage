import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  Col,
  Button,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Input,
} from "reactstrap"
import { withRouter, Link } from "react-router-dom"
import { map } from "lodash"

import { searchResources } from "store/actions"
import { useMediaQuery } from 'react-responsive'

const Resources = props => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const { resources, onSearchResources } = props
  const [text, setText] = useState("")

  useEffect(() => {
  }, [resources])

  const search = () => {
     onSearchResources(text);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Row>
	      <Col xs="3"/>
              <Col xs="6">

                 <div className="search-box chat-search-box py-4">
                      <div className="position-relative">
                        <Input
	                  value={text}
                          style={{backgroundColor: '#D8ddd3', fontSize: '1.1em'}}
	                  type="text"
                          className="form-control"
                          placeholder="Search Resources"
	                  onChange={event => {
			       setText(event.target.value);
			  }}
	                  onKeyDown={event => {
                               if (event.key === 'Enter') {
                                   search()
                               }
                            }}
                        />
                        <i className="bx bx-search-alt search-icon bx-4" />
                      </div>
                    </div>

              </Col>
	      <Col xs="3"/>
          </Row>
	  {resources.length>0 ? 
  <Row>
             {isMobile && <Col xs="3"><h4 style={{textAlign: "center",fontSize: '1.9vw'}}>Name</h4></Col>}
                {isMobile &&  <Col xs="1"><h4 style={{textAlign: "center",fontSize: '1.9vw'}}>Type</h4></Col>}
                 {isMobile && <Col xs="2"><h4 style={{textAlign: "center",fontSize: '1.9vw'}}>Category</h4></Col>}
                 {isMobile && <Col xs="4"><h4 style={{textAlign: "center",fontSize: '1.9vw'}}>Excerpt</h4></Col>}
                 {isMobile && <Col xs="2"><h4 style={{textAlign: "center",fontSize: '1.9vw'}}>Link</h4></Col>}
             {isDesktop && <Col xs="3"><h4 style={{textAlign: "center",fontSize: '1vw'}}>Name</h4></Col>}
              {isDesktop && <Col xs="1"><h4 style={{textAlign: "center",fontSize: '1vw'}}>Type</h4></Col>}
              {isDesktop && <Col xs="2"><h4 style={{textAlign: "center",fontSize: '1vw'}}>Category</h4></Col>}
              {isDesktop &&  <Col xs="4"><h4 style={{textAlign: "center",fontSize: '1vw'}}>Excerpt</h4></Col>}
              {isDesktop &&  <Col xs="2"><h4 style={{textAlign: "center",fontSize: '1vw'}}>Link</h4></Col>}

             </Row> : ''
	  }
	       {resources.map((searchRes) => { 
		const targetIndex = searchRes.content.toLowerCase().indexOf(text.toLowerCase())
		let startIndex  = targetIndex-100
		if (startIndex<0)
		    startIndex = 0
		let endIndex = targetIndex+text.length+100
		if (endIndex > searchRes.content.length-1) 
		    endIndex = searchRes.content.length-1
		const prePreExcerpt = searchRes.content.substring(startIndex, targetIndex) 
		const pretty = prePreExcerpt.indexOf(" ")
		const preExcerpt = prePreExcerpt.substring(pretty, prePreExcerpt.length)
		const postExcerpt = searchRes.content.substring(targetIndex+text.length, endIndex)
		const targetText = searchRes.content.substring(targetIndex, targetIndex+text.length)
                let searchType = <center><h1><i title="PDF" className="mdi mdi-file-pdf-box" /></h1></center>
                if (searchRes.type=='blog') 
		    searchType =   <center><h1><i title="Blog" className="fab fa-blogger" /></h1></center>
                const contentType = searchType

             if (isMobile) return (<Row>
                <Col xs="3"><span style={{fontSize: '2.3vw'}}>{searchRes.name}</span></Col>
                <Col xs="1">{contentType}</Col>
                <Col xs="2"><span style={{fontSize: '2.3vw'}}><b>Category</b>: {searchRes.category}<br/>
		            <b>Subcategory</b>: {searchRes.subcategory}</span></Col>
		<Col xs="4"><span style={{fontSize: '2.3vw'}}>{preExcerpt}<b>{targetText}</b>{postExcerpt}</span></Col>
	        <Col xs="2"><center><a href={searchRes.link} target="_blank" rel="noopener noreferrer" className="btn btn-warning">Open</a></center>
</Col>
             </Row>

                 )
            if (isDesktop) return (<Row>
                <Col xs="3"><span style={{fontSize: '1.2vw'}}>{searchRes.name}</span></Col>
                <Col xs="1">{contentType}</Col>
                <Col xs="2"><span style={{fontSize: '1.2vw'}}><b>Category</b>: {searchRes.category}<br/>
                            <b>Subcategory</b>: {searchRes.subcategory}</span></Col>
                <Col xs="4"><span style={{fontSize: '1.2vw'}}>{preExcerpt}<b>{targetText}</b>{postExcerpt}</span></Col>
                <Col xs="2"><center><a href={searchRes.link} target="_blank" rel="noopener noreferrer" className="btn btn-warning">Open</a></center>
</Col>
             </Row>

                 )

	       }
	       )}

        </Container>
      </div>
    </React.Fragment>
  )
}

Resources.propTypes = {
  resources: PropTypes.array,
  onSearchResources: PropTypes.func,
}

const mapStateToProps = ({ resources }) => { 
  console.log(resources.resources)
  return {
  resources: resources.resources,
  }
}

const mapDispatchToProps = dispatch => ({
  onSearchResources: (search) => dispatch(searchResources(search)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Resources))
