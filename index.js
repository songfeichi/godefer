function isObj(value) {
	return value !== null && typeof value === "object"
}
function isAsync(fn) {
	return Object.prototype.toString.call(fn) === "[object AsyncFunction]"
}
export function godefer(fn) {
	let stack = []
	function defer(cb, capt = []) {
		stack.push([cb, capt])
	}
	let asy = isAsync(fn)
	if (!asy) {
		return (() => {
			try {
				var res = fn(defer)
			}
			finally {
				let named = isObj(res)
				let that = named ? res : {}
				for (let [cb, capt] of stack.reverse()) {
					cb.bind(that)(...capt)
				}
			}
			return res
		})()
	}
	else {
		return (async () => {
			try {
				var res = await fn(defer)
			}
			finally {
				let named = isObj(res)
				let that = named ? res : {}
				for (let [cb, capt] of stack.reverse()) {
					cb.bind(that)(...capt)
				}
			}
			return res
		})()
	}
}