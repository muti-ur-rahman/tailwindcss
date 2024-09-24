"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStructure = void 0;
const fs = require("fs");
const path = require("path");
const get_prefix_1 = require("./get-prefix");
const should_exclude_1 = require("./should-exclude");
function generateStructure(folderPath, depth, excludePatterns, style, isLast = false) {
    let structure = "";
    const items = fs
        .readdirSync(folderPath)
        .filter((item) => {
        const itemPath = path.join(folderPath, item);
        return !(0, should_exclude_1.shouldExclude)(itemPath, excludePatterns, folderPath);
    })
        .sort((a, b) => {
        const aPath = path.join(folderPath, a);
        const bPath = path.join(folderPath, b);
        const aIsDirectory = fs.lstatSync(aPath).isDirectory();
        const bIsDirectory = fs.lstatSync(bPath).isDirectory();
        if (aIsDirectory && !bIsDirectory)
            return -1;
        if (!aIsDirectory && bIsDirectory)
            return 1;
        return a.localeCompare(b);
    });
    const totalItems = items.length;
    items.forEach((item, index) => {
        const isLastItem = index === totalItems - 1;
        const fullPath = path.join(folderPath, item);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            const subItems = fs
                .readdirSync(fullPath)
                .filter((subItem) => !(0, should_exclude_1.shouldExclude)(subItem, excludePatterns, folderPath));
            const isSubLast = isLastItem && subItems.length === 0;
            structure += (0, get_prefix_1.getPrefix)(depth, style, false, isSubLast) + item + "\n";
            structure += generateStructure(fullPath, depth + 1, excludePatterns, style, isLastItem);
        }
        else {
            structure +=
                (0, get_prefix_1.getPrefix)(depth, style, true, isLastItem && isLast) + item + "\n";
        }
    });
    return structure;
}
exports.generateStructure = generateStructure;
//# sourceMappingURL=generate-structure.js.map