import { godefer } from "./index.js";

//basic usage
let t1 = godefer(defer => {
	console.log("begin");
	// console.log(name);
	for (let i = 1; i < 10; i++) {
		defer(() => console.log(i));
	}
	console.log("end");
	return 10;
});
console.log("t1 " + (t1 === 10 ? "success" : "fail"));

//capture named return value
let t2 = godefer(defer => {
	console.log("begin");
	defer(function () {
		this.a += 100;
	});
	console.log("end");
	return { a: 1 };
});
console.log("t2 " + (t2.a === 101 ? "success" : "fail"));

//use try-catch
let t3;
try {
	t3 = godefer(defer => {
		console.log("begin");
		defer(function () {
			console.log("defer");
			throw new Error("defer error");
		});
		throw new Error("main error");
		console.log("end");
		return 10;
	});
} catch (e) {
	console.log("t3 capture error", e.message);
}

//capture value
let t4 = godefer(defer => {
	console.log("begin");
	let a = 100;
	defer(function (a) {//formal parameter can be any another
		//console.log(a)//should be 100
		if (a !== 100)
			throw new Error('capture fail')
	}, [a])
	a += 10
	console.log("end");
	return 10;
})
console.log("t4 " + (t4 === 10 ? "success" : "fail"));

//await named return value
let t5 = godefer(async defer => {
	console.log("begin");
	defer(function () {
		this.a += 100;
		console.log("defer");
	});
	await new Promise(resolve => setTimeout(resolve, 1000));
	console.log("end");
	return { a: 1 };
})
t5.then(v => console.log("t5 " + (v.a === 101 ? "success" : "fail")));

//errors in async func
let t6 = godefer(async defer => {
	console.log("begin");
	defer(function () {
		this.a += 100;
		console.log("defer");
		throw new Error("defer error");
	});
	await new Promise((r) => setTimeout(r, 1000));
	throw new Error("main error");
	console.log("end");
	return { a: 1 };
});
t6.catch(e => console.log("t6 capture error", e.message));