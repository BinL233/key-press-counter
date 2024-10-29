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

    let setInfoShowNum = vscode.commands.registerCommand('key-press-counter.setInfoShowNum', () => {
        
    });

	context.subscriptions.push(isActive);
}

export function deactivate() {}
