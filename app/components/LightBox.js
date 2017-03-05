let React = require('react');
let LightboxComponent = require('react-images');
let Thumbnail = require('react-bootstrap').Thumbnail;
let Col = require('react-bootstrap').Col;

let LightBox = React.createClass ({
        getInitialState: function() {
            return {
                lightboxIsOpen: false,
                currentImage: 0,
                images: this.props.images
            };
        },



    openLightbox: function (index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true,
        });
    },

    closeLightbox: function() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        })
    },

    gotoPrevious: function () {
        this.setState({
            currentImage: this.state.currentImage - 1,
        })
    },

    gotoNext: function () {
        this.setState({
            currentImage: this.state.currentImage + 1,
        })
    },

    gotoImage: function (index) {
        this.setState({
            currentImage: index,
        })
    },

    handleClickImage: function () {
        if (this.state.currentImage === this.props.images.length - 1) return;

        this.gotoNext();
    },

    renderGallery: function () {

        return (
           <div>
           {
               this.state.images.map(function (image, i) {
                   console.log(image);
               return (
                   <Col xs={10} sm={3} key={i} className="gc-center">
                       <a onClick={(e) => this.openLightbox(i, e)}>
                           <Thumbnail className='gc-lightbox-thumbnail img-responsive'
                                      style={{backgroundImage: 'url(' + image.src + ')'}}
                           />
                       </a>
                   </Col>
               )
           }.bind(this))
        }
           </div>
        )
    },

    render () {
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


module.exports = LightBox;