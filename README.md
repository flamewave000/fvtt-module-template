# FoundryVTT Module Template

A TypeScript+Gulp template for a more automated FoundryVTT module development.

In this system, you perform minimal changes to the `module.json` as it is populated automatically.

### Table of Contents

- [How to Use](#How-to-Use)
- [Folder Structure](#Folder-Structure)
- [Project Files](#Project-Files)
- [Module Manifest File](#Module-Manifest-File)
- [NPM Package File](#NPM-Package-File)
- [Gulp File and TS Config](#Gulp-File-and-TS-Config)

## How to Use

Clone the repository

```
     HTTPS: git clone https://github.com/flamewave000/fvtt-module-template.git
       SSH: git clone git@github.com:flamewave000/fvtt-module-template.git
GitHub CLI: gh repo clone flamewave000/fvtt-module-template
```

Install NodeJS if you don't already have it: [NodeJS](https://nodejs.org)

Run the NPM installer inside the project directory

```bash
cd path/to/fvtt-module-template
npm install
```

You can then move on to updating the `package.json` and `module.json` files with your Module's details. Once that is finished, below are the different commands you can run. They only operate when you are in the project's directory.

Each of these commands are executed as follows:

```bash
# replace <command> with one of the commands described below
npm run <command>
# For example:
npm run build
```

| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `build`             | This is the basic Build command. It will compile the code and output everything into the `dist/` directory. This is a ready to use output of the module. |
| `watch`     | This will run the Live Build process. This will monitor your project's files and whenever one of them changes, it will immediately process the changes output the new contents to the `dist/` directory. |
| `clean`     | This will "Clean" the directory by removing the `dist/` and `bundle/` directories. |
| `devbuild` | This is the same as the `build` command, except instead of outputting everything to the `dist/` folder, it will output the files to the `devDist` folder that is defined in the `package.json`. This will create the module's directory if it doesn't exists already, clear the contents of the directory, and then place the new project files in it. |
| `devwatch` | This is the same as the `watch` command, but just like the `devbuild` command, it outputs the updated files to the `devDist` directory defined in the `package.json`. This is the recommended command to use while you are working on your module. It will take care of updating the module in FoundryVTT so all you have to do is switch to the app and hit `F5` to refresh the page. |
| `devclean` | This will remove all the contents in the defined `devDist` folder. |
| `release`   | Builds and compresses the project into a ZIP file and places it and a copy of the compiled `module.json` file in the `bundle/` directory. This is ready for being referenced by the FoundryVTT Module system for the community to install your module. |

[top](#table-of-contents)

## Folder Structure

| Folder Name             | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `src/`                  | The directory containing all of your `.js` and `.ts` code files. |
| `lang/`                 | The directory containing your localization strings files.    |
| `dist/` (generated)     | This will contain the compiled source code, templates, project files, styles, and manifest. The contents can be directly copied to a FoundryVTT's modules directory, or zipped into a bundle for installing. |
| `css/` (optional)       | The directory containing any CSS you might have. This is an optional directory as not everyone is going to be editing HTML. If you exclude this, make sure to remove the `"styles": "{{css}}"` field from the `module.json` file. |
| `templates/` (optional) | The directory containing your Handlebars HTML template files. This is an optional directory. |

[top](#table-of-contents)

## Project Files

| File            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `.gitignore`    | This is used to ignore files and folders you don't want to be included in the git repository. |
| `CHANGELOG.md`  | A MarkDown file for describing the project's history of changes |
| `gulpfile.js`   | Gulp File that contains the various build scripts used automating the module building, live building, and packaging. |
| `LICENSE`       | UPDATE THIS FILE! The Copyright License for your project. GitHub has a very helpful page for [picking and appropriate license](https://choosealicense.com/) for your project. |
| `module.json`   | The FoundryVTT Module Manifest file that describes everything about your module. |
| `package.json`  | The NPM Package configuration. This contains additional information that is used in the build automation process. |
| `README.md`     | MarkDown file you can use to describe what your module is and how to use it. |
| `tsconfig.json` | TypeScript configuration. This defines the various settings used by the TypeScript transpiler. |

[top](#table-of-contents)

## Module Manifest File

The module manifest does not contain too much that needs to be updated. There are certain variables that will be available when building. The manifest runs through a compilation and is injected with data from the build process and output to the `dist/` directory along with everything else.

| Variable      | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `{{name}}`    | The Module's package name. This will not be visible to users, but must be a unique name in the FoundryVTT module system.<br />*This value is defined in the `package.json`* |
| `{{title}}`   | The User facing name for the module.<br />*This value is defined in the `package.json`* |
| `{{version}}` | The version of the module. This should follow the standardized [Semantic Versioning](https://semver.org).<br />*This value is defined in the `package.json`* |
| `{{sources}}` | The `"{{sources}}"` portions(including the quotes) will be replaced with a JSON array of all source files found in the `src/` directory.<br />*This is assembled at build time.* |
| `{{css}}`     | The `"{{css}}"` portion (including the quotes) will be replaced with a JSON array of all styling files found in the `css/` directory.<br />*This is assembled at build time.* |

The `module.json` file contains sections that will need to be updated. You can see a commented version below:

```jsonc
/* file: module.json */
{
	/* module package name, pulled from the package.json */
	"name": "{{name}}",
	/* module title, pulled from the package.json */
	"title": "{{title}}",
	/* module description, pulled from the package.json */
	"description": "{{description}}",
	/* module version, pulled from the package.json */
	"version": "{{version}}",
	/* Author's name, this should be updated to be your Name/UserName */
	"author": "<<your name here>>",
	/* The minimum version of FoundryVTT supported */
	"minimumCoreVersion": "0.7.9",
	/* The target version of FoundryVTT */
	"compatibleCoreVersion": "0.7.9",
	/* (DO NOT EDIT) The source files list. Generated by the build process */
	"esmodules": "{{sources}}",
	/* (DO NOT EDIT) The CSS files list. Generated by the build process.
	 * If you do not have CSS, you will have to remove the line entirely.
     */
	"styles": "{{css}}",
	/* List of your module's supported languages and their strings file paths */
	"languages": [
		{ "lang": "en", "name": "English", "path": "lang/en.json" }
	],
	/* These are the standard Manifest URLs that need to be updated
	 * for your project. Please refer to the official documentation.
	 */
	"url":		"https://path.url/to/project/{{name}}",
	"license":	"https://path.url/to/project/{{name}}/LICENSE",
	"manifest":	"https://path.url/to/project/{{name}}/bundle/module.json",
	"download":	"https://path.url/to/project/{{name}}/bundle/{{name}}.zip",
	"readme":	"https://path.url/to/project/{{name}}/README.md",
	"changelog":"https://path.url/to/project/{{name}}/CHANGELOG.md"
}
```

[top](#table-of-contents)

## NPM Package File

The NPM Package file is used by NPM to handle the project dependencies and to run the Gulp builder. There are a couple of things that need to be updated in this file for your new module.

```jsonc
{
    /* Update this to your unique package name (no spaces!) */
	"name": "module-package-name",
    /* Update this with the displayed name */
	"title": "My Awesome Module!",
    /* This is the Semantic Version of you module */
	"version": "1.0.0",
    /* The short description FoundryVTT shows in the Module Managers */
	"description": "Module description displayed in FoundryVTT Program",
    /* This is the absolute path to your local FoundryVTT Data Folder's
     * modules directory. This is used for the Live Dev Build process.
     * Gulp will monitor changes to your project files and automatically
     * build and deploy the module to this location. All you have to do
     * is refresh the page and see your changes almost immediately!
     */
	"devDir": "/path/to/FoundryVTT/Data/modules/",
    /* (DO NOT EDIT), this is where the build commads are defined */
	"scripts": {
		"build": "npx gulp",
		"start": "npx gulp watch",
		"clean": "npx gulp clean",
		"dev-build": "npx gulp dev",
		"dev-start": "npx gulp devWatch",
		"dev-clean": "npx gulp devClean",
		"release": "npx gulp zip"
	},
    /* (DO NOT EDIT) These are the NPM dependencies used to build the project */
	"devDependencies": {
		"@types/node": "^14.14.21",
		"del": "^6.0.0",
		"foundry-vtt-types": "github:kmoschcau/foundry-vtt-types#foundry-0.7.9",
		"gulp": "^4.0.2",
		"gulp-cli": "^2.3.0",
		"gulp-minify": "^3.1.0",
		"gulp-rename": "^2.0.0",
		"gulp-sourcemaps": "^3.0.0",
		"gulp-tabify": "0.0.2",
		"gulp-typescript": "^6.0.0-alpha.1",
		"gulp-zip": "^5.0.2",
		"typescript": "^4.1.3"
	}
}
```

[top](#table-of-contents)

## Gulp File and TS Config

Unless you know what you're doing, it's usually best to leave these be until you get more experience. But once you do, have fun!

The `gulpfile.js` defines the build scripts that are executed by the NPM commands. These perform the TypeScript transpiling and and everything else needed to build your module.

The `tsconfig.json` file contains all the options used to configure the TypeScript transpiler. This file contains all of the options, and comments about what those options do. Don't be afraid to read through it and try out some of the options that interest you.

[top](#table-of-contents)
