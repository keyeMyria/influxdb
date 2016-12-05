import React, {PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import _ from 'lodash';

export default React.createClass({
  displayName: 'LineGraph',
  propTypes: {
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    title: PropTypes.string,
    isFetchingInitially: PropTypes.bool,
  },


  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },

  render() {
    const {data} = this.props;

    // If data for this graph is being fetched for the first time, show a graph-wide spinner.
    if (this.props.isFetchingInitially) {
      return (
        <div className="graph-panel__graph-fetching">
          <h3 className="graph-panel__spinner" />
        </div>
      );
    }

    const values = _.get(data, ['0', 'response', 'results', '0', 'series', '0', 'values'], [['', '']]);
    const lastValue = values[values.length - 1][1];

    const precision = 100.0;
    const roundedValue = Math.round(+lastValue * precision) / precision;

    return (
      <div className="single-stat">
        {roundedValue}
      </div>
    );
  },
});
