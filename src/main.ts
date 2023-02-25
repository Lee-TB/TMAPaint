import { ShapeType } from './models/enums/ShapeType';
import { ShapeFactoryType } from './models/enums/ShapeFactoryType';
import { FactoryMaker } from './models/FactoryMaker/FactoryMaker';
import { Canvas } from './models/Canvas';
import './style.css';
import { getRandomNumber } from './utils/getRandomNumber';
import { Shape } from './models/AbstractProduct/Shape';

const SCREEN_WIDTH = 1600;
const SCREEN_HEIGHT = 900;

window.addEventListener('load', () => {
    // Gọi DOM Elements
    const addRandomButton = document.querySelector('#random-shape-button') as HTMLButtonElement;
    const shapeButtonList: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[name="shape"]');
    const undoButton = document.querySelector('#undo-button') as HTMLButtonElement;
    const redoButton = document.querySelector('#redo-button') as HTMLButtonElement;

    // Khởi tạo các biến shape factory
    const shapeFactory = FactoryMaker.getInstance().createFactory(ShapeFactoryType.Shape2D);
    const canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement);
    canvas.setScreen(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

    addRandomButton.addEventListener('click', handleAddRandom);

    function handleAddRandom() {
        const randomShape = getRandomNumber(0, 1);
        let shape: Shape;
        if (randomShape) {
            shape = shapeFactory.createShape(ShapeType.rectangle);
        } else {
            shape = shapeFactory.createShape(ShapeType.circle);
        }
        canvas.setShape(shape);
        canvas.paintRandomShape();
    }

    handleChangeShape();
    // Sự kiện chọn Shape
    function handleChangeShape() {
        shapeButtonList.forEach((shapeButton) => {
            if (shapeButton.value === 'rectangle' && shapeButton.checked) {
                const rectangle = shapeFactory.createShape(ShapeType.rectangle);
                canvas.setShape(rectangle);
                canvas.subscribePaintByMouse();
            }

            if (shapeButton.value === 'circle' && shapeButton.checked) {
                const circle = shapeFactory.createShape(ShapeType.circle);
                canvas.setShape(circle);
                canvas.subscribePaintByMouse();
            }
        });
    }

    // Lắng nghe sự kiên thay đổi hình
    function listenShapeButtons() {
        shapeButtonList.forEach((shapeButton) => {
            shapeButton.addEventListener('change', handleChangeShape);
        });
    }
    listenShapeButtons();

    // canvas.addEventListener('click', (e: MouseEvent) => {
    //     console.log(e.offsetX, e.offsetY);
    //     const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    //     const circle: Circle = shapeFactory.createShape(ShapeType.circle) as Circle;
    //     const rectangle: Rectangle = shapeFactory.createShape(ShapeType.rectangle) as Rectangle;
    //     const location = new Point(e.offsetX, e.offsetY);
    //     rectangle.setLocation(location);
    //     rectangle.setWidth(200);
    //     rectangle.setHeight(100);
    //     rectangle.paint(ctx);
    //     // circle.setLocation(location);
    //     // circle.setRadius(100);
    //     // circle.paint(ctx);
    // });
    // // Initialize painter
    // let painter: PainterType;
    // painter = Painter(FactoryMaker.getInstance().createFactory(ShapeVariant.stroke));
    // painter.setScreen(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 3);
    // handleChangeShape();
    // addShapeButtonListEventListener();

    // // Switch to Fill or Stroke shape and choose corresponding Shape Factory (Event )
    // function handleClickFillStrokeSwitch() {
    //     painter.stopPaintingAll();
    //     if (fillStrokeSwitch.checked) {
    //         painter = Painter(FactoryMaker.getInstance().createFactory(ShapeVariant.fill));
    //     } else {
    //         painter = Painter(FactoryMaker.getInstance().createFactory(ShapeVariant.stroke));
    //     }
    //     // After switch strok or fill, run handleChangeShape
    //     handleChangeShape();
    // }

    // // Handle Undo
    // function handleUndo() {
    //     StateHistory.getInstance().undo();
    //     CanvasRenderer.getInstance().rerender(StateHistory.getInstance().getUndoList());
    //     console.log(StateHistory.getInstance().getUndoList());
    // }

    // // Handle Redo
    // function handleRedo() {
    //     StateHistory.getInstance().redo();
    //     CanvasRenderer.getInstance().rerender(StateHistory.getInstance().getUndoList());
    //     console.log(StateHistory.getInstance().getUndoList());
    // }

    // // Add event listener to switch stroke or fill
    // fillStrokeSwitch?.addEventListener('click', handleClickFillStrokeSwitch);

    // // add event listener to undo
    // undoButton?.addEventListener('click', handleUndo);
    // redoButton?.addEventListener('click', handleRedo);
});
