"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const get_prefix_1 = require("./functions/get-prefix");
const generate_structure_1 = require("./functions/generate-structure");
const style_1 = require("./types/style");
const CURRENT_VERSION = "1.3.0";
function activate(context) {
    const previousVersion = context.globalState.get("extensionVersion");
    if (previousVersion !== CURRENT_VERSION) {
        vscode.window.showInformationMessage(`🎉 New version ${CURRENT_VERSION} available! Check out the new features!`);
        context.globalState.update("extensionVersion", CURRENT_VERSION);
    }
    let disposable = vscode.commands.registerCommand("extension.generateMarkdownStructure", async (folder) => {
        const folderPath = folder.fsPath;
        const itemName = path.basename(folderPath);
        const stats = fs.statSync(folderPath);
        let markdownStructure = "";
        const excludePatterns = vscode.workspace
            .getConfiguration("draw.folder.structure")
            .get("exclude") || [];
        const style = vscode.workspace
            .getConfiguration("draw.folder.structure")
            .get("style") || style_1.Style.EmojiDashes;
        if (stats.isDirectory()) {
            markdownStructure += (0, get_prefix_1.getPrefix)(0, style) + itemName + "\n";
            markdownStructure += await (0, generate_structure_1.generateStructure)(folderPath, 1, excludePatterns, style);
        }
        else {
            markdownStructure = (0, get_prefix_1.getPrefix)(0, style, true) + itemName + "\n";
        }
        markdownStructure = "```\n" + markdownStructure + "```";
        vscode.env.clipboard.writeText(markdownStructure).then(() => {
            // Muestra una notificación
            vscode.window.showInformationMessage("Markdown structure copied to clipboard!");
        });
        vscode.workspace
            .openTextDocument({ content: markdownStructure, language: "markdown" })
            .then((doc) => {
            vscode.window.showTextDocument(doc);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map