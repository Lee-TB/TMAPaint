import './style.css';
import { Painter, PainterType } from './Painter';
import { ShapeType } from './models/enums/ShapeType';
import { Canvas } from './models/Canvas';
import { CanvasRenderer } from './models/CanvasRenderer';
import { StateHistory } from './models/StateHistory';
import { FactoryMaker } from './models/FactoryMaker/FactoryMaker';
import { ShapeVariant } from './models/enums/ShapeVariant';

const SCREEN_WIDTH = 1600;
const SCREEN_HEIGHT = 900;

window.addEventListener('load', () => {
    // Query DOM
    const fillStrokeSwitch = document.querySelector('#fill-stroke-switch') as HTMLInputElement;
    const shapeButtonList: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[name="shape"]');
    const undoButton = document.querySelector('#undo-button') as HTMLButtonElement;
    const redoButton = document.querySelector('#redo-button') as HTMLButtonElement;

    // Initialize painter
    let painter: PainterType;
    painter = Painter(FactoryMaker.getInstance().createFactory(ShapeVariant.stroke));
    painter.setScreen((SCREEN_WIDTH * 2) / 3, (SCREEN_HEIGHT * 2) / 3);
    handleChangeShape();
    addShapeButtonListEventListener();

    // Tell canvas which shape is being paint (Event Select Shape)
    function handleChangeShape() {
        shapeButtonList.forEach((shapeButton) => {
            if (shapeButton.value === 'rectangle' && shapeButton.checked) {
                painter.stopPaintingAll();
                painter.startPainting(ShapeType.rectangle);
                Canvas.getInstance().canvasElement.style.cursor = 'crosshair';
            }

            if (shapeButton.value === 'circle' && shapeButton.checked) {
                painter.stopPaintingAll();
                painter.startPainting(ShapeType.circle);
                Canvas.getInstance().canvasElement.style.cursor = 'crosshair';
            }
        });
    }

    // Switch to Fill or Stroke shape and choose corresponding Shape Factory (Event )
    function handleClickFillStrokeSwitch() {
        painter.stopPaintingAll();
        if (fillStrokeSwitch.checked) {
            painter = Painter(FactoryMaker.getInstance().createFactory(ShapeVariant.fill));
        } else {
            painter = Painter(FactoryMaker.getInstance().createFactory(ShapeVariant.stroke));
        }
        // After switch strok or fill, run handleChangeShape
        handleChangeShape();
    }

    // Handle Undo
    function handleUndo() {
        StateHistory.getInstance().undo();
        CanvasRenderer.getInstance().rerender(StateHistory.getInstance().getUndoList());
        console.log(StateHistory.getInstance().getUndoList());
    }

    // Handle Redo
    function handleRedo() {
        StateHistory.getInstance().redo();
        CanvasRenderer.getInstance().rerender(StateHistory.getInstance().getUndoList());
        console.log(StateHistory.getInstance().getUndoList());
    }

    // Add event listener to select shape buttons
    function addShapeButtonListEventListener() {
        shapeButtonList.forEach((shapeButton) => {
            shapeButton.addEventListener('change', handleChangeShape);
        });
    }

    // Add event listener to switch stroke or fill
    fillStrokeSwitch?.addEventListener('click', handleClickFillStrokeSwitch);

    // add event listener to undo
    undoButton?.addEventListener('click', handleUndo);
    redoButton?.addEventListener('click', handleRedo);
});
