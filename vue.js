// 模拟vue

// 初始化工作
// 1.代理数据：把data中的数据挂载到vm上，同时设置get，set方法
// 2.数据劫持：为data中的属性提供set()，get()；同时更新dom元素
// 3. 编译模板：处理视图中的dom


function Vue(options){
    this.$options=options
    this.$data=options.data || {}
    // el的值可以是dom元素，也可以是字符串
    const el=options.el
    this.$el=typeof el==='string'?document.querySelector(el):el


    // 1.代理数据：把data中的数据挂载到vm上，同时设置get，set方法
    this.proxyData()
    // 2.数据劫持：为data中的属性提供set()，get()；同时更新dom元素
    new Observer(this.$data) //利用构造函数单独处理data
    // 3. 编译模板：处理视图中的dom
    new Compiler(this)

}

// 代理数据
Vue.prototype.proxyData=function(){  
    Object.keys(this.$data).forEach(key=>{
        Object.defineProperty(this,key,{
            enumerable:true,
            configurable:false,
            get(){
                return this.$data[key]
            },
            set(val){
                // 如果值没有改变，直接返回
                if(val===this.$data[key]) return
                this.$data[key]=val
            }
        })
    })
}