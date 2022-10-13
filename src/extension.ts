import * as vscode from 'vscode';
import { findOrOpenEditor } from './utils';

export function activate(context: vscode.ExtensionContext) {
	const tabMap: Map<number, vscode.Uri> = new Map();
	for (let i = 0; i < 10; i++) {
		context.subscriptions.push(vscode.commands.registerCommand(`tabSwitch.mark${i}`, () => {
			const activeTab = vscode.window.tabGroups.activeTabGroup.activeTab;
			if (activeTab) {
				tabMap.set(i, (activeTab?.input as vscode.TabInputText).uri);
				vscode.window.showInformationMessage(`mark the active tab to No${i} tab`);
			}
		}));
		context.subscriptions.push(vscode.commands.registerCommand(`tabSwitch.switch${i}`, async () => {
			const uri = tabMap.get(i);
			if (uri) {
				vscode.window.showInformationMessage(`switch No${i} tab`);
				findOrOpenEditor(uri);
			} else {
				vscode.window.showInformationMessage(`No${i} tab is not marked`);
			}
		}));
	}
}

export function deactivate() { }
