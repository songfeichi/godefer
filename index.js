function isObj(value) {
	return value !== null && typeof value === "object"
}
function isAsync(fn) {
	return Object.prototype.toString.call(fn) === "[object AsyncFunction]"
}
export function godefer(go) {
	let stack = []
	function defer(cb, capt = []) {
		stack.push([cb, capt])
	}
	let blockfn = go(defer)
	let asy = isAsync(blockfn)
	if (!asy) {
		return (...args) => {
			try {
				var res = blockfn(...args)
			}
			finally {
				let named = isObj(res)
				let that = named ? res : {}
				for (let [cb, capt] of stack.reverse()) {
					cb.bind(that)(...capt)
				}
			}
			return res
		}
	}
	else {
		return async (...args) => {
			try {
				var res = await blockfn(...args)
			}
			finally {
				let named = isObj(res)
				let that = named ? res : {}
				for (let [cb, capt] of stack.reverse()) {
					cb.bind(that)(...capt)
				}
			}
			return res
		}
	}
}