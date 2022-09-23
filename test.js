import {godefer} from './index.js'

let res = godefer(defer=>(name)=>{
	console.log("begin")
	console.log(name)
	defer(function(){
		//console.log(this)
		this.a+=100
	})
	defer(()=>100)
	for(let i=1;i<10;i++){
		defer(()=>console.log(i))
	}

	console.log("end")
	return 10
})('hello')
console.log('res= ',res)

let res1 = godefer(defer=>(name)=>{
	console.log("begin")
	console.log(name)
	defer(function(){
		//console.log(this)
		this.a+=100
	})
	defer(()=>100)
	for(let i=1;i<10;i++){
		defer(()=>console.log(i))
	}

	console.log("end")
	return {a:1}
})('hello')
console.log('res1= ',res1)

let res2 = godefer(defer=>async (name)=>{
	console.log("begin")
	console.log(name)
	defer(function(){
		//console.log(this)
		//this.a+=100
		this.a+=1000
	})
	defer(()=>100)
	for(let i=1;i<10;i++){
		defer(()=>console.log(i))
	}
	await new Promise(r => setTimeout(r, 1000));
	console.log("end")
	return {a:1}
})('hello')
res2.then(()=>console.log('res2= ',res2))
