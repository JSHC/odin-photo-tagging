import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const ObjectiveResult = ({ image, objective }) => {
    const [bounds, setBounds] = useState(null);
    useEffect(() => {
        const loadBounds = async () => {
            try {
                const path = `images/${image.name}/objectives/${objective.id}/bounds`;
                console.log(path);
                const querySnapshot = await getDocs(
                    collection(
                        db,
                        path
                    )
                );
                if (querySnapshot.docs.length === 0) {
                    return;
                }
                const boundsData = querySnapshot.docs.map(doc => {
                    const obj = {};
                    const key = doc.id;
                    obj[key] = doc.data()['value'];
                    return obj;
                });
                const boundsObj = Object.assign(...boundsData);
                setBounds(boundsObj);
            } catch (error) {
                console.error("Error retrieving objective bounds", error);
            }

        };
        loadBounds();
    }, []);

    const isWithinBounds = () => {
        if (!bounds || !bounds.left) {
            return false;
        }

        if (objective.x < bounds.left || objective.x > bounds.right) {
            return false;
        }

        if (objective.y < bounds.top || objective.y > bounds.bottom) {
            return false;
        }

        return true;
    }

    return <div className="objective-result">
        <p>{objective.name}</p>
        <p>{isWithinBounds() ? 'True' : 'False'}</p>
    </div>;
};

export default ObjectiveResult;