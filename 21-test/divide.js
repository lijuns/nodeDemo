function divide(a,b){
    if(b == 0){
        throw Error('除数不能为0');
    }
    if(isNaN(a) || isNaN(b)){
        throw Error('必须是数字~');
    }
    return a/b;
}
exports.divide = divide;