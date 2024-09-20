import { useEffect, useRef, useState } from "react";

const Canvas = ({brushColor,brushStroke}) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                context.lineCap = "round"; // pen point type
                context.lineWidth = 2; // default line size
                context.fillStyle = "black"; // background color
                context.fillRect(0, 0, canvas.width, canvas.height); // fill canvas
            }
        }
    }, []);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.lineWidth = brushStroke; // Update line size whenever brushStroke changes
            }
        }
    }, [brushStroke]); 
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.beginPath();
                context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setLastX(e.nativeEvent.offsetX);
                setLastY(e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const draw = (e) => {
        if (!isDrawing) {
            return;
        }
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.strokeStyle = brushColor;
                context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                context.stroke();
                setLastX(e.nativeEvent.offsetX);
                setLastY(e.nativeEvent.offsetY);
            }
        }
    };

    return (
        <div className="w-full h-full">
           
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseOut={stopDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                className="w-full h-full absolute top-0 left-0"
            ></canvas>
        </div>
    );
    
};

export default Canvas;
