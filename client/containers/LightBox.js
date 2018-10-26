import React from 'react';
import LightboxComponent from 'react-images';
import { Col, Thumbnail } from 'react-bootstrap';

const LightBox = React.createClass({
  getInitialState() {
    return {
      lightboxIsOpen: false,
      currentImage: 0,
      images: this.props.images
    };
  },


  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  },

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  },

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  },

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  },

  gotoImage(index) {
    this.setState({
      currentImage: index,
    });
  },

  handleClickImage() {
    if (this.state.currentImage === this.props.images.length - 1) return;

    this.gotoNext();
  },

  renderGallery() {
    return (
      <div id="photos">
        {
          this.state.images.map((image, i) => (
            <img
              key={image.src}
              onClick={e => this.openLightbox(i, e)}
              src={image.src}
            />
          ))
        }
      </div>
    );
  },

  render() {
    return (
      <div>
        {this.renderGallery()}
        <LightboxComponent
          currentImage={this.state.currentImage}
          images={this.props.images}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
          showThumbnails={this.props.showThumbnails}
          theme={this.props.theme}
        />
      </div>
    );
  }
});


export default LightBox;
