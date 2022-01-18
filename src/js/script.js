'use strict';
document.addEventListener('DOMContentLoaded' , () => {
    let night_mode = document.querySelector("input[type=checkbox][id=toggle]") ,
        numbers = document.querySelectorAll('.number') ,
        value_field = document.querySelector('.inner') ,
        clear = document.querySelector('.clear') , 
        toFloat = document.querySelector('.dot') ,
        operation = document.querySelectorAll('.calc'),
        first_operation,
        operation_2 = document.querySelectorAll('.calc_2')  ,
        bufer = ""  , operation_text , 
        equal = document.querySelector('.equal');

       function value_font(){
        switch(value_field.textContent.length){
            case 1: 
                value_field.style.cssText = 'font-size:70px';
                break;
            case 8: 
                value_field.style.cssText = 'font-size:70px';
                break;
            case 10: 
                value_field.style.cssText = 'font-size:60px';
                break;
            case 12: 
                value_field.style.cssText = 'font-size:50px';
                break; 
       }    
    }   


       function number_click(number) {
            if((value_field.textContent[0] != 0 || (value_field.textContent.length >= 2 && value_field.textContent.search('/./')))){
                if(!(value_field.textContent.length >= 13)) {
                    value_field.textContent+= number.textContent;
                    value_font();
                }
            } else if(value_field.textContent[0] == 0 && value_field.textContent.length <= 1){
                if(!(value_field.textContent.length >= 13)) {
                    value_field.textContent = number.textContent;
                    value_font();
                }
            } 
       }

        function bufer_function(operation_value) {
            let second_number = value_field.textContent;
            switch(operation_value) {
                case '+': 
                    bufer = (+bufer) + +second_number;
                    break;
                case '-': 
                    bufer = (+bufer) - +second_number;
                    break;
                case '*': 
                    bufer = (+bufer) * +second_number;
                    break;  
                case '/': 
                    bufer = (+bufer) / +second_number;
                    break;  
            } 
        }

    night_mode.addEventListener('change' , () => {
        document.body.classList.toggle('night');
    });

    numbers.forEach((number) => {
        number.addEventListener('click' , () => {
            number_click(number);
        });
    });

    clear.addEventListener('click' , () => {
        value_field.textContent = "";
        bufer = "";
    });

    toFloat.addEventListener('click' , () => {
        if(value_field.textContent.indexOf('.') === -1  ){
            if(value_field.textContent.length !== 0) {
                value_field.textContent+= toFloat.textContent;
            }
        }
    });
    
    operation.forEach((item) => {
        item.addEventListener('click' , () => {
            operation_text = item.textContent;
            if(bufer == "") {
                bufer = value_field.textContent; // 5
                first_operation = item.textContent; // +
            } else if(bufer != "") {
                bufer_function(first_operation);
                first_operation = item.textContent;
            }
            value_field.textContent = "";
        });
    });

    operation_2.forEach((item) => {
        item.addEventListener('click' , () => {
            if(bufer == "") {
                switch(item.textContent) {
                    case '%': 
                        value_field.textContent /= 100;
                        break;
                    case "+/-": 
                        value_field.textContent = -(+value_field.textContent);
                }
                bufer = value_field.textContent;
                first_operation = item.textContent;

            } else if(bufer != "") {
                bufer_function(first_operation);   
                switch(item.textContent) {
                    case '%': 
                        value_field.textContent = bufer / 100;
                        break;
                    case "+/-": 
                        value_field.textContent = -(+bufer);
                }
                bufer = "";
            }
        });
    });

    equal.addEventListener('click' , () => {
        let second_number = value_field.textContent;
        switch(operation_text) {
            case '+': 
                value_field.textContent = (+bufer) +  +second_number;
                bufer = '';
                break;
            case '-': 
                value_field.textContent = (+bufer) - +second_number;
                 bufer = '';
                break;
            case '*': 
                value_field.textContent = (+bufer) * +second_number;
                 bufer = '';
                break;  
            case '/': 
                value_field.textContent = (+bufer) / +second_number;
                 bufer = '';
                break;  
        } 
    });
});