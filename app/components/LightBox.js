let React = require('react');
let LightboxComponent = require('react-images');

let LightBox = React.createClass ({
        getInitialState: function() {
            return {
                lightboxIsOpen: true,
                currentImage: 0
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
        console.log(this.state);
        const { images } = this.props.images;

        if (!images) return;

        const gallery = images.filter(i => i.useForDemo).map((obj, i) => {
            return (
                <a
                    href={obj.src}
                    key={i}
                    onClick={(e) => this.openLightbox(i, e)}
                >
                    <img src={obj.src} />
                </a>
            );
        });
        return (
            <div>
                {gallery}
            </div>
        );
    },

    render () {
        return (
            <div className="section">
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