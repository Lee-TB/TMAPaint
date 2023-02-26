import { getRandomNumber } from '../utils/getRandomNumber';
import { Circle } from './AbstractProduct/Circle';
import { Point } from './AbstractProduct/Point';
import { Rectangle } from './AbstractProduct/Rectangle';
import { Shape } from './AbstractProduct/Shape';
import { IShapeFactory } from './AbstractFactory/IShapeFactory';
import { ShapeType } from './enums/ShapeType';

interface ShapeData {
    index: number;
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
}

export class Painter {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private tableElement?: HTMLTableElement;
    private shapeList: Shape[];
    private currentShape: Shape | null;
    private startPoint: Point | null;
    private isPainting: boolean = false;
    private shapeFactory: IShapeFactory;
    private shapeType: ShapeType | null;
    private undoStack: Shape[][];
    private redoStack: Shape[][];

    /**
     * Xây dựng đối tượng painter
     * @param canvas
     * @param shapeFactory
     */
    constructor(canvas: HTMLCanvasElement, shapeFactory: IShapeFactory) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.shapeList = [];
        this.undoStack = [];
        this.redoStack = [];
        this.shapeFactory = shapeFactory;
        this.shapeType = null;
        this.startPoint = null;
        this.currentShape = null;
    }

    /**
     * Vẽ hình ngẫu nhiên
     */
    public paintRandomShape(): void {
        // Tạo ngẫu nhiên một shape
        const randomShape = getRandomNumber(0, 1);
        let shape: Shape;
        if (randomShape) {
            shape = this.shapeFactory.createShape(ShapeType.rectangle);
        } else {
            shape = this.shapeFactory.createShape(ShapeType.circle);
        }
        this.setShape(shape);

        // Vẽ ngẫu nhiên vị trí và kích thước shape
        if (this.currentShape) {
            const randomX = getRandomNumber(100, this.canvas.width - 100);
            const randomY = getRandomNumber(100, this.canvas.height - 100);
            const randomLocation = new Point(randomX, randomY);
            const randomWidth = getRandomNumber(50, 150);
            const randomHeight = getRandomNumber(50, 150);
            this.currentShape.setLocation(randomLocation);

            if (this.currentShape instanceof Rectangle) {
                this.currentShape.setWidth(randomWidth);
                this.currentShape.setHeight(randomHeight);
            } else if (this.currentShape instanceof Circle) {
                const radius = Math.sqrt(randomWidth ** 2 + randomHeight ** 2) / 2;
                this.currentShape.setRadius(radius);
            }

            this.shapeList.push(<Shape>this.currentShape);
            this.paintShapeList();
            this.renderShapeTable(this.shapeList);
            this.undoStack.push(this.shapeList.slice());
            this.redoStack = []; // vẽ thì clear redo stack
            this.currentShape = null; // sau khi vẽ xong thì xóa nó đi
        } else {
            throw new Error('Canvas currentShape is null');
        }
    }

    /**
     * Thiết lập kích thước màn hình
     * @param width
     * @param height
     */
    public setScreen(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    /**
     * Chọn hình sẽ được vẽ, luôn luôn gọi setShape trước khi gọi bất cứ hàm vẽ nào
     * @param shape đối tượng shape
     */
    public setShape(shape: Shape): void {
        this.currentShape = shape;
    }

    /**
     * Đăng ký sự kiện vẽ bằng cách kéo thả chuột
     * @param type loại shape circle | rectangle
     */
    public subscribePaintByMouse(type: ShapeType): void {
        this.shapeType = type;
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    /**
     * Hủy đăng ký sự kiên vẽ bằng chuột
     */
    public unsubscribePaintByMouse(): void {
        this.canvas.removeEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.removeEventListener('mouseup', this.handleMouseUp.bind(this));
        if (this.shapeType) {
            // thu hồi vùng nhớ nhớ
            this.shapeType = null;
        }
    }

    /**
     * xử lý sự kiện mousedown
     * @param event
     */
    private handleMouseDown(event: MouseEvent) {
        this.startPoint = new Point(event.offsetX, event.offsetY);
        this.isPainting = true;
        // Tạo shape mỗi lần nhấn chuột
        this.currentShape = this.shapeFactory!.createShape(<ShapeType>this.shapeType);
    }

    /**
     * xử lý sự kiện mousemove
     * @param event
     */
    private handleMouseMove(event: MouseEvent) {
        if (this.currentShape && this.isPainting) {
            const width = event.offsetX - this.startPoint!.getX();
            const height = event.offsetY - this.startPoint!.getY();
            this.currentShape.setLocation(<Point>this.startPoint);

            if (this.currentShape instanceof Rectangle) {
                this.currentShape.setWidth(width);
                this.currentShape.setHeight(height);
            } else if (this.currentShape instanceof Circle) {
                const radius = Math.sqrt(width ** 2 + height ** 2);
                this.currentShape.setRadius(radius);
            }

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentShape.paint(this.context);
        }
    }

    // xử lý sự kiện mouseup
    private handleMouseUp(event: MouseEvent) {
        if (this.isPainting) {
            // lưu hình vào danh sách để vẽ và thu hồi curentShape
            this.shapeList.push(<Shape>this.currentShape);
            this.paintShapeList();
            this.redoStack = []; // vẽ thì clear redo stack
            this.undoStack.push([...this.shapeList]); // đựa vào ngăn xếp để có thể undo
            console.log(this.undoStack);
            this.renderShapeTable(this.shapeList);
            this.currentShape = null; // thu hôi vùng nhớ
            this.isPainting = false;
            this.startPoint = null;
        }
    }

    /**
     * Vẽ tất cả các hình đã được lưu lại
     */
    private paintShapeList(): void {
        if (this.shapeList) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.shapeList.forEach((shape) => shape.paint(this.context));
        }
    }

    /**
     * clear(): làm sạch tất cả
     */
    public clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.shapeList = [];
        this.undoStack = [];
        this.redoStack = [];
        this.renderShapeTable(this.shapeList);
    }

    /**
     * printCanvas(): In hình ảnh
     */
    public printCanvas(): void {
        const link = document.createElement('a'); // Đầu tiên ta tạo một thẻ a
        link.download = 'canvas.png'; // thuộc tính dowload chỉ định tên tệp được tải xuống
        link.href = this.canvas.toDataURL(); // thuộc tính href nhận vào chuổi URL đại diện cho đối tượng hình ảnh canvas
        link.click(); // click để kích hoạt tải xuống
    }

    /**
     * undo(): trở về trạng thái trước đó
     */
    public undo() {
        if (this.undoStack.length > 0) {
            this.redoStack.push(this.undoStack.pop()!);
            this.shapeList = this.undoStack[this.undoStack.length - 1]?.slice();
            if (!this.shapeList) {
                this.shapeList = [];
            }
            this.paintShapeList();
            this.renderShapeTable(this.shapeList);
        }
    }

    /**
     * redo(): trở đi trạng thái vừa undo
     */
    public redo() {
        if (this.redoStack.length > 0) {
            this.shapeList = this.redoStack.pop()!;
            this.undoStack.push(this.shapeList.slice());
            this.paintShapeList();
            this.renderShapeTable(this.shapeList);
        }
    }

    public setShapeTable(tableElement: HTMLTableElement) {
        this.tableElement = tableElement;
    }

    private deleteShape(indexToDelete: number) {
        this.shapeList.splice(indexToDelete, 1); // cho biết vị trí cần xóa
        this.undoStack.push([...this.shapeList]); // đựa vào ngăn xếp để có thể undo
        this.redoStack = []; // Xóa thì clear redo stack

        this.paintShapeList(); // vẽ lại màn hình sau khi xóa
        this.renderShapeTable(this.shapeList); // render lại table
    }

    private updateShape(shapeData: ShapeData) {
        const { index: indexToUpdate, x, y, width, height, radius } = shapeData;

        const shapeUpdate = this.shapeList.splice(indexToUpdate, 1)[0].clone(); // shape vẩn là đối tượng nằm trong List (không phải bản sao)
        shapeUpdate.getLocation().setX(x);
        shapeUpdate.getLocation().setY(y);

        if (shapeUpdate instanceof Rectangle) {
            shapeUpdate.setWidth(width);
            shapeUpdate.setHeight(height);
        } else if (shapeUpdate instanceof Circle) {
            shapeUpdate.setRadius(radius);
        }

        this.shapeList.push(shapeUpdate); // sau khi đã cập nhật xong thì đưa nó vào sau cùng của shapeList
        this.undoStack.push([...this.shapeList]); // đựa vào ngăn xếp để có thể undo
        this.redoStack = []; // vẽ thì clear redo stack
        this.paintShapeList(); // vẽ lại màn hình sau khi xóa
        this.renderShapeTable(this.shapeList); // render lại table
    }

    private renderShapeTable(shapeList: Shape[]) {
        if (this.tableElement) {
            const tbodyHTML = shapeList
                .map((shape, index) => {
                    if (shape instanceof Rectangle) {
                        const shapeData = JSON.stringify({
                            index: index,
                            name: 'rectangle',
                            x: shape.getLocation().getX(),
                            y: shape.getLocation().getY(),
                            width: shape.getWidth(),
                            height: shape.getHeight(),
                        });

                        return `
                        <tr>
                            <td>${index + 1}</td>
                            <td>rectangle</td>
                            <td contenteditable="true">${shape.getLocation().getX()}</td>
                            <td contenteditable="true">${shape.getLocation().getY()}</td>
                            <td contenteditable="true">${shape.getWidth()}</td>
                            <td contenteditable="true">${shape.getHeight()}</td>
                            <td>null</td>
                            <td style="display: flex">
                                <button class="btn btn-warning" data-index='${index}'>
                                    <span> update </span>
                                    <span class="material-symbols-outlined"> update </span>
                                </button>
                                <button class="btn btn-danger" data-index='${index}'>
                                    <span> delete </span>
                                    <span class="material-symbols-outlined"> delete </span>
                                </button>
                            </td>
                        </tr>`;
                    } else if (shape instanceof Circle) {
                        const shapeData = JSON.stringify({
                            index: index,
                            name: 'circle',
                            x: shape.getLocation().getX(),
                            y: shape.getLocation().getY(),
                            radius: shape.getRadius(),
                        });
                        return `
                        <tr>
                            <td>${index + 1}</td>
                            <td>circle</td>
                            <td contenteditable="true">${shape.getLocation().getX()}</td>
                            <td contenteditable="true">${shape.getLocation().getY()}</td>
                            <td>null</td>
                            <td>null</td>
                            <td contenteditable="true">${shape.getRadius().toFixed(2)}</td>
                            <td style="display: flex">
                                <button class="btn btn-warning" data-index='${index}'>
                                    <span> update </span>
                                    <span class="material-symbols-outlined"> update </span>
                                </button>
                                <button class="btn btn-danger" data-index='${index}'>
                                    <span> delete </span>
                                    <span class="material-symbols-outlined"> delete </span>
                                </button>
                            </td>
                        </tr>`;
                    }
                })
                .join('');
            this.tableElement.tBodies[0].innerHTML = tbodyHTML;

            // Xử lý sự kiện click cho các button "delete"
            const deleteButtons = this.tableElement.querySelectorAll(
                '.btn-danger'
            ) as NodeListOf<HTMLButtonElement>;
            deleteButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    const index = Number(button.dataset.index);
                    this.deleteShape(index);
                });
            });

            // Xử lý sự kiện click cho các button "update"
            const updateButtons = this.tableElement.querySelectorAll(
                '.btn-warning'
            ) as NodeListOf<HTMLButtonElement>;
            updateButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    const index = Number(button.dataset.index);
                    // Lấy dữ liệu từ các thẻ td
                    const xValue = Number(
                        button.parentElement!.parentElement!.querySelectorAll('td')[2].innerText
                    );
                    const yValue = Number(
                        button.parentElement!.parentElement!.querySelectorAll('td')[3].innerText
                    );
                    const widthValue = Number(
                        button.parentElement!.parentElement!.querySelectorAll('td')[4].innerText
                    );
                    const heightValue = Number(
                        button.parentElement!.parentElement!.querySelectorAll('td')[5].innerText
                    );
                    const radiusValue = Number(
                        button.parentElement!.parentElement!.querySelectorAll('td')[6].innerText
                    );

                    const shapeData: ShapeData = {
                        index,
                        x: xValue,
                        y: yValue,
                        width: widthValue,
                        height: heightValue,
                        radius: radiusValue,
                    };
                    this.updateShape(shapeData);
                });
            });
        }
    }
}
