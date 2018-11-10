var thenable = {
    then: function(resolve, reject) {
        return resolve(42);
    }
};

var p = Promise.resolve(thenable);
p.then(function(value){
    console.log(value);  // 42
});
