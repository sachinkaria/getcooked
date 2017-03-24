import React from 'react';
import getUsers from './../utils/users';
import ProfileSummary from './../components/ProfileSummary';
import { Col, Row } from 'react-bootstrap';
import SearchBar from './SearchBar';



let ProfileList = React.createClass({
    getInitialState: function () {
        return {
            usersInfo: []
        }
    },
    componentWillMount: function(){
        console.log(getUsers);
        this.setState({
            usersInfo: getUsers
        });
    },
  render: function () {
    return (
        <div>
            <Row>
                <SearchBar/>
            </Row>
            <Row>
                <Col xs={8} xsOffset={2}>
                    {
                        this.state.usersInfo.map(function(user){
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
});

export default ProfileList;
