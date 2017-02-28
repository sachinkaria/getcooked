var React = require('react');
var userHelpers = require('../helpers/userHelpers').data;
var Profile = require('./../components/Profile');


var Main = React.createClass({
    getInitialState: function () {
        return {
            usersInfo: []
        }
    },
    componentDidMount: function(){
        this.setState({
            usersInfo: userHelpers
        });
    },
  render: function () {
        console.log(this.state.usersInfo);
    return (
        <div>
        {
            this.state.usersInfo.map(function(user){
                return <Profile usersInfo={user} />
            })
        }
        </div>
    )
  }
});

module.exports = Main;
