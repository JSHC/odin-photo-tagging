import { useEffect, useState } from "react";
import "../styles/ImageSelector.css";

import { collection, getDocs, where, query, doc } from "firebase/firestore";
import { db } from "../firebase";
import ObjectivesList from "./ObjectivesList";
import useObjectives from "../effects/useObjectives";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Highscores from "./Highscores";
import Modal from "./Modal";

const ImageSelector = ({ images, onConfirm, onShowScoresClick }) => {
    const [currentImage, setCurrentImage] = useState(null);
    const [showHighscores, setShowHighscores] = useState(false);

    const nextImage = () => {
        if (images.length <= 1) {
            return;
        }

        if (currentImage.index === images.length - 1) {
            const nextIndex = 0;
            setCurrentImage({
                ...images[nextIndex],
                index: nextIndex,
            });
        } else {
            const nextIndex = currentImage.index + 1;
            setCurrentImage({
                ...images[nextIndex],
                index: nextIndex,
            });
        }
    };

    const prevImage = () => {
        if (images.length <= 1) {
            return;
        }

        if (currentImage.index === 0) {
            const nextIndex = images.length - 1;
            setCurrentImage({
                ...images[nextIndex],
                index: nextIndex,
            });
        } else {
            const nextIndex = currentImage.index - 1;
            setCurrentImage({
                ...images[nextIndex],
                index: nextIndex,
            });
        }
    };

    useEffect(() => {
        for (let image of images) {
            const img = new Image();
            img.src = `${process.env.PUBLIC_URL}/images/${image.imageName}`;
        }

        if (images.length > 0) {
            setCurrentImage({
                ...images[0],
                index: 0,
            });
        }
    }, [images]);

    const objectives = useObjectives(currentImage);

    return (
        <div className="image-selector">
            {currentImage && (
                <h3 className="current-image-name">{currentImage.name}</h3>
            )}
            <button
                className="previous-image-button"
                aria-label="previous-image-button"
                onClick={prevImage}
                disabled={images.length <= 1}
            >
                <FaArrowLeft />
            </button>
            <div
                className="current-image"
                aria-label="current-image"
                style={{
                    backgroundImage:
                        currentImage &&
                        `url(${process.env.PUBLIC_URL}/images/${currentImage.imageName})`,
                }}
            ></div>
            <button
                className="next-image-button"
                aria-label="next-image-button"
                onClick={nextImage}
                disabled={images.length <= 1}
            >
                <FaArrowRight />
            </button>
            {objectives.length > 0 && (
                <ObjectivesList objectives={objectives} />
            )}
            <div className="buttons">
                <button
                    className="confirm-button primary-button"
                    aria-label="confirm-button"
                    disabled={!currentImage}
                    onClick={() => onConfirm(currentImage)}
                >
                    Confirm
                </button>
                <button
                    className="show-highscores-button primary-button"
                    aria-label="show-highscores-button"
                    onClick={() => setShowHighscores(true)}
                >
                    Show High Scores
                </button>
            </div>
            {showHighscores && (
                <Modal>
                    <Highscores
                        image={currentImage}
                        onClose={() => setShowHighscores(false)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default ImageSelector;
