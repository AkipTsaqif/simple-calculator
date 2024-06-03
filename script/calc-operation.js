const MAX_DIGITS = 13;
const RESULT = document.getElementById('result');
const OPS_DISPLAY = document.getElementById('ops-display');
const BUTTONS = document.querySelectorAll('button');

let firstNumberOrAnswer=''
let secondNumber=''
let operatorPressed=false
let operator=''

const computations={
    "add":(num1,num2)=>{
        return num1+num2
    },
    "subtract":(num1,num2)=>{
        return num1-num2
    },
    "multiply":(num1,num2)=>{
       return num1*num2
    },
    "divide":(num1,num2)=>{
        return num1/num2
    }
}
const computationsSymbols={
    "add":'+',
    "subtract":'-',
    "multiply":'x',
    "divide":'/'
}

const buttonHandler=(button)=>{
    const firstTwoLetters=button.slice(0,2);
    const lastLettersAfter=button.slice(2,button.length)
    switch(firstTwoLetters){
        case('no'):
            return ()=>{
                if(!operatorPressed)firstNumberOrAnswer+= lastLettersAfter
                else secondNumber+=lastLettersAfter
            }
        case('po'):
        return ()=>{
            if(!operatorPressed&&!firstNumberOrAnswer.includes('.'))firstNumberOrAnswer+= '.'
            else if(operatorPressed&&!secondNumber.includes('.')) secondNumber+='.'
        }
        case('op'):
            return ()=>{
                if(!operatorPressed){
                    operatorPressed=true
                }
                else if(operatorPressed&&secondNumber===''){
                    operator=lastLettersAfter
                }else compute(firstNumberOrAnswer,secondNumber,operator)
                operator=lastLettersAfter
            }
        case('eq'):
            return()=>{
                if(secondNumber){
                compute(firstNumberOrAnswer,secondNumber,operator)
                operatorPressed=false
                operator=''
                }
            } 
        case('cl'):
            return()=>{
                firstNumberOrAnswer=''
                secondNumber=''
                operatorPressed=false
                operator=''
                RESULT.textContent='0'
            }
        case('si'):
            return()=>{
                    if(!operatorPressed)firstNumberOrAnswer[0]!='-'?firstNumberOrAnswer='-'+firstNumberOrAnswer:firstNumberOrAnswer.slice(1)
                    else secondNumber[0]!='-'?secondNumber='-'+secondNumber:secondNumber.slice(1)
            }
    }  
}
const keyHandlers = {
    'no1':1,
    'no2':2,
    'no3':3,
    'no4':4,
    'no5':5,
    'no6':6,
    'no7':7,
    'no8':8,
    'no9':9,
    "opadd":'+',
    "opsubtract":"-",
    "opmultiply":'*',
    "no0":0,
    "point":".",
    "opdivide":"/",
    "clear":'Delete',
    "equal":'='
};

Array.from(buttons).forEach((button)=>{
    const id=button.id
    button.addEventListener('click',()=>{
        buttonHandler(id)()
        OPS_DISPLAY.innerText=`${firstNumberOrAnswer} ${computationsSymbols[operator]?computationsSymbols[operator]:''} ${secondNumber}`
    })
    document.addEventListener('keydown',(e)=>{
        if(e.key===`${keyHandlers[id]}`){
            buttonHandler(id)()
            OPS_DISPLAY.innerText=`${firstNumberOrAnswer} ${computationsSymbols[operator]?computationsSymbols[operator]:''} ${secondNumber}`
        }
        
    })
})

const compute =(numString1,numString2,operation)=>{
    const num1=parseFloat(numString1);
    const num2=parseFloat(numString2);
    const computed=computations[operation](num1,num2)
    const answer=Number(computed.toFixed(4))
    if(!isNaN(answer)){
        firstNumberOrAnswer= Number(computed.toFixed(4)).toString()
        secondNumber=''
        RESULT.textContent=Number(computed.toFixed(4))
        operator=''
    }else{
        firstNumberOrAnswer= '0'
        secondNumber=''
        RESULT.textContent=0
        operator=''
    }
}