import React, { useState, useRef, useEffect } from 'react';

import ClayIcon from '@clayui/icon';
import ClayButton from "@clayui/button";
import ClayLayout from "@clayui/layout";

import { getIconsPath } from "./utils"; 

function Selfie() {
    const [imageURL, setImageURL] = useState('');

    const videoEle = useRef();
    const canvasEle = useRef();
    const imageEle = useRef();

    const spritemap = getIconsPath();

    const startCamera = async () => {
        try {
            const constraints = {
                video: { width: { min: 620 }, height: { min: 360 } },
              };

            navigator.mediaDevices.getUserMedia(constraints)
              .then((stream) => {
                videoEle.current.srcObject = stream;
              })
            
        } catch(err) {
            console.log(err);
        }
    };

    const stopCam = () => {
        const stream = videoEle.current.srcObject;
        const tracks = stream.getTracks();
        
        tracks.forEach(track => {
          track.stop();
        });
    };

    const backToCam = () => {
        setImageURL('');
        startCamera();
    };

    const takeSelfie = async () => {
        // Get the exact size of the video element.
        const width = videoEle.current.videoWidth;
        const height = videoEle.current.videoHeight;

        // get the context object of hidden canvas
        const ctx = canvasEle.current.getContext('2d');

        // Set the canvas to the same dimensions as the video.
        canvasEle.current.width = width;
        canvasEle.current.height = height;

        // Draw the current frame from the video on the canvas.
        ctx.drawImage(videoEle.current, 0, 0, width, height);

        // Get an image dataURL from the canvas.
        const imageDataURL = canvasEle.current.toDataURL('image/png');

        // Set the dataURL as source of an image element, showing the captured photo.
        stopCam();
        setImageURL(imageDataURL);
    };

    const handleSave = () => {
        const siteGroupId = Liferay.ThemeDisplay.getSiteGroupId();
        canvasEle.current.toBlob((blob) => {
            // Create a file with the blob
            const timestamp = Date.now();
            const file  = new File(
				[blob],
				`selfie-${timestamp}.png`,
				{
					type: 'image/png'
				}
            );
            
            const formData = new FormData();
            formData.append('file', file);
            
            Liferay.Util.fetch(
				`/o/headless-delivery/v1.0/sites/${siteGroupId}/documents`, {
					headers: {
						'Accept': 'application/json'
					},
					method: 'POST',
					body: formData,
				}
            )
            .then((response) => response.json())
			.then((data) => {
				if (data.status === 'CONFLICT') {
					Liferay.Util.openToast({
						message: data.title,
						type: 'danger',
					});
				} else {
					Liferay.Util.openToast({
						message: 'Hurrah! Your image was uploaded',
						type: 'success',
                    });
                    backToCam();
				}
			})
			.catch((error) => {
				console.log(error);
				Liferay.Util.openToast({
					message: 'An error occured uploading your document',
					type: 'danger',
				});
			});
            
            ;
        });

    };

    useEffect(() => {
        startCamera();
    });

    return (
        <ClayLayout.ContainerFluid view>
            <ClayLayout.Row>
                <ClayLayout.Col size={12} className="selfie">
                    {imageURL === '' && <div className="cam">
                        <video className="video-player" autoPlay={true} ref={videoEle}></video>
                        <ClayButton className="capture-btn" displayType="outline-primary" onClick={takeSelfie}>
                            <ClayIcon spritemap={spritemap} symbol="camera" aria-hidden="true" />
                        </ClayButton>
                    </div>
                    }

                    <canvas ref={canvasEle} style={{display: 'none'}}></canvas>
                    {imageURL !== '' && <div className="preview">
                        <img className="preview-img" src={imageURL} ref={imageEle} />

                        <div className="btn-container">
                            <ClayButton className="back-btn" displayType="outline-primary" onClick={backToCam}>
                                <ClayIcon spritemap={spritemap} symbol="caret-left" aria-hidden="true" />
                            </ClayButton>
                            <ClayButton className="back-btn" displayType="outline-primary" onClick={handleSave}>
                                <ClayIcon spritemap={spritemap} symbol="download" aria-hidden="true" />
                            </ClayButton>
                        </div>

                    </div>
                    }
                </ClayLayout.Col>
            </ClayLayout.Row>
        </ClayLayout.ContainerFluid>
    )
}

export default Selfie;