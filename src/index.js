/*
 * @Author: Yzed 
 * @Date: 2019-03-21 08:30:24 
 * @Last Modified by:   Yzed 
 * @Last Modified time: 2019-03-21 08:30:24 
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')
const rl = readline.createInterface({
    input:process.stdin
})

let main = {
    operator : {
        list: ['+', '-', '*', '÷'],
        num: 0
    },

    init: function(){
        this.handle()
    },

    handle: function(){
        let _this = this
        rl.on('line',function(input){
            //读入参数num
            _this.operator.num = input
            _this.write(_this.operator.num)
            rl.close()
        })
        rl.on('close',function(){
            process.exit(0)
        })

    },
    write: function(n){

        let totalFormula,param,tolRes
        let resFile = path.resolve(__dirname,'../result.txt')
            forArr = ['2017011776']

        for(let i=0;i<n;i++){
            param = this.operate()
            totalFormula = `${param.formula}=${param.res}`
            forArr.push(totalFormula)
        }
        tolRes = forArr.join('\n')
        console.log(tolRes)
        fs.writeFileSync(resFile, tolRes)
        console.log('\nFile writed successed.')
            
        
    },
    operate: function(){

        let param = {}

        let ins = Math.floor(Math.random() * 3 + 2 )
        let a = Math.floor(Math.random() * 100 + 1 )
        let x = a
        let out = []
        let forStr

        out.push(a)
        
        for(let i=0;i<=ins;i++){
            let c = this.operator.list[Math.floor(Math.random() * 4)]
            let y = Math.floor(Math.random() * 100 + 1)

            if( c == '+'){
                a = a + y
            }

            if( c == '-'){
                if(x - y < 0){
                    y = Math.floor(Math.random() * a + 1)
                }
                a = a - y

            }

            if( c == '*'){
                a = a * y
            }

            if( c == '÷'){
                do{
                    y = Math.floor(Math.random() * a + 1)
                    if(y == 0){
                        continue
                    }
                }while(x % y != 0)

                a = a / y
                
            }

            out.push(c)
            out.push(y)
        }

        param.formula = out.join('')
        forStr = param.formula.replace(/\÷/g,'/')
        param.res = eval(forStr)

        if(param.res<0 || param.res%1!=0 || param.res>2000){

            param  = this.operate()
        }

        return param
    }
}

main.init()