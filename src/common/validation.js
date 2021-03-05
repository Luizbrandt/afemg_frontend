export default{
    cpfValidation: (number) => {
        let sum = 0;
        let  rest = 0;
        if (number == "00000000000") return false;
        if (number == "11111111111") return false;
        if (number == "22222222222") return false;
        if (number == "33333333333") return false;
        if (number == "44444444444") return false;
        if (number == "55555555555") return false;
        if (number == "66666666666") return false;
        if (number == "77777777777") return false;
        if (number == "88888888888") return false;
        if (number == "99999999999") return false;
    
        for (let i=1; i<=9; i++) sum = sum + parseInt(number.substring(i-1, i)) * (11 - i);
            rest = (sum * 10) % 11;
    
        if ((rest == 10) || (rest == 11))  rest = 0;
        if (rest != parseInt(number.substring(9, 10)) ) return false;
    
        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(number.substring(i-1, i)) * (12 - i);
        rest = (sum * 10) % 11;
    
        if ((rest == 10) || (rest == 11))  rest = 0;
        if (rest != parseInt(number.substring(10, 11) ) ) return false;
        return true;
    }
} 