# JigMagga2-TodoMVC
TodoMVC implemented with [JigMagga v2](https://github.com/JigMagga/) framework prototype and [Eventric](https://github.com/efacilitation/eventric) event-source framework

# Install
Clone the repo and then install dependencies by `npm install`. I used node v4.0 but it should be no problem with other 
versions too.

# Run
```
npm run start
```
this will start connect server on `localhost:8080`. Then open in browser [http://localhost:8080/page/index#/](http://localhost:8080/page/index#/)

Play with todos a bit. Add, change, make done, clear some of todos randomly. Then type in console
```
Magga.Mediator.publish('printEvents.Store.action')
```
This will show all events concerning your actions with todo list.

# Explanation to code
TBD

# TODO
* move form `eventric` 0.14 to newer version
* simplify jigs
* migrate from `browserify` to `webpack`
* migrate to `es6`
