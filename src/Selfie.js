import React from 'react';

import ClayIcon from '@clayui/icon';
import ClayButton from "@clayui/button";
import ClayLayout from "@clayui/layout";

class Selfie extends React.Component {
    state = {
        imageURL: '',
    }

    videoEle = React.createRef();
    canvasEle = React.createRef();
    imageEle = React.createRef();

    startCamera = async () => {
        try {
            const stream =  await navigator.mediaDevices.getUserMedia({
                video: true
            });

            this.videoEle.current.srcObject = stream;
            
        } catch(err) {
            console.log(err);
        }
    }

    stopCam = () => {
        const stream = this.videoEle.current.srcObject;
        const tracks = stream.getTracks();
        
        tracks.forEach(track => {
          track.stop();
        });
    }

    backToCam = () => {
        this.setState({
            imageURL: ''
        }, () => {
            this.startCamera();
        })
    }

    takeSelfie = async () => {
        // Get the exact size of the video element.
        const width = this.videoEle.current.videoWidth;
        const height = this.videoEle.current.videoHeight;

        // get the context object of hidden canvas
        const ctx = this.canvasEle.current.getContext('2d');

        // Set the canvas to the same dimensions as the video.
        this.canvasEle.current.width = width;
        this.canvasEle.current.height = height;

        // Draw the current frame from the video on the canvas.
        ctx.drawImage(this.videoEle.current, 0, 0, width, height);

        // Get an image dataURL from the canvas.
        const imageDataURL = this.canvasEle.current.toDataURL('image/png');

        // Set the dataURL as source of an image element, showing the captured photo.
        this.stopCam();
        this.setState({
            imageURL: imageDataURL
        })
    }

    componentDidMount = async () => {
        this.startCamera();
    }

    render() {
        const spritemap = Liferay.ThemeDisplay.getPathThemeImages().concat("/clay/icons.svg");
        return (
            <ClayLayout.ContainerFluid view>
                <ClayLayout.Row>
                    <ClayLayout.Col size={12} className="selfie">
                        {this.state.imageURL === '' && <div className="cam">
                            <video width="100%" height="100%" className="video-player" autoPlay={true} ref={this.videoEle}></video>
                            <ClayButton className="btn capture-btn" displayType="outline-primary" onClick={this.takeSelfie}>
                                <ClayIcon spritemap={spritemap} symbol="camera" aria-hidden="true" />
                            </ClayButton>
                        </div>
                        }

                        <canvas ref={this.canvasEle} style={{display: 'none'}}></canvas>
                        {this.state.imageURL !== '' && <div className="preview">
                            <img className="preview-img" src={this.state.imageURL} ref={this.imageEle} />

                            <div className="btn-container">
                                <ClayButton className="btn back-btn" onClick={this.backToCam}>
                                    <ClayIcon spritemap={spritemap} symbol="caret-left" aria-hidden="true" />
                                </ClayButton>
                                <a href={this.state.imageURL} download="selfie.png"
                                className="btn download-btn">
                                    <ClayIcon spritemap={spritemap} symbol="download" aria-hidden="true" />
                                </a>
                            </div>

                        </div>
                        }
                    </ClayLayout.Col>
                </ClayLayout.Row>
            </ClayLayout.ContainerFluid>
        )
     }
}

export default Selfie;