import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCanvas, drawStroke } from "./canvasUtils";
import { ColorPanel } from "./ColorPanel";
import { EditPanel } from "./EditPanel";
import { historyIndexSelector } from "./modules/historyIndex/selectors";
import { currentStrokeSelector } from "./modules/currentStroke/selectors";
import { strokesSelector } from "./modules/strokes/selectors";
import {
  beginStroke,
  updateStroke,
} from "./modules/currentStroke/slice";
import { endStroke } from "./shared/sharedActions";
import { FilePanel } from "./shared/FilePanel";
import { useCanvas } from "./CanvasContext";

function App() {
  const canvasRef = useCanvas();
  const currentStroke = useSelector(currentStrokeSelector);
  const strokes = useSelector(strokesSelector);
  const historyIndex = useSelector(historyIndexSelector);
  const isDrawing = !!currentStroke.points.length;

  const dispatch = useDispatch();

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({ x: offsetX, y: offsetY }));
  };

  const enDrawing = () => {
    if (isDrawing) dispatch(endStroke({stroke: currentStroke, historyIndex: historyIndex}));
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke({x: offsetX, y: offsetY}));
  };
  useEffect(() => {
    const getCanvasWithContext = (canvas = canvasRef.current) => {
      return { canvas, context: canvas?.getContext("2d") };
    };
    const { context } = getCanvasWithContext();
    if (!context) return;

    requestAnimationFrame(() => {
      drawStroke(context, currentStroke.points, currentStroke.color);
    });
  }, [currentStroke, canvasRef]);

  useEffect(() => {
    const getCanvasWithContext = (canvas = canvasRef.current) => {
      return { canvas, context: canvas?.getContext("2d") };
    };

    const { canvas, context } = getCanvasWithContext();

    if (!context || !canvas) return;

    requestAnimationFrame(() => {
      clearCanvas(canvas);
      strokes
        .slice(0, strokes.length - historyIndex)
        .forEach((stroke) => drawStroke(context, stroke.points, stroke.color));
    });
  }, [strokes, historyIndex, canvasRef]);

  return (
    <div className="window" style={{ width: "1515px" }}>
      <div className="title-bar">
        <div className="title-bar-text">Redux paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <EditPanel />
        <ColorPanel />
        <FilePanel />
        <canvas
          width="1500"
          height="800"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={enDrawing}
          onMouseOut={enDrawing}
          onMouseMove={draw}
        />
      </div>
    </div>
  );
}

export default App;
