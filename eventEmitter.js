 // 发布订阅模式的产物bus
 function EventEmitter(){
    this.subs={}
}
// 注册事件：保存事件的类型和对应的事件处理函数
EventEmitter.prototype.$on=function(eventType,callback){
    //第一次注册  非第一次注册    
    this.subs[eventType]=this.subs[eventType] || []
    this.subs[eventType].push(callback)
}
// 触发事件：取出对应的事件处理函数并调用
EventEmitter.prototype.$emit=function(eventType,...rest){
    // 是否保存过数据
    if(this.subs[eventType]){
        this.subs[eventType].forEach(callback=>{
        callback.call(this,...rest)
    })
    }
}
const bus=new EventEmitter()
