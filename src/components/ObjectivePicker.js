import { useEffect, useRef } from 'react';
import '../styles/ObjectivePicker.css';

const ObjectivePicker = ({objectives, position}) => {
    const ref = useRef();
    useEffect(() => {
        if (ref.current) {
            ref.current.style.left = position.x + 'px';
            ref.current.style.top = position.y + 'px';
        }
    }, [])

    return (
        <ul ref={ref} className="objective-picker">
            {objectives.map(objective => <li key={objective.name}>{objective.name}</li>)}
        </ul>
    )
}

export default ObjectivePicker;