function isObj(value){
	return value !== null && typeof value === "object"
}
function isAsync(fn){
	return Object.prototype.toString.call (fn)=== "[object AsyncFunction]"
}
export function godefer(go){
	let stack=[]
	function defer(call){
		stack.push(call)
	}
	let blockfn=go(defer)
	let asy = isAsync(blockfn)
	if(!asy){
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
	else{
		return async (...args)=>{
			let res = await blockfn(...args)
			let named = isObj(res)
			let that = named ? res : {} 
			for(let fc of stack.reverse()){				
				fc.bind(that)()
			}
			return res
		}		
	}
}