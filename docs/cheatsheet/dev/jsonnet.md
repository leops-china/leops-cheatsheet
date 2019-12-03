# jsonnet

为应用程序和工具开发人员提供的数据模板语言

- [官方网站](https://jsonnet.org/)

## 安装

```bash
wget https://github.com/google/jsonnet/releases/download/v0.14.0/jsonnet-bin-v0.14.0-linux.tar.gz
tar zxf jsonnet-bin-v0.14.0-linux.tar.gz -C /usr/local/sbin/
chmod +x /usr/local/sbin/jsonnet*
```

> 如果提示 libstdc 错误, 则按照下列方式更新 glibc

```bash
wget https://mirrors.tuna.tsinghua.edu.cn/gnu/gcc/gcc-7.2.0/gcc-7.2.0.tar.gz
tar xvzf gcc-7.2.0.tar.gz
cd gcc-7.2.0
./contrib/download_prerequisites
mkdir gcc-build
cd   gcc-build
../configure --prefix=/usr/local/gcc-7.2.0 --enable-threads=posix --disable-checking --disable-multilib --enable-languages=c,c++
make
make install
ind / -name "libstdc++.so*"
strings /usr/local/gcc-7.2.0/lib64/libstdc++.so.6.0.24 |grep GLIBC
cp /usr/local/gcc-7.2.0/lib64/libstdc++.so.6.0.24 /lib64/libstdc++.so.6
```

## 语法

- 有效标识符的字段没有引号
- 数组/对象末尾要有逗号
- 字符串使用单引号`''`或双引号`""`
- 文本块使用|||，允许逐字文本跨多行。
- 逐字字符串@'foo'和@"foo"是单行

```jsonnet
/* A C-style comment. */
# A Python-style comment.
{
  cocktails: {
    // Ingredient quantities are in fl oz.
    'Tom Collins': {
      ingredients: [
        { kind: "Farmer's Gin", qty: 1.5 },
        { kind: 'Lemon', qty: 1 },
        { kind: 'Simple Syrup', qty: 0.5 },
        { kind: 'Soda', qty: 2 },
        { kind: 'Angostura', qty: 'dash' },
      ],
      garnish: 'Maraschino Cherry',
      served: 'Tall',
      description: |||
        The Tom Collins is essentially gin and
        lemonade.  The bitters add complexity.
      |||,
    },
    Manhattan: {
      ingredients: [
        { kind: 'Rye', qty: 2.5 },
        { kind: 'Sweet Red Vermouth', qty: 1 },
        { kind: 'Angostura', qty: 'dash' },
      ],
      garnish: 'Maraschino Cherry',
      served: 'Straight Up',
      description: @'A clear \ red drink.',
    },
  },
}
```

输出

```jsonnet
{
  "cocktails": {
    "Manhattan": {
      "description": "A clear \\ red drink.",
      "garnish": "Maraschino Cherry",
      "ingredients": [
        {
          "kind": "Rye",
          "qty": 2.5
        },
        {
          "kind": "Sweet Red Vermouth",
          "qty": 1
        },
        {
          "kind": "Angostura",
          "qty": "dash"
        }
      ],
      "served": "Straight Up"
    },
    "Tom Collins": {
      "description": "The Tom Collins is essentially gin and\nlemonade.  The bitters add complexity.\n",
      "garnish": "Maraschino Cherry",
      "ingredients": [
        {
          "kind": "Farmer's Gin",
          "qty": 1.5
        },
        {
          "kind": "Lemon",
          "qty": 1
        },
        {
          "kind": "Simple Syrup",
          "qty": 0.5
        },
        {
          "kind": "Soda",
          "qty": 2
        },
        {
          "kind": "Angostura",
          "qty": "dash"
        }
      ],
      "served": "Tall"
    }
  }
}
```

## 变量

- 使用`local`关键字定义变量
- 字段旁边定义的变量以逗号`,`结尾
- 其他情况使用`;`结尾

```jsonnet
// A regular definition.
local house_rum = 'Banks Rum';

{
  // A definition next to fields.
  local pour = 1.5,

  Daiquiri: {
    ingredients: [
      { kind: house_rum, qty: pour },
      { kind: 'Lime', qty: 1 },
      { kind: 'Simple Syrup', qty: 0.5 },
    ],
    served: 'Straight Up',
  },
  Mojito: {
    ingredients: [
      {
        kind: 'Mint',
        action: 'muddle',
        qty: 6,
        unit: 'leaves',
      },
      { kind: house_rum, qty: pour },
      { kind: 'Lime', qty: 0.5 },
      { kind: 'Simple Syrup', qty: 0.5 },
      { kind: 'Soda', qty: 3 },
    ],
    garnish: 'Lime wedge',
    served: 'Over crushed ice',
  },
}
```

输出

```jsonnet
{
  "Daiquiri": {
    "ingredients": [
      {
        "kind": "Banks Rum",
        "qty": 1.5
      },
      {
        "kind": "Lime",
        "qty": 1
      },
      {
        "kind": "Simple Syrup",
        "qty": 0.5
      }
    ],
    "served": "Straight Up"
  },
  "Mojito": {
    "garnish": "Lime wedge",
    "ingredients": [
      {
        "action": "muddle",
        "kind": "Mint",
        "qty": 6,
        "unit": "leaves"
      },
      {
        "kind": "Banks Rum",
        "qty": 1.5
      },
      {
        "kind": "Lime",
        "qty": 0.5
      },
      {
        "kind": "Simple Syrup",
        "qty": 0.5
      },
      {
        "kind": "Soda",
        "qty": 3
      }
    ],
    "served": "Over crushed ice"
  }
}
```

## 引用

- `self` 引用当前对象
- `$`开头的，指的是引用外部对象
- ['foo'] 查找字段
- 使用.f 来查找字段名是标识符的
- [10] 查找数组元素
- 允许任意长的路径
- 像 arr[10:20:2]这样的数组切片是允许的，就像在 Python 中一样。
- 字符串也可以通过 unicode 代码点进行查找/切片。

```jsonnet
{
  'Tom Collins': {
    ingredients: [
      { kind: "Farmer's Gin", qty: 1.5 },
      { kind: 'Lemon', qty: 1 },
      { kind: 'Simple Syrup', qty: 0.5 },
      { kind: 'Soda', qty: 2 },
      { kind: 'Angostura', qty: 'dash' },
    ],
    garnish: 'Maraschino Cherry',
    served: 'Tall',
  },
  Martini: {
    ingredients: [
      {
        // Use the same gin as the Tom Collins.
        kind:
          $['Tom Collins'].ingredients[0].kind,
        qty: 2,
      },
      { kind: 'Dry White Vermouth', qty: 1 },
    ],
    garnish: 'Olive',
    served: 'Straight Up',
  },
  // Create an alias.
  'Gin Martini': self.Martini,
}
```

输出

```jsonnet
{
  "Gin Martini": {
    "garnish": "Olive",
    "ingredients": [
      {
        "kind": "Farmer's Gin",
        "qty": 2
      },
      {
        "kind": "Dry White Vermouth",
        "qty": 1
      }
    ],
    "served": "Straight Up"
  },
  "Martini": {
    "garnish": "Olive",
    "ingredients": [
      {
        "kind": "Farmer's Gin",
        "qty": 2
      },
      {
        "kind": "Dry White Vermouth",
        "qty": 1
      }
    ],
    "served": "Straight Up"
  },
  "Tom Collins": {
    "garnish": "Maraschino Cherry",
    "ingredients": [
      {
        "kind": "Farmer's Gin",
        "qty": 1.5
      },
      {
        "kind": "Lemon",
        "qty": 1
      },
      {
        "kind": "Simple Syrup",
        "qty": 0.5
      },
      {
        "kind": "Soda",
        "qty": 2
      },
      {
        "kind": "Angostura",
        "qty": "dash"
      }
    ],
    "served": "Tall"
  }
}
```

## 算术

- 可以使用浮点运算，位运算，布尔逻辑。
- 字符串可以与+连接，如果需要，它将隐式地将一个操作数转换为字符串。
- 可以将两个字符串与`<`（Unicode 代码点顺序）进行比较。
- 当右侧赢得字段冲突时，对象可以与+组合。
- 使用 in 测试一个字段是否在一个对象中。
- ==是值相等性。
- 可通过%获得与 python 兼容的字符串格式化。当与|||结合使用时，可以将其用于模板文本文件。

```jsonnet
{
  concat_array: [1, 2, 3] + [4],
  concat_string: '123' + 4,
  equality1: 1 == '1',
  equality2: [{}, { x: 3 - 1 }]
             == [{}, { x: 2 }],
  ex1: 1 + 2 * 3 / (4 + 5),
  // Bitwise operations first cast to int.
  ex2: self.ex1 | 3,
  // Modulo operator.
  ex3: self.ex1 % 2,
  // Boolean logic
  ex4: (4 > 3) && (1 <= 3) || false,
  // Mixing objects together
  obj: { a: 1, b: 2 } + { b: 3, c: 4 },
  // Test if a field is in an object
  obj_member: 'foo' in { foo: 1 },
  // String formatting
  str1: 'The value of self.ex2 is '
        + self.ex2 + '.',
  str2: 'The value of self.ex2 is %g.'
        % self.ex2,
  str3: 'ex1=%0.2f, ex2=%0.2f'
        % [self.ex1, self.ex2],
  // By passing self, we allow ex1 and ex2 to
  // be extracted internally.
  str4: 'ex1=%(ex1)0.2f, ex2=%(ex2)0.2f'
        % self,
  // Do textual templating of entire files:
  str5: |||
    ex1=%(ex1)0.2f
    ex2=%(ex2)0.2f
  ||| % self,
}
```

输出

```jsonnet
{
  "concat_array": [
    1,
    2,
    3,
    4
  ],
  "concat_string": "1234",
  "equality1": false,
  "equality2": true,
  "ex1": 1.6666666666666665,
  "ex2": 3,
  "ex3": 1.6666666666666665,
  "ex4": true,
  "obj": {
    "a": 1,
    "b": 3,
    "c": 4
  },
  "obj_member": true,
  "str1": "The value of self.ex2 is 3.",
  "str2": "The value of self.ex2 is 3.",
  "str3": "ex1=1.67, ex2=3.00",
  "str4": "ex1=1.67, ex2=3.00",
  "str5": "ex1=1.67\nex2=3.00\n"
}
```

## 函数

与 Python 一样，函数也有位置参数、命名参数和默认参数。还支持闭包。下面的示例将演示语法。标准库中已经定义了许多函数。尝试编写一个使用了模运算符%并返回真或假的函数。

```jsonnet
// Define a local function.
// Default arguments are like Python:
local my_function(x, y=10) = x + y;

local object = {
  // A method
  my_method(x): x * x,
};

{
  // Functions are first class citizens.
  call_inline_function:
    (function(x) x * x)(5),

  // Using the variable fetches the function,
  // the parens call the function.
  call: my_function(2),

  // Like python, parameters can be named at
  // call time.
  named_params: my_function(x=2),
  // This allows changing their order
  named_params2: my_function(y=3, x=2),

  // object.my_method returns the function,
  // which is then called like any other.
  call_method1: object.my_method(3),

  standard_lib:
    std.join(' ', std.split('foo/bar', '/')),
  len: [
    std.length('hello'),
    std.length([1, 2, 3]),
  ],
}
```

输出

```jsonnet
{
  "call": 12,
  "call_inline_function": 25,
  "call_method1": 9,
  "len": [
    5,
    3
  ],
  "named_params": 12,
  "named_params2": 5,
  "standard_lib": "foo bar"
}
```

## 条件表达式

`if b then e else e.` else 分支是可选的，默认为 null。

```jsonnet
local Mojito(virgin=false, large=false) = {
  // A local next to fields ends with ','.
  local factor = if large then 2 else 1,
  // The ingredients are split into 3 arrays,
  // the middle one is either length 1 or 0.
  ingredients: [
    {
      kind: 'Mint',
      action: 'muddle',
      qty: 6 * factor,
      unit: 'leaves',
    },
  ] + (
    if virgin then [] else [
      { kind: 'Banks', qty: 1.5 * factor },
    ]
  ) + [
    { kind: 'Lime', qty: 0.5 * factor },
    { kind: 'Simple Syrup', qty: 0.5 * factor },
    { kind: 'Soda', qty: 3 * factor },
  ],
  // Returns null if not large.
  garnish: if large then 'Lime wedge',
  served: 'Over crushed ice',
};

{
  Mojito: Mojito(),
  'Virgin Mojito': Mojito(virgin=true),
  'Large Mojito': Mojito(large=true),
}
```

输出

```jsonent
{
  "Large Mojito": {
    "garnish": "Lime wedge",
    "ingredients": [
      {
        "action": "muddle",
        "kind": "Mint",
        "qty": 12,
        "unit": "leaves"
      },
      {
        "kind": "Banks",
        "qty": 3
      },
      {
        "kind": "Lime",
        "qty": 1
      },
      {
        "kind": "Simple Syrup",
        "qty": 1
      },
      {
        "kind": "Soda",
        "qty": 6
      }
    ],
    "served": "Over crushed ice"
  },
  "Mojito": {
    "garnish": null,
    "ingredients": [
      {
        "action": "muddle",
        "kind": "Mint",
        "qty": 6,
        "unit": "leaves"
      },
      {
        "kind": "Banks",
        "qty": 1.5
      },
      {
        "kind": "Lime",
        "qty": 0.5
      },
      {
        "kind": "Simple Syrup",
        "qty": 0.5
      },
      {
        "kind": "Soda",
        "qty": 3
      }
    ],
    "served": "Over crushed ice"
  },
  "Virgin Mojito": {
    "garnish": null,
    "ingredients": [
      {
        "action": "muddle",
        "kind": "Mint",
        "qty": 6,
        "unit": "leaves"
      },
      {
         "kind": "Lime",
         "qty": 0.5
      },
      {
         "kind": "Simple Syrup",
         "qty": 0.5
      },
      {
         "kind": "Soda",
         "qty": 3
      }
    ],
    "served": "Over crushed ice"
  }
}
```

## 计算字段名称

Jsonnet 对象可以像 std::map 或常规语言中的类似数据结构一样使用。

- 可以使用 obj[e]计算字段查找
- 等价的定义是{[e]:…}
- 在计算字段名时不能访问 self 或 object 局部变量，因为还没有构造对象。
- 如果字段名在对象构造期间计算为 null，则该字段将被省略。这与条件的默认错误分支(参见下面)配合得很好。

```jsonent
local Margarita(salted) = {
  ingredients: [
    { kind: 'Tequila Blanco', qty: 2 },
    { kind: 'Lime', qty: 1 },
    { kind: 'Cointreau', qty: 1 },
  ],
  [if salted then 'garnish']: 'Salt',
};
{
  Margarita: Margarita(true),
  'Margarita Unsalted': Margarita(false),
}
```

输出

```jsonnet
{
  "Margarita": {
    "garnish": "Salt",
    "ingredients": [
      {
        "kind": "Tequila Blanco",
        "qty": 2
      },
      {
        "kind": "Lime",
        "qty": 1
      },
      {
        "kind": "Cointreau",
        "qty": 1
      }
    ]
  },
  "Margarita Unsalted": {
    "ingredients": [
      {
        "kind": "Tequila Blanco",
        "qty": 2
      },
      {
        "kind": "Lime",
        "qty": 1
      },
      {
        "kind": "Cointreau",
        "qty": 1
      }
    ]
  }
}
```

## 数组和对象

- 可以使用 for 和 if 的任何嵌套。
- 尽管主体是首先编写的，但嵌套的行为类似于循环嵌套。

```jsonnet
local arr = std.range(5, 8);
{
  array_comprehensions: {
    higher: [x + 3 for x in arr],
    lower: [x - 3 for x in arr],
    evens: [x for x in arr if x % 2 == 0],
    odds: [x for x in arr if x % 2 == 1],
    evens_and_odds: [
      '%d-%d' % [x, y]
      for x in arr
      if x % 2 == 0
      for y in arr
      if y % 2 == 1
    ],
  },
  object_comprehensions: {
    evens: {
      ['f' + x]: true
      for x in arr
      if x % 2 == 0
    },
    // Use object composition (+) to add in
    // static fields:
    mixture: {
      f: 1,
      g: 2,
    } + {
      [x]: 0
      for x in ['a', 'b', 'c']
    },
  },
}
```

输出

```jsonent
{
  "cocktails": {
    "Bee's Knees": {
      "garnish": "Lemon Twist",
      "ingredients": [
        {
          "kind": "Honey Syrup",
          "qty": 1.3333333333333333
        },
        {
          "kind": "Lemon Juice",
          "qty": 1.3333333333333333
        },
        {
          "kind": "Farmers Gin",
          "qty": 1.3333333333333333
        }
      ],
      "served": "Straight Up"
    },
    "Screwdriver": {
      "ingredients": [
        {
          "kind": "Vodka",
          "qty": 1.5
        },
        {
          "kind": "Orange Juice",
          "qty": 3
        }
      ],
      "served": "On The Rocks"
    },
    "Yellow Screwdriver": {
      "ingredients": [
        {
          "kind": "Vodka",
          "qty": 1.5
        },
        {
          "kind": "Lemonade",
          "qty": 3
        }
      ],
      "served": "On The Rocks"
    }
  }
}
```

## 导入

- 使用`import`关键字导入 josnnet 文件
- 用于导入的文件结尾习惯于以`.libsonnet`结尾
- 原始 JSON 也可以通过这种方式导入。
- 使用`importstr`关键字可以导入纯文本文件

```jsonnet
local martinis = import 'martinis.libsonnet';

{
  'Vodka Martini': martinis['Vodka Martini'],
  Manhattan: {
    ingredients: [
      { kind: 'Rye', qty: 2.5 },
      { kind: 'Sweet Red Vermouth', qty: 1 },
      { kind: 'Angostura', qty: 'dash' },
    ],
    garnish: importstr 'garnish.txt',
    served: 'Straight Up',
  },
}
```

输出

```jsonnet
{
  "Manhattan": {
    "garnish": "Maraschino Cherry",
    "ingredients": [
      {
        "kind": "Rye",
        "qty": 2.5
      },
      {
        "kind": "Sweet Red Vermouth",
        "qty": 1
      },
      {
        "kind": "Angostura",
        "qty": "dash"
      }
    ],
    "served": "Straight Up"
  },
  "Vodka Martini": {
    "garnish": "Olive",
    "ingredients": [
      {
        "kind": "Vodka",
        "qty": 2
      },
      {
        "kind": "Dry White Vermouth",
        "qty": 1
      }
    ],
    "served": "Straight Up"
  }
}
```

## 错误

- 引发错误 `error "foo"`
- 在表达式前面加个断言 `assert "foo";`
- 自定义失败信息 `assert "foo" : "message";`
- assert 有个属性 `assert self.f == 10,`

```jsonent
// Extend above example to sanity check input.
local equal_parts(size, ingredients) =
  local qty = size / std.length(ingredients);
  // Check a pre-condition
  if std.length(ingredients) == 0 then
    error 'Empty ingredients.'
  else [
    { kind: i, qty: qty }
    for i in ingredients
  ];

local subtract(a, b) =
  assert a > b : 'a must be bigger than b';
  a - b;

assert std.isFunction(subtract);

{
  test1: equal_parts(1, ['Whiskey']),
  test2: subtract(10, 3),
  object: {
    assert self.f < self.g : 'wat',
    f: 1,
    g: 2,
  },
  assert std.isObject(self.object),
}
```
