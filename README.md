Golang Defer implement in Javascript

The behavior of defer statements is straightforward and predictable. There are three simple rules:

1. A deferred function’s arguments are evaluated when the defer statement is evaluated.  
√, although you must manually pass arguments.
2. Deferred function calls are executed in Last In First Out order after the surrounding function returns.  
√, just reverse the stack!
3. Deferred functions may read and assign to the returning function’s named return values.  
√, no if return a value, yes return an object. Support async function.

#Usage:
```
godefer(defer=>(args)=>{
	...somecode
	defer(somefunc)
	...somecode
	return 42 //return an object for named return values
})('hello')
```
see more usage in test.js