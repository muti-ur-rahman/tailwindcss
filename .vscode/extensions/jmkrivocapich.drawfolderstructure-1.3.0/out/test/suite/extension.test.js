"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const path = require("path");
const generate_structure_1 = require("../../functions/generate-structure");
const should_exclude_1 = require("../../functions/should-exclude");
const style_1 = require("../../types/style");
suite('Extension Test Suite', () => {
    test('generateStructure should return correct structure for different styles', () => {
        const testFolderPath = path.resolve(__dirname, '../../../src/test/suite/testFolder');
        const exclude = ['.git'];
        let structure = (0, generate_structure_1.generateStructure)(testFolderPath, 0, exclude, style_1.Style.ClassicDashes);
        let expectedStructure = `└── README.md
└── src
    └── app.ts
    └── index.ts
`;
        assert.strictEqual(structure, expectedStructure);
        structure = (0, generate_structure_1.generateStructure)(testFolderPath, 0, exclude, style_1.Style.MinimalistDots);
        expectedStructure = `• README.md
 • src
    • app.ts
    • index.ts
`;
        assert.strictEqual(structure, expectedStructure);
    });
    test('shouldExclude should return true for excluded patterns', () => {
        const patterns = ['.git', 'node_modules'];
        assert.strictEqual((0, should_exclude_1.shouldExclude)('.git', patterns), true);
        assert.strictEqual((0, should_exclude_1.shouldExclude)('node_modules', patterns), true);
        assert.strictEqual((0, should_exclude_1.shouldExclude)('src', patterns), false);
    });
});
//# sourceMappingURL=extension.test.js.map