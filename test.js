import { godefer } from "./index.js";

//basic usage
let t1 = godefer((defer) => (name) => {
	console.log("begin");
	console.log(name);
	for (let i = 1; i < 10; i++) {
		defer(() => console.log(i));
	}
	console.log("end");
	return 10;
})("hello");
console.log("t1 " + (t1 === 10 ? "success" : "fail"));

//capture named return value
let t2 = godefer((defer) => (name) => {
	console.log("begin");
	defer(function () {
		this.a += 100;
	});
	console.log("end");
	return { a: 1 };
})("hello");
console.log("t2 " + (t2.a === 101 ? "success" : "fail"));

//use try-catch
let t3;
try {
	t3 = godefer((defer) => (name) => {
		console.log("begin");
		defer(function () {
			console.log("defer");
			throw new Error("defer error");
		});
		throw new Error("main error");
		console.log("end");
		return 10;
	})("hello");
} catch (e) {
	console.log("t3 capture error", e.message);
}

//await named return value
let t4 = godefer((defer) => async (name) => {
	console.log("begin");
	defer(function () {
		this.a += 100;
		console.log("defer");
	});
	await new Promise((r) => setTimeout(r, 1000));
	console.log("end");
	return { a: 1 };
})("hello");
t4.then((v) => console.log("t4 " + (v.a === 101 ? "success" : "fail")));

//errors in async func
let t5 = godefer((defer) => async (name) => {
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
})("hello");
t5.catch((e) => console.log("t5 capture error", e.message));
