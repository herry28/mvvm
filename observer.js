// 2.数据劫持：为data中的属性提供set()，get()；同时更新dom元素



function Observer(data){
    // 处理data
    this.$data=data
    Object.keys(data).forEach(key=>{
        this.defineReactive(this.$data,key,this.$data[key])
    })    
}



Observer.prototype.defineReactive=function(data,key,value){
  
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:false,
            get(){
                // return data[key]  get里面调用了get，死循环
                return value
            },
            set(val){
                if(val===data[key]) return
                value=val
                // 更新dom
                bus.$emit(key)
            }
        })
}