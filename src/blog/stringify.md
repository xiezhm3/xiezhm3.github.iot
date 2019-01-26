### JSON.stringify()

1. 此函数在将 JSON 对象序列化为字符串的时候调用了 toString();
2. JSON 字符串化并非严格意义上的强制类型转换，包含了一些 toString 的规则；

   `JSON.stringify( 1 ); // "1"`

   `JSON.stringify( "1" ); // ""1""（含有双引号的字符串）`

   `JSON.stringify( null ); // "null"`

   `JSON.stringify( true ); // "true"`

3. 安全的 JSON 值（JSON-safe）都可以勇 JSON.stringify()序列化；JSON-safe 指的是能够呈现为有效的 JSON 格式的值；
4. 不安全的 JSON 值：undefined, function, symbol 和包含循环引用的对象；
5. JSON.stringify 遇到不安全的 json 值，会自动将其忽略，若包含在数组中，则返回 null

   JSON.stringify(undefined); // undefined

   JSON.stringify(function() {}); // undefined

   JSON.stringify([1, function() {}]); // "[1, null]"

   JSON.stringify({a: 2, b: function() {}}); // "{'a': 2}"

6. 对包含循环引用的对象使用 JSON.stringify 会报错
