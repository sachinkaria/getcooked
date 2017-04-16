import React from 'react';
import getUsers from './../utils/users';
import ProfileSummary from './../components/ProfileSummary';
import { Col, Row } from 'react-bootstrap';
import SearchBar from './SearchBar';


export default class ProfileList extends React.Component {
    constructor () {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        getUsers().then((resp) => {
            this.setState ({
                users: resp.data
            })
        })
    }

  render () {
    return (
        <div>
            <Row>
                <Col sm={6} smOffset={1} className="gc-margin-bottom">
                    <SearchBar/>
                </Col>
            </Row>
            <Row>
                    <Col xs={10} xsOffset={1} className="gc-padding-none">
                        {
                            this.state.users.map(function(user){
                                return (
                                    <ProfileSummary
                                        id={user.id}
                                        key={user.id}
                                        imageUrl={user.imageUrl}
                                        name={user.name}
                                        rating={user.rating}
                                        endorsements={user.endorsements}
                                        numberOfRatings={user.numberOfRatings}
                                        />
                                )
                            })
                        }
                    </Col>
            </Row>
        </div>
        )
    }
}
