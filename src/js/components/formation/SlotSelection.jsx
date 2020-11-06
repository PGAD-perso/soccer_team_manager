import React from 'react';
import { useDrop } from 'react-dnd';

const SlotSelection = ({id, className, child}) => {
    const [, drop] = useDrop({
        accept: "playerCard",
        drop: () => ({name: id}),
    });

    return (
        <div ref={drop} id={id} className={className}>
            {child}
        </div>
    )
};

export default SlotSelection;