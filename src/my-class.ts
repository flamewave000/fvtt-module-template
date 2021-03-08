export default class MyClass {
	static async showExampleDialog() {
		await Dialog.confirm({
			title: game.i18n.localize('MODULE_PACKAGE_NAME.ExampleDialog_Title'),
			content: game.i18n.localize('MODULE_PACKAGE_NAME.ExampleDialog_Content')
		})
	}
}