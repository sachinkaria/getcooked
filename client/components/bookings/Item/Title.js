/**
 * Created by sachinkaria on 24/07/2018.
 */
import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

const Title = props => (
  <h1 className="gc-section-heading-sm gc-margin-none">
    {_.capitalize(props.name)}&#39;s event on {moment(props.date).format('MMMM Do YYYY')}
  </h1>
);


Title.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default Title;
