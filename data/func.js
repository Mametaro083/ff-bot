const discord = require('discord.js')

function codeFunc(content) {
  return `\`\`\`\n${content}\n\`\`\``
}

function urlComp(url) {
  return `https://www.google.co.jp${url}`
}

class MathFunc {
	add(a , b) {
		return Number(a) + Number(b)
	}
	remove(a , b) {
		return Number(a) - Number(b)
	}
	multiply(a , b) {
		return Number(a) * Number(b)
	}
	division(a , b) {
		return Number(a) * Number(b)
	}
}

module.exports = {
  codeFunc: codeFunc,
  MathFunc: MathFunc,
  urlComp: urlComp
}
