function divide(a, b) {
    if (b == 0) {
        throw Error('除数不能为0');
    }
    if (isNaN(a) || isNaN(b)) {
        throw Error('必须是数字~');
    }
    window.name = 'tyh';
    return a / b;
}

var should = chai.should();

describe('我要测试一个除法', function () {
    it('4除以2等于2', function () {
        divide(4, 2).should.equal(2);
    });
    it('window.name 应该赋值了', function () {
        (window.name).should.equal('tyh');
    })
});