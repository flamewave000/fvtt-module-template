
// While the file technically ends in '.ts', esmodule imports need to use the '.js' extension to work in the browser.
import MyClass from './my-class.js';

// Hooks.once('init', function() {
// });

// Hooks.once('setup', function() {
// });

Hooks.once('ready', async function() {
	await MyClass.showExampleDialog();
});