
import React from 'react';
import { connect } from 'react-redux';
import values from 'lodash/values';

import Loader from './components/Loader';
import Artist from './components/Artist';

import './styles/index.scss';

class App extends React.Component {
  render() {
    if (this.props.loadingTracks || this.props.loadingInfos) {
      return (<Loader
        desc={this.props.loadingTracks
          ? 'Loading favorite tracks'
          : 'Loading artists info'
        }
      />);
    }

    const artists = this.props.artists.map((artist) => (
      <Artist
        key={artist.name}
        name={artist.name}
        image={artist.image}
        tags={artist.tags}
        url={artist.url}
      />
    ));

    return (
      <div className="artists-container">{artists}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.get('loading'),
  artists: values(state.get('artists').toJS()),
  tracks:  state.get('tracks').toJS(),
  tags:    state.get('tags').toJS(),
});

export default connect(mapStateToProps, {})(App);
