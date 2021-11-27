import PropTypes from 'prop-types'
import React from "react"
import { Link } from "react-router-dom"
import { map } from "lodash"
import {
  Badge,
  Card,
  CardBody,
  Col,
  Media,
  UncontrolledTooltip,
} from "reactstrap"
import images from "assets/images"
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import journal_mushroom from "assets/images/journal_mushroom.jpg"
import companies from "assets/images/companies"

const CardNote = ({ journal }) => {
  return (
    <React.Fragment>

      {map(journal, (note, key) => (
        <Col xl="4" sm="6" key={"_note_" + key}>
          <Card>
            <CardBody>
              <Media>
                <div className="avatar-md mr-4">
                  {note.images && note.images.length>0 ?
                      (<AmplifyS3Image style={{"--width": "80px"}} imgKey={note.images[0].key} />)
                     : null }
                </div>

                <Media className="overflow-hidden" body>
                  <h5 className="text-truncate font-size-15">
                    <Link
                      to={`/journal/note?id=${note.id}`}
                      className="text-dark"
                    >
                      {note.title}
                    </Link>
                  </h5>
                  <p className="text-muted mb-4">{note.description}</p>
	      
                </Media>
              </Media>
            </CardBody>
            <div className="px-4 py-3 border-top">
              <ul className="list-inline mb-0">
                <li className="list-inline-item mr-3" id="date">
                  <i className="bx bx-calendar mr-1" /> {new Intl.DateTimeFormat('en-GB', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                }).format(new Date(note.date))}
                  <UncontrolledTooltip placement="top" target="date">
                    Date
                  </UncontrolledTooltip>
                </li>
              </ul>
            </div>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
}

CardNote.propTypes = {
  journal: PropTypes.array
}

export default CardNote
