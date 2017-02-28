var React = require('react');
var users = require('./../utils/userHelpers').data;
var Profile = require('./../components/Profile');


var ProfileList = React.createClass({
    getInitialState: function () {
        return {
            usersInfo: []
        }
    },
    componentDidMount: function(){
        this.setState({
            usersInfo: users
        });
    },
  render: function () {
        console.log(this.state.usersInfo);
    return (
        <div>
        {
            this.state.usersInfo.map(function(user){
                return <Profile key={user.id} usersInfo={user} />
            })
        }
        </div>
    )
  }
});

module.exports = ProfileList;
