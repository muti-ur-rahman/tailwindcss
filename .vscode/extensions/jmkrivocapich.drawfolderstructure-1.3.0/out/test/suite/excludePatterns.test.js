"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const path = require("path");
const generate_structure_1 = require("../../functions/generate-structure");
const should_exclude_1 = require("../../functions/should-exclude");
const style_1 = require("../../types/style");
suite('Exclude Patterns Test Suite', () => {
    const testFolderPath = path.resolve(__dirname, '../../../src/test/suite/testFolder');
    test('should exclude log files', async () => {
        const exclude = ['*.log'];
        const structure = await (0, generate_structure_1.generateStructure)(testFolderPath, exclude, style_1.Style.ClassicDashes);
        assert.strictEqual(structure.includes('test.log'), false);
    });
    test('should exclude tmp files', async () => {
        const exclude = ['*.tmp'];
        const structure = await (0, generate_structure_1.generateStructure)(testFolderPath, exclude, style_1.Style.ClassicDashes);
        assert.strictEqual(structure.includes('test.tmp'), false);
    });
    test('should exclude node_modules folder', async () => {
        const exclude = ['node_modules/**'];
        const structure = await (0, generate_structure_1.generateStructure)(testFolderPath, exclude, style_1.Style.ClassicDashes);
        assert.strictEqual(structure.includes('node_modules'), false);
    });
    test('should exclude dist folder', async () => {
        const exclude = ['dist/**'];
        const structure = await (0, generate_structure_1.generateStructure)(testFolderPath, exclude, style_1.Style.ClassicDashes);
        assert.strictEqual(structure.includes('dist'), false);
    });
    test('should exclude hidden files', async () => {
        const exclude = ['.*'];
        const structure = await (0, generate_structure_1.generateStructure)(testFolderPath, exclude, style_1.Style.ClassicDashes);
        assert.strictEqual(structure.includes('.hiddenfile'), false);
    });
    test('should exclude specific files by name', async () => {
        const exclude = ['README.md'];
        const structure = await (0, generate_structure_1.generateStructure)(testFolderPath, exclude, style_1.Style.ClassicDashes);
        assert.strictEqual(structure.includes('README.md'), false);
    });
    test('should exclude test folders', async () => {
        const exclude = ['**/test/**'];
        const structure = await (0, generate_structure_1.generateStructure)(testFolderPath, exclude, style_1.Style.ClassicDashes);
        assert.strictEqual(structure.includes('testFolder'), false);
    });
    test('should exclude spec.ts files', async () => {
        const exclude = ['**/*.spec.ts'];
        const structure = await (0, generate_structure_1.generateStructure)(testFolderPath, exclude, style_1.Style.ClassicDashes);
        assert.strictEqual(structure.includes('test.spec.ts'), false);
    });
    test('shouldExclude function works correctly', () => {
        const patterns = ['.git', 'node_modules'];
        assert.strictEqual((0, should_exclude_1.shouldExclude)('.git', patterns), true);
        assert.strictEqual((0, should_exclude_1.shouldExclude)('node_modules', patterns), true);
        assert.strictEqual((0, should_exclude_1.shouldExclude)('src', patterns), false);
    });
});
//# sourceMappingURL=excludePatterns.test.js.map