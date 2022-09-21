function isObj(value){
	return value !== null && typeof value === "object"
}

export function godefer(go){
	let stack=[]
	function defer(call){
		stack.push(call)
	}
	let blockfn=go(defer)
	return (...args)=>{
		let res = blockfn(...args)
		let named = isObj(res)
		let that = named ? res : {} 
		for(let fc of stack.reverse()){				
			fc.bind(that)()
		}
		return res
	}
}