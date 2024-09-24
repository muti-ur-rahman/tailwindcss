"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldExclude = void 0;
const minimatch_1 = require("minimatch");
const path = require("path");
function shouldExclude(name, patterns, basePath) {
    const fullPath = path.join(basePath, name);
    return patterns.some((pattern) => (0, minimatch_1.minimatch)(fullPath, pattern));
}
exports.shouldExclude = shouldExclude;
//# sourceMappingURL=should-exclude.js.map