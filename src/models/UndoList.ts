import { Shape } from './AbstractProduct/Shape';
export class UndoList {
    private _items: Shape[] = [];
    private _pilot: number = -1;

    push(o: Shape): number {
        return this._items.push(o);
    }

    pop(): Shape {
        return this._items.pop() as Shape;
    }

    getList(): Shape[] {
        return this._items;
    }

    undo(): void {
        if (this._pilot >= 0) {
            this._pilot++;
        }
    }

    redo(): void {}
}
