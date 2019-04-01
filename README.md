# vscode-nls-i18n

![Node](https://img.shields.io/badge/node-%3E=7.6-blue.svg?style=flat-square)
[![npm version](https://badge.fury.io/js/vscode-nls-i18n.svg)](https://badge.fury.io/js/vscode-nls-i18n)
![Size](https://github-size-badge.herokuapp.com/axetroy/vscode-nls-i18n.svg)

vscode library for supporting i18n.

## Feature

- [x] vscode build-in i18n rules
- [x] easy to use
- [x] support arguments
- [x] fallback to `en-US`

## Usage

Make sure your vscode extension has a language file.

`package.nls.json`. `package.nls.zh-cn.json`. `package.nls.zh-tw.json` ...

eg.

```json
{
  "say.hello": "hello {0}"
}
```

```javascript
const { init, localize } = require("vscode-nls-i18n");

function activate(context) {
  init(context);
  console.log(localize("say.hello", "world")); // hello world
}
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars1.githubusercontent.com/u/9758711?v=3" width="100px;"/><br /><sub>Axetroy</sub>](http://axetroy.github.io)<br />[💻](https://github.com/axetroy/vscode-nls-i18n/commits?author=axetroy) 🔌 [⚠️](https://github.com/axetroy/vscode-nls-i18n/commits?author=axetroy) [🐛](https://github.com/axetroy/vscode-nls-i18n/issues?q=author%3Aaxetroy) 🎨 |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |


<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

The [License](https://github.com/axetroy/vscode-nls-i18n/blob/master/LICENSE)
