


function Compiler(vm){
    this.$vm=vm
    this.compile(this.$vm.$el)
}


// 编译模板
Compiler.prototype.compile=function(el){

    // 遍历el
    Array.from(el.childNodes).forEach(node=>{
         // 判断类型
    if(this.isTextNode(node)){
        this.compileTextNode(node)
    }
    if(this.isElementNode(node)){
        this.compileElementNode(node)
        // 当是元素节点时，继续调用
        this.compile(node)
    }
    }) 
}


// 核心函数
// 1.编译文本节点
Compiler.prototype.compileTextNode=function(node){
    const text=node.textContent
    const reg=/\{\{(.+)\}\}/
    if(reg.test(text)){
        //取出复合条件的变量
        const key=RegExp.$1.trim()
        // 赋值
        node.textContent=this.$vm.$data[key]
        // 数据改变时，注册时间
        bus.$on(key,()=>{
            node.textContent=this.$vm.$data[key] //更新数据
        })

    }
}
// 2.编译元素节点
Compiler.prototype.compileElementNode=function(node){
    // 找到所有的属性
    Array.from(node.attributes).forEach(attr=>{
        const attrName=attr.name
        const value=attr.value
        // 筛选出指令属性
        if(this.isDirective(attrName)){
            // 处理具体的某个指令
            if(attrName==='v-text'){
                node.textContent=this.$vm.$data[value]
                // 注册事件
                bus.$on(value,()=>{
                    node.textContent=this.$vm.$data[value]
                })
            }
            if(attrName==='v-model'){
               node.value=this.$vm.$data[value]
                // 注册事件
                bus.$on(value,()=>{
                    node.value=this.$vm.$data[value]
                })
                // 绑定input事件
                node.oninput=()=>{
                    this.$vm.$data[value]=node.value
                }
            }
        }
        
    })
    
}




// 辅助函数
// 1.判断文本节点
Compiler.prototype.isTextNode=function(node){
    return node.nodeType===3
}
// 2.判断元素节点
Compiler.prototype.isElementNode=function(node){
    return node.nodeType===1
}
// 3.判断属性名字是否是指令
Compiler.prototype.isDirective=function(attrName){
    return attrName.startsWith('v-')
}