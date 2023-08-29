let prompt = require ('prompt-sync')() ;

let Stack = [], top = -1 ;


const Find_LCM = () => {
    let INTMAX = Pop (), LCM = Pop () ;
    let max, min ;

    if (INTMAX > LCM) {
        max = INTMAX ;
        min = LCM ;
    }

    else {
        max = LCM ;
        min = INTMAX ;
    }

    INTMAX = Number.MAX_VALUE ;
    LCM = 1 ;

    for (let i=1; i<INTMAX; i++) {
        LCM = max * i ;

        if (LCM % min == 0) {
            break ;
        }
    }

    Push (LCM) ;
}

const Pop = () => {
    if (top == -1) {
        return -1 ;
    }

    else {
        return Stack [top--] ;
    }
}

const Push = (data) => {
    Stack [++top] = data ;

    if (top == 1) {
        Find_LCM () ;
    }
}


const Main = () => {
    let n, data ;

    n = prompt ('\n\nEnter How many Numbers you want to find : ') ;

    console.log ("\n\nEnter the Numbers ....") ;

    for (let i=0; i<n; i++) {
        data = prompt () ;

        Push (data) ;
    }

    console.log ("\nLCM : " + Pop ()) ;
    console.log ("\n") ;
}

Main();