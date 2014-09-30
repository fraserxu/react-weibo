/** @jsx React.DOM */
'use strict';

var React = require('react');

require('../css/profile.css');

module.exports = React.createClass({
  render: function() {
    return (
      <div className='profile'>
        <figure className='profile-avatar'>
          <span className='avatar-container'>
            <img src={this.props.profile.avatar_large} alt={this.props.profile.screen_name} />
          </span>
        </figure>

        <div className='profile-body'>
          <h2 className='heading'>
            <a href={'http://weibo.com/' + this.props.profile.profile_url}>@{this.props.profile.screen_name}</a>
          </h2>

          <p className='profile-name'>{this.props.profile.name}</p>

          <p className='profile-deets'>
            Posts <span>{this.props.profile.statuses_count}</span>
            Following <span>{this.props.profile.friends_count}</span>
            Followers <span>{this.props.profile.followers_count}</span>
          </p>

          <div className='profile-bio'>
            <p>{this.props.profile.description}</p>
            <p className='profile-links'>
              <a href={this.props.profile.url}>{this.props.profile.url}</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
});


