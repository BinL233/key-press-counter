import * as vscode from 'vscode';

export default class Counter {
    private _statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    _count: number;
    _infoShowNum: number;

    constructor(count: number, infoShowNum: number) {
        this._count = count;
        this._infoShowNum = infoShowNum;
        this._statusBarItem.text = `Count: ${count}`;
        this._statusBarItem.show();
    }

    public keyPress(event: vscode.TextEditorSelectionChangeEvent) {
        if (event.kind === vscode.TextEditorSelectionChangeKind.Keyboard) {
            this._count++;
            this._statusBarItem.text = `Count: ${this._count}`;
            
            if (this._count % this._infoShowNum == 0) {
                vscode.window.showInformationMessage(`Keyboard pressed ${this._count} times!`);
            }
        }
    }
}