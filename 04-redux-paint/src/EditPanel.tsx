import { useDispatch } from "react-redux";
import { redo, undo } from "./modules/historyIndex/slice";
import { strokesLengthSelector } from "./modules/strokes/selectors";
import { useSelector } from "react-redux";

export const EditPanel = () => {
  const dispatch = useDispatch();
  const strokesLength = useSelector(strokesLengthSelector)
  return (
    <div className="window edit">
      <div className="title-bar">
        <div className="title-bar-text">Edit</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button className="button redo" onClick={() => dispatch(undo(strokesLength))}>
            Undo
          </button>
          <button className="button undo" onClick={() => dispatch(redo())}>
            Redo
          </button>
        </div>
      </div>
    </div>
  );
};
