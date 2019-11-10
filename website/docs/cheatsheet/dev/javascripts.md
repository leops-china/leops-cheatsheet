##　简介

> **JavaScript 是属于 HTML 和 Web 的编程语言。**



```javascript
"use strict"; // 定义 JavaScript 代码应该以“严格模式”执行。
```



## Document

```javascript
document.getElementById("demo").innerHTML = "Hello JavaScript"; // 改变html内容
document.getElementById("demo").style.fontSize = "25px";   // 改变html css样式
document.getElementById("demo").style.display="none";  // 隐藏元素
document.getElementById("demo").style.display="block";  //显示元素

```



## 使用

```html
// 包裹在script 标签中, script标签可以放在html页面的body和head中
<script >
document.getElementById("demo").innerHTML = "我的第一段 JavaScript";
</script>

// 引入外部
<script src="https://www.demo.com/js/myScript1.js"></script>
<script src="/js/myScript1.js"></script>
```



##  输出

```javascript
window.alert(5 + 6);  // 写入警告框
document.write(5 + 6); // 写入 HTML 输出, 在HTML文档完全加载后使用将删除所有已有的HTML
document.getElementById("demo").innerHTML = 5 + 6;   // 写入 HTML 元素
console.log(5 + 6);  // 写入浏览器控制台
```



## 语法格式

```javascript
a = 5;  // 分号分隔 JavaScript 语句。
a = 5; b = 6; c = a + b;  // 可以在一行写多条语句

function myFunction() {           // 使用{}包含代码块
    document.getElementById("demo").innerHTML = "Hello Kitty.";
    document.getElementById("myDIV").innerHTML = "How are you?";
}
// 表示为注释语句，后面的代码将不会执行
/* 这个也是注释 */
var x, y;	// 声明变量, var被称作为关键词，用户标识被执行的动作
var total = price1 + price2 + price3;
var person = "Bill Gates", carName = "porsche", price = 15000;

x = 7; y = 8;	// 赋值
z = x + y;	// 计算值

lastName = "Gates"; lastname = "Jobs";  // JavaScript 对大小写敏感 
firstName = "Lili"  // JavaScript 与驼峰式大小写
```



## 运算符

```javascript
var x = 7;		// 向 x 赋值 5
var y = 8;		// 向 y 赋值 2
var z = x + y;		// 向 z (x + y) 赋值 7

// 字符串运算
x = '7' + '8';  // 78
y = "7" + 8; // 78
z = "Hello" + 7; // Hello7
```
算数运算符

| 运算符 | 描述 |
| :----- | :--- |
| +      | 加法 |
| -      | 减法 |
| *      | 乘法 |
| /      | 除法 |
| %      | 系数 |
| ++     | 递加 |
| --     | 递减 |

赋值运算符

| 运算符 | 例子     | 等同于      |
| :----- | :------- | :---------- |
| =      | x = y    | x = y       |
| +=     | x += y   | x = x + y   |
| -=     | x -= y   | x = x - y   |
| *=     | x *= y   | x = x * y   |
| /=     | x /= y   | x = x / y   |
| %=     | x %= y   | x = x % y   |
| <<=    | x <<= y  | x = x << y  |
| >>=    | x >>= y  | x = x >> y  |
| >>>=   | x >>>= y | x = x >>> y |
| &=     | x &= y   | x = x & y   |
| ^=     | x ^= y   | x = x ^ y   |
| \|=    | x \|= y  | x = x \| y  |
| **=    | x **= y  | x = x ** y  |

JavaScript 比较运算符

| 运算符 | 描述           |
| :----- | :------------- |
| ==     | 等于           |
| ===    | 等值等型       |
| !=     | 不相等         |
| !==    | 不等值或不等型 |
| >      | 大于           |
| <      | 小于           |
| >=     | 大于或等于     |
| <=     | 小于或等于     |
| ?      | 三元运算符     |

JavaScript 逻辑运算符

| 运算符 | 描述   |
| :----- | :----- |
| &&     | 逻辑与 |
| \|\|   | 逻辑或 |
| !      | 逻辑非 |

JavaScript 类型运算符

| 运算符     | 描述                                  |
| :--------- | :------------------------------------ |
| typeof     | 返回变量的类型。                      |
| instanceof | 返回 true，如果对象是对象类型的实例。 |

JavaScript 位运算符

位运算符处理 32 位数。

该运算中的任何数值运算数都会被转换为 32 位的数。结果会被转换回 JavaScript 数。

| 运算符 | 描述         | 例子    | 等同于       | 结果 | 十进制 |
| :----- | :----------- | :------ | :----------- | :--- | :----- |
| &      | 与           | 5 & 1   | 0101 & 0001  | 0001 | 1      |
| \|     | 或           | 5 \| 1  | 0101 \| 0001 | 0101 | 5      |
| ~      | 非           | ~ 5     | ~0101        | 1010 | 10     |
| ^      | 异或         | 5 ^ 1   | 0101 ^ 0001  | 0100 | 4      |
| <<     | 零填充左位移 | 5 << 1  | 0101 << 1    | 1010 | 10     |
| >>     | 有符号右位移 | 5 >> 1  | 0101 >> 1    | 0010 | 2      |
| >>>    | 零填充右位移 | 5 >>> 1 | 0101 >>> 1   | 0010 | 2      |

## 数据类型

```javascript
var length = 7;                             // 数字
var lastName = "Gates";                      // 字符串
var cars = ["Porsche", "Volvo", "BMW"];         // 数组
var x = {firstName:"Bill", lastName:"Gates"};    // 对象 
var x = true; y=false; // boolean布尔值

typeof "Bill Gates"          // 返回 "string", 确定变量的类型
typeof [1,2,3,4]             // 返回 "object", 在 JavaScript 中数组即对象
typeof {name:'Bill', age:62} // 返回 "object"
typeof null                  // 返回 "object"
typeof function myFunc(){}   // 返回 "function"

var person;                  // 值是 undefined，类型是 undefined
person = undefined;          // 值是 undefined，类型是 undefined
var car = "";                // 值是 ""，类型是 "string"
var person = null;           // 值是 null，但是类型仍然是对象

typeof undefined              // undefined
typeof null                   // object
null === undefined            // false
null == undefined             // true
```



##  函数

```javascript
function myFunction(p1, p2) {    // 使用function定义函数
    return p1 * p2;              // 该函数返回 p1 和 p2 的乘积
}
var x = myFunction(4, 3);        // 调用函数，返回值被赋值给 x
var x = myFunction;        // 将函数对象赋值给x

// 局部变量
// 此处的代码不能使用 carName

function myFunction() {
    var carName = "Volvo";
    // code here CAN use carName
}

// 此处的代码可以使用 carName
```



## 对象

```javascript
var x = new String();        // 把 x 声明为 String 对象
var y = new Number();        // 把 y 声明为 Number 对象
var z = new Boolean();       //	把 z 声明为 Boolean 对象

// 声明单一值的对象
var car = "porsche";

// 声明多个值对象
var person = {
  firstName: "Bill",
  lastName : "Gates",
  id       : 678,
  fullName : function() {
    return this.firstName + " " + this.lastName;   // this 引用该函数的“拥有者”。
  }
};

person.firstName;  // 访问对象属性
person['firstName']; // 访问对象属性
person.fullName();  // 访问对象方法
person.fullName;  // 访问对象方法,返回函数定义

```



## 字符串

```javascript
var value = "Bill Gates";  // 定义字符串
var x = "中国是瓷器的故乡，因此 china 与\"China（中国）\"同名。";   // \ 转义字符也可用于在字符串中插入其他特殊字符。
value.length // length 返回字符串长度
x.indexOf("China"); //indexOf() 方法返回字符串中指定文本首次出现的索引（位置）,未找到返回-1
x.lastIndexOf("China"); //lastIndexOf() 方法返回指定文本在字符串中最后一次出现的索引,未找到返回-1
x.search("China"); // search() 方法搜索特定值的字符串，并返回匹配的位置,未找到返回-1
x.slice(7,13);  // slice() 提取字符串的某个部分并在新字符串中返回被提取的部分。
str.substring(7,13); // substring() 类似于 slice(),但不能接受负索引
str.substr(7,6); //类似于 slice(),不同之处在于第二个参数规定被提取部分的长度。
x.toUpperCase();  // 转换为大写的
x.toLowerCase();  // 转换为小写的
var text = "Hello".concat(" ","World!") // concat() 连接两个或多个字符串
"       Hello World!        ".trim(); // trim() 方法删除字符串两端的空白符：
"HELLO WORLD".charAt(0); //charAt() 方法返回字符串中指定下标（位置）的字符串：
"HELLO WORLD".charCodeAt(0); // 返回 72 charCodeAt() 方法返回字符串中指定索引的字符 unicode 编码：
"HELLO WORLD"[0]; // 返回H,ECMAScript 5 (2009) 允许对字符串的属性访问 []

"a,b,c,d,e".split(",");          // split() 将字符串转换为数组，用逗号分隔
"a,b,c,d,e".split(" ");          // split() 将字符串转换为数组，用空格分隔
"a,b,c,d,e".split("|");          // split() 将字符串转换为数组，用竖线分隔

var textValue=value;
textValue = textValue.replace(/\s+$/, '');//去掉后面空格
textValue=textValue.replace(/[\r\n]/g,'');//去除换行.
textValue = textValue.replace(/[0-9]/g, '全');//把数字用全角符代替
textValue = textValue.replace(/\s/g, '全');//把空格用全角符代替
textValue = textValue.replace(/[\u0000-\u00FF]/g, 'a');//所有半角符变为 a
textValue = textValue.replace(/a+/g, 'b');//把字符串变成b
```

##　数值

```javascript
var x = 3.14;    // 带小数点的数值
var y = 3;       // 不带小数点的数值

var x = 123e5;    // 12300000   科学计数法
var y = 123e-5;   // 0.00123 科学计数法

var x = 999999999999999;   // x 将是 999999999999999
var y = 9999999999999999;  // y 将是 10000000000000000

var y = new Number(123);   // 数值对象
500 == new Number(500);   // true, 有相等的值
500 === new Number(500);   // false, 类型不同
new Number(500) === new Number(500) ;   // false, 对象无法比较

var x = 0xFF;             // x 将是 255 16进制
var myNumber = 128;
myNumber.toString(16);     // 返回 16进制 80
myNumber.toString(8);      // 返回 8进制 200
myNumber.toString(2);      // 返回 2进制 10000000

var x = 100;         // x 是数字
var y = "100";       // y 是字符串
var z = x / y;       // z 将是 1

var x = 100 / "Apple";  // x 将是 NaN（Not a Number），NaN 属于 JavaScript 保留词，指示某个数不是合法数。
var z = NaN + 5;         // z 将是 NaN
var z = NaN + '5';         // z 将是 NaN5

var x =  2 / 0;          // x 将是 Infinity, 是 JavaScript 在计算数时超出最大可能数范围时返回的值。
var y = -2 / 0;          // y 将是 -Infinity, 是 JavaScript 在计算数时超出最大可能数范围时返回的值。

var x = 123.123;
x.toString();            // 从变量 x 返回 123 toString() 以字符串返回数值。
(123).toString();        // 从文本 123 返回 123
(100 + 23).toString();   // 从表达式 100 + 23 返回 123

x.toFixed(0);           // 返回 123  toFixed() 返回字符串值，它包含了指定位数小数的数字：
x.toFixed(2);           // 返回 123.12
x.toFixed(4);           // 返回 123.1230

x.toPrecision()          // 返回123.123  toPrecision()返回字符串值，它包含了指定长度的数字
x.toPrecision(2)          // 返回1.2e+2
x.toPrecision(4)          // 返回123.1

x.valueOf();            // 从变量 x 返回 123 valueOf() 以数值返回数值

Number(true);        // 返回 1  Number() 可用于把 JavaScript 变量转换为数值
Number(false);        // 返回 0
Number(new Date());        // 返回 1404568027739
Number("10");        // 返回 10
Number("10 20);        // 返回 NaN
       
parseInt("10");         // 返回 10 parseInt() 解析一段字符串并返回数值。允许空格。只返回首个数字：
parseInt("10.33");      // 返回 10
parseInt("10 20 30");   // 返回 10
parseInt("10 years");   // 返回 10
parseInt("years 10");   // 返回 NaN


parseFloat("10");        // 返回 10  parseFloat() 解析一段字符串并返回数值。允许空格。只返回首个数字
parseFloat("10.33");     // 返回 10.33
parseFloat("10 20 30");  // 返回 10
parseFloat("10 years");  // 返回 10
parseFloat("years 10");  // 返回 NaN

Number.MAX_VALUE; //MAX_VALUE 返回 JavaScript 中可能的最大数字。
Number.MIN_VALUE; //MIN_VALUE 返回 JavaScript 中可能的最小数字。
Number.POSITIVE_INFINITY;  // Infinity 表示无穷大（溢出返回）。
Number.NEGATIVE_INFINITY;  // -Infinity 表示负的无穷大（溢出返回）。
Number.NaN; // 表示非数字值（"Not-a-Number"）。

var x = 6;
var y = x.MAX_VALUE;    // y 成为 undefined,数字属性不可用于变量
```



## 数组

```javascript 
var points = [];                  // 空数组
var cars = ["Saab", "Volvo", "BMW"];
var cars = new Array("Saab", "Volvo", "BMW");  // 关键字声明数组
cars[0] = "Opel";  //改变数组元素


Array.isArray(fruits);     // 返回 true， 判断是否为数组
cars instanceof Array     // 返回 true， 判断是否为数组
cars.constructor.toString().indexOf("Array") > -1 // 返回 true， 判断是否为数组


cars.length();                //length 属性始终大于最高数组索引（下标）。
cars.toString();                   //toString() 把数组转换为数组值（逗号分隔）的字符串

cars.sort();                //sort() 方法对数组进行排序
cars.reverse();             // 反转数组
[40, 100, 1, 5, 25, 10].sort(function(a, b){return a - b}); //可以定义一个比值函数进行排序


b = cars.join('-'); //Saab-Volvo-BMW  数组转字符串 使用-拼接数组元素
c = cars.join(''); //SaabVolvoBMW

cars.pop();  //pop() 方法从数组中删除最后一个元素，返回被删除的值
cars.push("Lemon");                // 向 cars 添加一个新元素 (Lemon)
cars.shift();            // 从 cars 删除第一个元素 "Saab"，返回被“位移出”的字符串
cars.unshift("Lemon");    // 向 cars 添加新元素 "Lemon"，返回新数组的长度
cars[cars.length] = "Kiwi";          // 向 cars 追加 "Kiwi"
delete cars[0];           // 把 cars中的首个元素改为 undefined

cars.splice(2, 0, "Lemon", "Kiwi"); //在数组索引2后面添加新元素
arry.splice(index)    // 删除指定元素(包括指定元素)后的所有元素
arry.splice(index, 1)  // 删除指定元素

cars.concat(["Emil", "Tobias", "Linus"]);   // 合并数组

eval('[1,2,3]')  // [1, 2, 3]  符合列表样式的字符串转列表

[1, false, "", undefined, 2].filter(Boolean); // [1, 2] // 去除空值


// forEach() 方法为每个数组元素调用一次函数（回调函数）。
cars.forEach( 
     function (value,index,arry) {
       console.log('value: ' + value)
       console.log('index: ' + index)
       console.log('arry: ' + arry)
     }
)

// map() 方法通过对每个数组元素执行函数来创建新数组,返回的是新的数组
cars.map( 
     function (value,index,arry) {
       return value.toUpperCase()
     }
)

// filter() 方法创建一个包含通过测试的数组元素的新数组,返回过滤后的数组。
cars.filter( 
     function (value,index,arry) {
       return value.toUpperCase() === 'BMW'
     }
)

// reduce() 方法在每个数组元素上运行函数，以生成（减少它）单个值。

cars.reduce( 
     function (total, value, index, array) {
       return total + value.length
     }
)

//reduceRight() 方法在每个数组元素上运行函数，以生成（减少它）单个值。执行顺序从右到左
cars.reduceRight( 
     function (total, value, index, array) {
       return total + value.length
     }
)
// every() 方法检查所有数组值是否通过测试。
cars.every( 
     function (value, index, array) {
       return value.length >4
     }
)

// some() 方法检查某些数组值是否通过了测试。
cars.some( 
     function (value, index, array) {
       return value.length >4
     }
)

// indexOf() 方法在数组中搜索元素值并返回其位置,未找到时返回-1

cars.indexOf('BMW')
cars.indexOf('BMW', 2) // 指定开始位置

// lastIndexOf() 方法在数组中搜索元素值并返回其位置, 查找从右向左，未找到时返回-1
cars.lastIndexOf('BMW')
cars.lastIndexOf('BMW', 2) // 指定开始位置

// find() 方法返回通过测试函数的第一个数组元素的值。
cars.find( 
     function (value, index, array) {
       return value.length >4
     }
)

//findIndex() 方法返回通过测试函数的第一个数组元素的索引。
cars.findIndex( 
     function (value, index, array) {
       return value.length >4
     }
)



```

## JSON

```javascript
var myObj = { name:"Bill Gates",  age:62, city:"Seattle" };
var myJSON =  JSON.stringify(myObj);     //转换成json对象
var myObj =  JSON.parse(myJSON);       // 转换成javascript对象
myObj.hasOwnProperty('age')   
```



##　条件

```javascript
if(a || b){
a;
}else{
b;
}

if (time < 10) {
    greeting = "Good morning";
 } else if (time < 18) {
    greeting = "Good day";
 } else {
    greeting = "Good evening";
 } 


// 表达式 (expr1) ? (expr2) : (expr3)
// 在expr1 求值为 TRUE 时的值为 expr2，在 expr1 求值为 FALSE 时的值为 expr3。
true ? console.log('true') : console.log('false')

switch(表达式) {
     case n:
        // 代码块
        break;
     case n:
        // 代码块
        break;
     default:
        // 默认代码块
} 


```



循环

```javascript
break; //语句“跳出”循环。
continue; //语句“跳过”循环中的一个迭代。

cars=['a','b', 'c']
for (i = 0; i < cars.length; i++) { 
    consoleo.log(cars[i]);
}

var person = {fname:"Bill", lname:"Gates", age:62}; 
for (x in person) {
    console.log(person[x]);
}

while (i < 10) {
    console.log(i);
    i++;
}

do {
    console.log(i);
    i++;
 }
while (i < 10);
```



函数

```javascript
function functionName(parameters) {
   // 要执行的代码
}

functionName(parameters);           // 函数调用

var x = function (a, b) {return a * b};  //函数表达式，并且是匿名函数

(function(){                    
   console.log("Hello!!");      //我会调用我自己
})()

const x = (x, y) => x * y;  //箭头函数

(function(){                    
   console.log(arguments);      // arguments 内置对象
})('hello')

// 关键字
this; //是“拥有”该函数的对象

var person = {
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
var person1 = {
    firstName:"Bill",
    lastName: "Gates",
}
person.fullName.call(person1);  // 将返回 "Bill Gates", call()内置的方法，它可以用来调用所有者对象作为参数的方法。


var person = {
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
var person1 = {
    firstName: "Bill",
    lastName: "Gates",
}
person.fullName.apply(person1);  // 将返回 "Bill Gates"

// 嵌套函数
function add() {
    var counter = 0;
    function plus() {counter += 1;}
    plus();     
    return counter; 
}

// 闭包函数，闭包指的是有权访问父作用域的函数，即使在父函数关闭之后。
var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();

add();
add();
add();

// 计数器目前是 3 
```



## 异常

```javascript
try {
     // 供测试的代码块
}
 catch(err) {
     // 处理错误的代码块
}

try {
     // 供测试的代码块
}
 catch(err) {
     // 处理错误的代码块
} 
finally {
     // 无论 try / catch 结果如何都执行的代码块
}

throw "Too big";    // 抛出异常文本
throw 500;          // 抛出异常数字
```



## 正则表达式

```

```

## 修饰符

| 修饰符                                                    | 描述                                                     |
| :-------------------------------------------------------- | :------------------------------------------------------- |
| [i](https://www.w3school.com.cn/jsref/jsref_regexp_i.asp) | 执行对大小写不敏感的匹配。                               |
| [g](https://www.w3school.com.cn/jsref/jsref_regexp_g.asp) | 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。 |
| m                                                         | 执行多行匹配。                                           |

## 方括号

方括号用于查找某个范围内的字符：

| 表达式                                                       | 描述                               |
| :----------------------------------------------------------- | :--------------------------------- |
| [[abc\]](https://www.w3school.com.cn/jsref/jsref_regexp_charset.asp) | 查找方括号之间的任何字符。         |
| [[^abc\]](https://www.w3school.com.cn/jsref/jsref_regexp_charset_not.asp) | 查找任何不在方括号之间的字符。     |
| [0-9]                                                        | 查找任何从 0 至 9 的数字。         |
| [a-z]                                                        | 查找任何从小写 a 到小写 z 的字符。 |
| [A-Z]                                                        | 查找任何从大写 A 到大写 Z 的字符。 |
| [A-z]                                                        | 查找任何从大写 A 到小写 z 的字符。 |
| [adgk]                                                       | 查找给定集合内的任何字符。         |
| [^adgk]                                                      | 查找给定集合外的任何字符。         |
| (red\|blue\|green)                                           | 查找任何指定的选项。               |

## 元字符

元字符（Metacharacter）是拥有特殊含义的字符：

| 元字符                                                       | 描述                                        |
| :----------------------------------------------------------- | :------------------------------------------ |
| [.](https://www.w3school.com.cn/jsref/jsref_regexp_dot.asp)  | 查找单个字符，除了换行和行结束符。          |
| [\w](https://www.w3school.com.cn/jsref/jsref_regexp_wordchar.asp) | 查找单词字符。                              |
| [\W](https://www.w3school.com.cn/jsref/jsref_regexp_wordchar_non.asp) | 查找非单词字符。                            |
| [\d](https://www.w3school.com.cn/jsref/jsref_regexp_digit.asp) | 查找数字。                                  |
| [\D](https://www.w3school.com.cn/jsref/jsref_regexp_digit_non.asp) | 查找非数字字符。                            |
| [\s](https://www.w3school.com.cn/jsref/jsref_regexp_whitespace.asp) | 查找空白字符。                              |
| [\S](https://www.w3school.com.cn/jsref/jsref_regexp_whitespace_non.asp) | 查找非空白字符。                            |
| [\b](https://www.w3school.com.cn/jsref/jsref_regexp_begin.asp) | 匹配单词边界。                              |
| [\B](https://www.w3school.com.cn/jsref/jsref_regexp_begin_not.asp) | 匹配非单词边界。                            |
| \0                                                           | 查找 NUL 字符。                             |
| [\n](https://www.w3school.com.cn/jsref/jsref_regexp_newline.asp) | 查找换行符。                                |
| \f                                                           | 查找换页符。                                |
| \r                                                           | 查找回车符。                                |
| \t                                                           | 查找制表符。                                |
| \v                                                           | 查找垂直制表符。                            |
| [\xxx](https://www.w3school.com.cn/jsref/jsref_regexp_octal.asp) | 查找以八进制数 xxx 规定的字符。             |
| [\xdd](https://www.w3school.com.cn/jsref/jsref_regexp_hex.asp) | 查找以十六进制数 dd 规定的字符。            |
| [\uxxxx](https://www.w3school.com.cn/jsref/jsref_regexp_unicode_hex.asp) | 查找以十六进制数 xxxx 规定的 Unicode 字符。 |

## 量词

| 量词                                                         | 描述                                        |
| :----------------------------------------------------------- | :------------------------------------------ |
| [n+](https://www.w3school.com.cn/jsref/jsref_regexp_onemore.asp) | 匹配任何包含至少一个 n 的字符串。           |
| [n*](https://www.w3school.com.cn/jsref/jsref_regexp_zeromore.asp) | 匹配任何包含零个或多个 n 的字符串。         |
| [n?](https://www.w3school.com.cn/jsref/jsref_regexp_zeroone.asp) | 匹配任何包含零个或一个 n 的字符串。         |
| [n{X}](https://www.w3school.com.cn/jsref/jsref_regexp_nx.asp) | 匹配包含 X 个 n 的序列的字符串。            |
| [n{X,Y}](https://www.w3school.com.cn/jsref/jsref_regexp_nxy.asp) | 匹配包含 X 至 Y 个 n 的序列的字符串。       |
| [n{X,}](https://www.w3school.com.cn/jsref/jsref_regexp_nxcomma.asp) | 匹配包含至少 X 个 n 的序列的字符串。        |
| [n$](https://www.w3school.com.cn/jsref/jsref_regexp_ndollar.asp) | 匹配任何结尾为 n 的字符串。                 |
| [^n](https://www.w3school.com.cn/jsref/jsref_regexp_ncaret.asp) | 匹配任何开头为 n 的字符串。                 |
| [?=n](https://www.w3school.com.cn/jsref/jsref_regexp_nfollow.asp) | 匹配任何其后紧接指定字符串 n 的字符串。     |
| [?!n](https://www.w3school.com.cn/jsref/jsref_regexp_nfollow_not.asp) | 匹配任何其后没有紧接指定字符串 n 的字符串。 |

## RegExp 对象属性

| 属性                                                         | 描述                                     | FF   | IE   |
| :----------------------------------------------------------- | :--------------------------------------- | :--- | :--- |
| [global](https://www.w3school.com.cn/jsref/jsref_regexp_global.asp) | RegExp 对象是否具有标志 g。              | 1    | 4    |
| [ignoreCase](https://www.w3school.com.cn/jsref/jsref_regexp_ignorecase.asp) | RegExp 对象是否具有标志 i。              | 1    | 4    |
| [lastIndex](https://www.w3school.com.cn/jsref/jsref_lastindex_regexp.asp) | 一个整数，标示开始下一次匹配的字符位置。 | 1    | 4    |
| [multiline](https://www.w3school.com.cn/jsref/jsref_multiline_regexp.asp) | RegExp 对象是否具有标志 m。              | 1    | 4    |
| [source](https://www.w3school.com.cn/jsref/jsref_source_regexp.asp) | 正则表达式的源文本。                     | 1    | 4    |

## RegExp 对象方法

| 方法                                                         | 描述                                               | FF   | IE   |
| :----------------------------------------------------------- | :------------------------------------------------- | :--- | :--- |
| [compile](https://www.w3school.com.cn/jsref/jsref_regexp_compile.asp) | 编译正则表达式。                                   | 1    | 4    |
| [exec](https://www.w3school.com.cn/jsref/jsref_exec_regexp.asp) | 检索字符串中指定的值。返回找到的值，并确定其位置。 | 1    | 4    |
| [test](https://www.w3school.com.cn/jsref/jsref_test_regexp.asp) | 检索字符串中指定的值。返回 true 或 false。         | 1    | 4    |

## 支持正则表达式的 String 对象的方法

| 方法                                                         | 描述                             | FF   | IE   |
| :----------------------------------------------------------- | :------------------------------- | :--- | :--- |
| [search](https://www.w3school.com.cn/jsref/jsref_search.asp) | 检索与正则表达式相匹配的值。     | 1    | 4    |
| [match](https://www.w3school.com.cn/jsref/jsref_match.asp)   | 找到一个或多个正则表达式的匹配。 | 1    | 4    |
| [replace](https://www.w3school.com.cn/jsref/jsref_replace.asp) | 替换与正则表达式匹配的子串。     | 1    | 4    |
| [split](https://www.w3school.com.cn/jsref/jsref_split.asp)   | 把字符串分割为字符串数组。       | 1    | 4    |