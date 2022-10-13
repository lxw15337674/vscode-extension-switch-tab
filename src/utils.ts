import { Uri, TextEditor, window, commands } from "vscode";


export function findEditor(uri: Uri): TextEditor | undefined {
  const active = window.activeTextEditor;
  const normalizedUri = uri.toString();

  for (const e of [...(active !== null ? [active] : []), ...window.visibleTextEditors]) {
    if (e && e.document.uri.toString() === normalizedUri && e?.viewColumn !== null) {
      return e;
    }
  }

  return undefined;
}

export async function findOrOpenEditor(
  uri: Uri,
): Promise<TextEditor | undefined> {
  const e = findEditor(uri);
  if (e) {
    await window.showTextDocument(e.document);
    return e;
  }
  return await commands.executeCommand('vscode.open', uri);
}