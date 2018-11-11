var bigIntegerAdd = function(num1, num2) {
    var num1_list = num1.split(''),
        num2_list = num2.split(''),
        sum = 0, result = '';
    var t1, t2;

    while(num1_list.length || num2_list.length || sum) {

        t1 = num1_list.pop();
        t2 = num2_list.pop();
        sum += (+(t1 === undefined ? '0' : t1)) + (+(t2 === undefined ? '0' : t2));
        result = sum % 10 + result;
        sum = sum > 9;
    }
    return result.replace('^0*', '');
};


module.exports = bigIntegerAdd;
