import { ShapeType } from './models/enums/ShapeType';
import { ShapeFactoryType } from './models/enums/ShapeFactoryType';
import { FactoryMaker } from './models/FactoryMaker/FactoryMaker';
import { Painter } from './controllers/Painter';
import './style.css';

const SCREEN_WIDTH = 1600;
const SCREEN_HEIGHT = 900;

window.addEventListener('load', () => {
    /**
     * Gọi DOM Elements
     */
    const undoButton = document.querySelector('#undo-button') as HTMLButtonElement;
    const redoButton = document.querySelector('#redo-button') as HTMLButtonElement;
    const clearButton = document.querySelector('#clear-button') as HTMLButtonElement;
    const printButton = document.querySelector('#print-button') as HTMLButtonElement;
    const addRandomButton = document.querySelector('#random-shape-button') as HTMLButtonElement;
    const shapeButtonList: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[name="shape"]');
    const shapeTable = document.querySelector('#shape-table') as HTMLTableElement;

    /**
     * Khởi tạo painter
     */
    const canvas = document.getElementById('canvas') as HTMLCanvasElement; // Gọi canvas dom
    const shapeFactory = FactoryMaker.getInstance().createFactory(ShapeFactoryType.Shape2D); // Tạo shapeFactory từ factoryMaker
    const painter = new Painter(canvas, shapeFactory);
    painter.setScreen((SCREEN_WIDTH * 2) / 3, (SCREEN_HEIGHT * 2) / 3);

    /**Thực hiện tạo hình ngẫu nhiên khi nhấn nút */
    function handleAddRandom() {
        painter.paintRandomShape();
    }
    addRandomButton.addEventListener('click', handleAddRandom);

    /**
     * Viết các Nút chức năng
     */
    /**Lắng nghe sự kiện kéo thả chuột */
    function handleChangeShape() {
        shapeButtonList.forEach((shapeButton) => {
            if (shapeButton.value === 'rectangle' && shapeButton.checked) {
                // Ngừng vẽ
                painter.unsubscribePaintByMouse(); // unsubscribe để chắn chắn hủy vẽ shape trước đó
                // Tiếp tục vẽ
                painter.subscribePaintByMouse(ShapeType.rectangle); // Truyền shapeFactory và shapeType để bên trong, trao lại nhiệm vụ tạo shape cho mouse event
            } else if (shapeButton.value === 'circle' && shapeButton.checked) {
                // Ngừng vẽ
                painter.unsubscribePaintByMouse(); // unsubscribe để chắn chắn hủy vẽ shape trước đó
                // Tiếp tục vẽ
                painter.subscribePaintByMouse(ShapeType.circle); // Truyền shapeFactory và shapeType để bên trong, trao lại nhiệm vụ tạo shape cho mouse event
            }
        });
    }
    handleChangeShape(); // Gọi ngay lặp tức bởi vì mặc định sẽ có một shape được chọn

    /**Mỗi lần thay đổi shape ta sẽ lắng nghe lại sự kiện */
    shapeButtonList.forEach((shapeButton) => {
        shapeButton.addEventListener('change', handleChangeShape);
    });

    /**Chức năng undo */
    function handleUndo() {
        painter.undo();
    }
    undoButton.addEventListener('click', handleUndo);

    /**Chức năng redo  */
    function handleRedo() {
        painter.redo();
    }
    redoButton.addEventListener('click', handleRedo);

    /**Chức năng clear màn hình */
    function handleClear() {
        painter.clear();
    }
    clearButton.addEventListener('click', handleClear);

    /**Chức năng in */
    function handlePrint() {
        painter.printCanvas();
    }
    printButton.addEventListener('click', handlePrint);

    /**Hiển thị bảng các hình, cần truyền bảng vào */
    painter.setShapeTable(shapeTable);
});
