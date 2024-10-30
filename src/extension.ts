import * as vscode from 'vscode';
import Counter from './counter';

let active = true;
let count = 0;
let infoShowNum = 500;
let counter: Counter;

export function activate(context: vscode.ExtensionContext) {
	console.log('key-press-counter is now active!');

    let isActive = vscode.commands.registerCommand('key-press-counter.toggle', () => {
        active = !active;
        vscode.window.showInformationMessage(`KeyPressCounter Toggled ${active ? 'Active' : 'Inactive'}`);
    });

    counter = new Counter(count, infoShowNum);

    // Monitor key pressing event
    vscode.window.onDidChangeTextEditorSelection((event) => {
        if (active) {
            counter.keyPress(event);
        }
    });

    let setMsgPushNum = vscode.commands.registerCommand('key-press-counter.setMsgPushNum', () => {
        vscode.window
        .showInputBox({
            prompt: 'Set the number of times you press the keyboard every time to receive a message.',
            placeHolder: 'Enter number',
            validateInput: validateInput
        })
        .then(value => {
            infoShowNum = Number(value);
            counter.updateInfoShowNum(infoShowNum);
        });
    });

    let resetCounter = vscode.commands.registerCommand('key-press-counter.resetCounter', () => {
        count = 0;
        counter.updateCount(count);
    });

	context.subscriptions.push(isActive);
    context.subscriptions.push(setMsgPushNum);
    context.subscriptions.push(resetCounter);
}

function validateInput(value: string) {
    let numericValue = parseInt(value);
    if (isNaN(numericValue)) {
        return 'Input need to be a valid number';
    } else {
        return null;
    }
}

export function deactivate() {}
