import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllDestinations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: {}
    };
  }

  static defaultProps = {
    destinations: [],
    onDelete: () => null,
    onEdit: () => null
  };

  renderOrEditdestination = destination => {
    const { editing } = this.state;

    const editData = editing[destination.id];
    const isEditing = !!editData;

    const redStyle = {
      color: 'red'
    };
    const blueStyle = {
      color: 'blue'
    };

    var tempStyle = {
      color: 'green'
    };

    if (destination.conditions.current > 26) {
      tempStyle = redStyle;
    } else if (destination.conditions.current < 20) {
      tempStyle = blueStyle;
    }

    return !isEditing ? (
      <Link
        to={`/destination/${destination.id}`}
        className="card"
        key={destination.id}
      >
        <div className="content">
          <div className="header">{destination.description}</div>
          <div className="content">
            <p>
              <i className="icon calendar" />
              {destination.id}
            </p>
            <p>
              <i className="icon clock" />
              {destination.conditions.description}
            </p>
            <p>
              <i className="icon marker" />
              <span style={tempStyle}>
                {destination.conditions.current} &deg;C
              </span>
            </p>
          </div>
        </div>
      </Link>
    ) : (
      <tr key={destination.id}>
        <td>{destination.id}</td>
        <td>
          <input
            type="text"
            value={editData.title}
            onChange={this.handleFieldEdit.bind(
              this,
              destination.id,
              'description'
            )}
          />
        </td>

        <td>
          <button onClick={this.handleEditSave.bind(this, destination.id)}>
            Save
          </button>
          <button onClick={this.handleEditCancel.bind(this, destination.id)}>
            Cancel
          </button>
        </td>
      </tr>
    );
  };

  componentWillMount() {
    this.props.subscribeToDestinations();
  }

  render() {
    const { destinations } = this.props;

    return (
      <div>
        <div className="ui link cards">
          {[]
            .concat(destinations)
            .sort((a, b) => b.id - a.id)
            .map(this.renderOrEditdestination)}
        </div>
      </div>
    );
  }
}
