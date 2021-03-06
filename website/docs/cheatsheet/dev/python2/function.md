> 提示：本文档以`python2.7`版本为例

## 函数定义

> 定义一个函数要使用 def 语句，依次写出函数名、括号、括号中的参数和冒号:，然后，在缩进块中编写函数体，函数的返回值用 return 语句返回

```python
def funcname([argv1, argv2..]):
	contents;
	return [vars]
```

## 函数的参数

在 Python 中定义函数，可以用必选参数、默认参数、可变参数和关键字参数，这 4 种参数都可以一起使用，或者只用其中某些，但是请注意，

参数定义的顺序必须是：必选参数(p)、默认参数(p=1)、可变参数(\*p)和关键字参数(\*\*p)。

- 默认参数一定要用不可变对象，如果是可变对象，运行会有逻辑错误！
- `*args`是可变参数，args 接收的是一个 tuple；
- `**kw`是关键字参数，kw 接收的是一个 dict。
- 可变参数既可以直接传入：func(1, 2, 3)，又可以先组装 list 或 tuple，再通过`*args`传入：`func(*(1, 2, 3))`；
- 关键字参数既可以直接传入：func(a=1, b=2)，又可以先组装 dict，再通过`**kw`传入：`func(**{'a': 1, 'b': 2})`。

```python
>>> def testArgs(x, y=5, *a, **b):
...	    print x, y, a, b
...
>>> testArgs(1)
1 5 () {}
>>> testArgs(1,2)
1 2 () {}
>>> testArgs(1,2,3)
1 2 (3,) {}
>>> testArgs(1,2,3,4)
1 2 (3, 4) {}
>>> testArgs(x=1)
1 5 () {}
>>> testArgs(x=1,y=1)
1 1 () {}
>>> testArgs(x=1,y=1,a=1)
1 1 () {'a': 1}
>>> testArgs(x=1,y=1,a=1,b=1)
1 1 () {'a': 1, 'b': 1}
>>> testArgs(1,y=1)
1 1 () {}
>>> testArgs(1,2,y=1)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: testArgs() got multiple values for keyword argument 'y'
>>> testArgs(1,2,3,4,a=1)
1 2 (3, 4) {'a': 1}
>>> testArgs(1,2,3,4,k=1,t=2,o=3)
1 2 (3, 4) {'k': 1, 't': 2, 'o': 3}
```

## 递归函数

> 如果一个函数在内部调用自身本身，这个函数就是递归函数。

```python
def fact(n):
    if n==1:
        return 1
    return n * fact(n - 1)
```

## 嵌套函数

> 在函数里面定义函数

```python
def outer():
     x = 1
     def inner():
         print x
     inner()

>>> outer()
1
```

## 高阶函数

> 把函数作为参数传入，这样的函数称为高阶函数。

```python
def add(x, y, func):
    return func(x) + func(y)
add(3,-4,abs)
```

### map(func,list)

> 接收两个参数，一个是函数，一个是序列，map 将传入的函数依次作用到序列的每个元素，并把结果作为新的 list 返回。

```python
>>> def f(x):
...     return x * x
...
>>> map(f, [1, 2, 3, 4, 5, 6, 7, 8, 9])
[1, 4, 9, 16, 25, 36, 49, 64, 81]
```

相当于`[func(x) for x in list]`

### reduce(func, list)

> reduce 把一个函数作用在一个序列上，这个函数必须接收两个参数[func,list]，reduce 把结果继续和序列的下一个元素做累积计算

```python
>>> def add(x, y):
...     return x + y
...
>>> reduce(add, [1, 3, 5, 7, 9])
25
```

相当于`f(f(f(x1,x2),x3)x4)`

### filter(func, list)

> 将函数应用于 list 元素,若返回 True 则保留,否则去掉。用于过滤序列。

```python
>>> def is_odd(n):
...     return n % 2 == 1
...
>>> filter(is_odd, [1, 2, 4, 5, 6, 9, 10, 15])
[1, 5, 9, 15]
```

相当于`[x for x in list if func(x)]`

### sortd(list, key, reverse)

> 列表排序

- key 函数来用来实现自定义的排序,key 函数将作用于 list 的每一个元素上，并根据 key 函数返回的结果进行排序。
- reverse=True 时, 实现反向排序。

```python
>>> sorted([36, 5, -12, 9, -21])
[-21, -12, 5, 9, 36]
>>> sorted([36, 5, -12, 9, -21],key=abs)
[5, 9, -12, -21, 36]
>>> sorted([36, 5, -12, 9, -21], key=abs, reverse=True)
[36, -21, -12, 9, 5]

```

### 匿名函数 lambda

> 关键字 lambda 表示匿名函数，冒号前面的是函数参数, 后面的是表达式。

`func=lambda 参数: 表达式`

等价于

`def func(参数):return 表达式`,

也可以直接`(lambda 参数:表达式)(实参)` 直接调用

```python
>>> a = lambda x,y:x+y
>>> a(4,10)
14
>>> a
<function <lambda> at 0x7f1cc2dd9758>
>>> (lambda x,y:x+y)(4,10)
14
>>> list(map(lambda x: x * x, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
[1, 4, 9, 16, 25, 36, 49, 64, 81]
```

## 偏函数

> 是一种高阶函数,其实就是可以重新设定指定函数某些参数的默认值,返回一个新的函数。

使用`functools.partial(func, *args, **kw)` 来进行重新定义默认值, 其中 kw 就是 arg=val 形式,而 args 就是一般的参数,会从原函数参数左边插入该些参数.

```python
>>> import functools
>>> int2 = functools.partial(int, base=2)
>>> int2('100000')
32
>>> int2('1000000', base=10)
1000000
>>> max10 = functools.partial(max, 10);
>>> max10(5, 6, 7)
10
```

## 返回函数

> 返回函数就是将一个函数作为结果返回。返回的函数是一个新的对象, 存有相应的信息，由于只是返回函数, 并没有执行返回函数内的返回结果, 只有在再次调用时才起效。

```python
def lazy_sum(*args):
    def sum():
        ax = 0
        for n in args:
            ax = ax + n
        return ax
    return sum

>>> f = lazy_sum(1, 3, 5, 7, 9)
>>> f
<function sum at 0x7f1cc2dd96e0>
>>> f()
25
```

## 闭包

> 当返回的函数在一个函数内时(就是函数内的函数), 称之为闭包(closure), 此时相关参数和变量都保存在返回的函数中。
> 在返回函数返回多个闭包时,注意返回函数不要引用任何循环变量或者后续会变化的变量。

```python
def count():
    fs = []
    for i in range(1, 4):
        def f():
             return i*i
        fs.append(f)
    return fs

>>> f1, f2, f3 = count()
>>> f1();f2();f3()
9
9
9
>>> f1.func_closure
(<cell at 0x02BB41F0: int object at 0x02AB7368>,)
```

没有预期结果原因是, 返回的是列表是三个闭包, 这三个闭包的值引用的是变量 i, 但它并非立刻执行。等到 3 个函数都返回时，它们所引用的变量 i 已经变成了 3，因此最终结果为 9

函数的 func_closure 属性里面包含封闭作用域里面的值

正确写法

> 再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，已绑定到函数参数的值不变。

```python
def count():
    def f(j):
        def g():
            return j*j
        return g
    fs = []
    for i in range(1, 4):
        fs.append(f(i)) # f(i)立刻被执行，因此i的当前值被传入f()
    return fs

>>> f1, f2, f3 = count()
>>> f1();f2();f3()
1
4
9
```

## 装饰器

> 在代码运行期间动态增加功能的方式，称之为“装饰器”（`Decorator`）。装饰器本质是高阶函数, 就是将函数作为参数进行相应运作,最后返回一个闭包代替原有函数。装饰器本质就是将原函数修饰为一个闭包(一个返回函数).

装饰器在 python 中在函数/对象方法定义前使用`@`符号调用. 装饰器可以在函数运行前进行一些预处理, 例如检查类型等.

```python
def log(func):
    def wrapper(*args, **kw):
        print 'call %s():' % func.__name__
        return func(*args, **kw)
    return wrapper

@log
def now():
    print '2016-7-14'
    return "done"

>>> now()
call now():
2016-7-14
'done'
>>> now.__name__
'wrapper'

```

相当于执行

```python
now = log(now)
```

由于 log()是一个 decorator，返回一个函数，所以，原来的 now()函数仍然存在，只是现在同名的 now 变量指向了新的函数，于是调用 now()将执行新函数，即在 log()函数中返回的 wrapper()函数。

wrapper()函数的参数定义是(\*args, \*\*kw)，因此，wrapper()函数可以接受任意参数的调用。在 wrapper()函数内，首先打印日志，再紧接着调用原始函数。

## 装饰器运行机制

1. 将原来函数通过装饰器变成一个传递函数本身的高阶函数(@log 部分,now=log(now))
1. 新的高阶函数要返回一个修饰函数,从而使调用原函数时实际调用该部分. (def wrapper()..return wrapper 部分)
1. 新修饰函数进行相应修饰处理(print 语句)后,执行原函数并返回原函数值.

## 传递参数的装饰器

```python
def log(text):
    def decorator(func):
        def wrapper(*args, **kw):
            print '%s %s():' % (text, func.__name__)
            return func(*args, **kw)
        return wrapper
    return decorator

@log('execute')
def now():
    print '2016-7-14'
    return "done"

>>> now()
execute now():
2016-7-14
'done'
>>> now.__name__
'wrapper'

```

相当于执行

```python
now = log('execute')(now)
```

我们来剖析上面的语句，首先执行 log('execute')，返回的是 decorator 函数，再调用返回的函数，参数是 now 函数，返回值最终是 wrapper 函数。

### 继承原有函数信息

在以上装饰器中, 其实质都是`now=wrapper`, 此时我们要是输出`now.__name__`得到的将是装饰器`wrapper`的名字.可以用`wrapper.__name__=func.__name__`加在装饰器内部进行原函数信息的继承, 也可以使用`functools.wraps`来实现

```python
import functools

def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kw):
        print 'call %s():' % func.__name__
        return func(*args, **kw)
    return wrapper

@log
def now():
    print '2016-7-14'
    return "done"

>>> now()
call now():
2016-7-14
'done'
>>> now.__name__
'now'
```

```python
import functools

def log(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print '%s %s():' % (text, func.__name__)
            return func(*args, **kw)
        return wrapper
    return decorator

@log('execute')
def now():
    print '2016-7-14'
    return "done"

>>> now()
execute now():
2016-7-14
'done'
>>> now.__name__
'now'
```

只需记住在定义`wrapper()`的前面加上`@functools.wraps(func)`即可。

```python
import functools


def log(text):
    def decorator(func=text):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print func.__name__
            if not callable(text):
                print('log:', text)

            return func(*args, **kw)

        return wrapper

    if callable(text):
        return decorator(text)  # 真正的返回值是函数wrapper
    else:
        return decorator


@log('execute')
def now():
    print '2016-7-14'
    return "done"


@log
def now2():
    print '2016-7-14'
    return "done"

>>> now()
now
('log:', 'execute')
2016-7-14
>>> now2()
now2
2016-7-14
```

### @property 和 @func.setter 装饰器

> @property 作用是将一个方法名变成一个对象属性， @func.setter 负责把一个 setter 方法变成属性赋值

```python
class Student(object):

    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value

    @property
    def fail(self):
        return True if (self.score <60) else False

---------------
s = Student()
s.score = 60 # OK，实际转化为s.set_score(60)
s.score # OK，实际转化为s.get_score()
## 60
s.score = 9999
## Traceback (most recent call last):
##   ...
## ValueError: score must between 0 ~ 100!
s.fail
## False
s.fail=True
## Traceback (most recent call last)
## ...
## AttributeError: can't set attribute
```

定义 property 的话,该属性就是只读的,是不能修改的。要修改的话，需定义 setter 装饰器

## 加载模块最常用方法

- `import module1,module2` 加载模块 1 和模块 2, 逗号分隔
- `import module as mod` 加载模块 module 并重命名为 mod, 便于方便写少些字 233
- `from module import sth [as sth2]` 只从模块中加载其中的某成员,包括变量,函数,类等. 还可以把该成员改名为 sth2,该加载方式调用成员时不再需要模块名。
- `from module import *` 加载模块中所有成员, 不需再用模块名, 为防止命名空间冲突, 不建议使用(除非很清楚没有冲突)

## 类和对象

> 定义类是通过`class`关键字,创建实例是通过类名+()实现的

- `self`： self 变量用于在类实例方法中引用方法所绑定的实例。因为方法的实例在任何方法调用中总是作为第一个参数传递的，self 被选中用来代表实例。你必须在方法声明中放上 self(你可能已经注意到了这点),但可以在方法中不使用实例(self)。如果你的方法中没有用到 self , 那么请考虑创建一个常规函数，除非你有特别的原因（静态方法）
- `cls`： cls 关键字其实代码类的本身

### 定义一个类

```python
# 定义一个普通类, 不进行继承
class ClassName():
    pass

# 定义一个继承于父类的类
# 可以多个父类
class ClassName(Parent1[,Parent2..]):
    pass

# 定义一个新式类,继承自object
class ClassName(object):
    pass

# 使用type函数定义类
# parents是元组,继承的父类,第三个是字典,定义属性和方法
ClassName = type("ClassName",(parents),{"property/method":value})

```

### 静态方法，类方法和实例方法

```python
class Foo(object):
    def test(self):     # 定义了实例方法
        print("object")
    @classmethod
    def test2(clss):	# 定义了类方法
        print("classmethod")
    @staticmethod
    def test3():	    # 定义了静态方法
        print("staticmethod")


>>> ff = Foo()
>>> Foo().test()
object
>>> Foo.test(ff)
object
>>> Foo.test2()
classmethod
>>> ff.test2()
classmethod
>>> Foo.test3()
staticmethod
>>> ff.test3()
staticmethod

```

实例方法，类方法，静态方法都可以通过实例或者类调用，只不过实例方法通过类调用时需要传递实例的引用

三种方法从不同层次上来对方法进行了描述：实例方法针对的是实例，类方法针对的是类，他们都可以继承和重新定义，静态方法也能继承，可以认为是全局函数。

### 访问限制

> 实例的变量名如果以`__`开头，就变成了一个私有变量（private），只有内部可以访问，外部不能访问，以`_`开头的变量暗示不要去访问,但不限制直接访问。以`__`开头的变量其实可以用`_className__var`来访问。

```python
class Student(object):
    def __init__(self,name,score):
        # can't access directly
        self.__name = name
        # recommend not to access
        self._score=score
    def get_name(self):
        return self.__name
    def set_name(self,name):
        self.__name = name

>>> s=Student("John",59)
>>> s.__name="Mike"
>>> s.__name
'Mike'
>>> s._Student__name="Mike_class"
>>> s.__name
'Mike'
>>> s._Student__name
'Mike_class'
>>> s.get_name()
'Mike_class'
>>> s.set_name('hello')
>>> s.get_name()
'hello'
>>> s._score
59
>>> s._score = 100
>>> s._score
100

```

### 继承和多态

> 支持子类从父类继承, 通过重新定义方法实现多态

继承的好处在于可以减少重用代码, 实现更抽象,也是多态的基础。

多态的好处在于有共同的某个方法,可以在传入后根据类的不同/特性来调用相应方法。

```python
# 定义父类, 继承于新式类object
class Animal(object):
    def run(self):
		print "Animal is running"

# 定义子类, 继承于父类
class Dog(Animal):
    # 重载方法, 实现多态
    def run(self):
		print "Dog is running"


# 多态的好处在于有共同的某个方法,可以在传入后根据类的不同/特性来调用相应方法.
def runTwice(animal):
    animal.run()


>>> a=Animal()
>>> d=Dog()

# isinstance 判断可以判断出其是否源于某个父类.
>>> isinstance(d,Animal)
True
>>> isinstance(a,Dog)
False

>>> runTwice(d)
Dog is running
```

**多重继承**

多重继承时, 若多个父类中有相同的方法, 则排在前的父类将覆盖后面的,则越靠前越”主类”. 即使主类的方法源自父类的父类, 也依然优先.

```python
# 定义主线父类, 继承于新式类object
class Animal(object):
    def eat(self):
		print "Animal can eat"

# 定义Mixin所用的"功能"类
class Flyable(object):
    def fly(self):
		print "Animal can fly"

class Runnable(object):
    def run(self):
		print "Animal can run"

class Fastrun(object):
    def run(self):
		print "Animal can fast run"

# 进行多重继承
class Cat(Animal, Runnable):
	pass

class Dog(Animal, Fastrun, Runnable):
	pass

class Bird(Animal, Flyable):
	pass

>>> cat = Cat()
>>> dog = Dog()
>>> bird = Bird()
>>> cat.eat()
Animal can eat
>>> cat.run()
Animal can run
>>> dog.eat()
Animal can eat
>>> dog.run()
Animal can fast run
>>> bird.eat()
Animal can eat
>>> bird.fly()
Animal can fly

```

## 新式类(object 类)和经典类

为什么要在`python2.2`中引进`new style class`呢？官方给的解释是：

**为了统一类(`class`)和类型(`type`)。**

- 经典类中的实例 x, `x.__class__`对应的是其类,但`type(x)`永远都是 `<type 'instance'>`. 在新式类中, 一般情况下`x.__class__`和`type(x)`都是统一的(因为私自可以改`__class__`).
- 经典类的类型是`<type 'classobj'>`, 而新式类的类型则是`<type 'type'>`, 表面旧式类是源自于`classobj`,其实例源自于`instance`. 而新式类的则源于`type`, 并且其实例源自于对应的类. 引入新式类是为了使用元类来构造类对象, 统一类的模型. 一般新式类顶级的类是 object,一般新式类均源于他. Python 3.x 全是新式类, 不需再继承 object 了.
- 经典类在查找方法时，采用深度优先, 而新式类采用广度优先。
-
- 新式类的使用有很多好处: 可以继承大部分内建类型, 引入了计算属性功能的`descriptor`(装饰器或者叫描述符, 如`@property`等), 使用各种特殊方法(如`__str__`,低级别的构造函数`__new__`,`__slots__`限定属性等), 元类的使用, 多重继承的一些问题.

```python

class C():pass

class CC(object):pass

>>> c=C()
>>> cc=CC()

>>> type(C)
<type 'classobj'>
>>> type(c)
<type 'instance'>

>>> type(CC)
<type 'type'>
>>> type(cc)
<class '__main__.CC'>

>>> print C
__main__.C
>>> print c
<__main__.C instance at 0x2267050>

>>> print CC
<class '__main__.CC'>
>>> print cc
<__main__.CC object at 0x2264710>

>>> dir(c)
['__doc__', '__module__']
>>> dir(cc)
['__class__', '__delattr__', '__dict__', '__doc__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__']

>>> BB=CC
>>> bb=BB()
>>> print bb
<__main__.CC object at 0x2264b50>
```

## Python 对象的特殊属性和方法

### 属性

- `__name__`: 类的名字
- `__doc__`: 帮助说明, 将字符串写在对象定义声明之下.
- `__module__`: 模组名,就是文件的名字(无后缀)部分
- `__class__`: 返回对象的类信息
- `__dict__`: 储存对象属性/方法的字典.
- `__bases__`: 类的所有父类
- `__slots__`: 设置一个元组,限定允许绑定的属性名称(不能动态添加以外的属性). 只能对当前类起效, 对子类不起效(除非在子类中也定义**slots**，这样，子类允许定义的属性就是自身的**slots**加上父类的**slots**。)

```python
class Student(object):
	 __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称

>>> s = Student() # 创建新的实例
>>> s.name = 'Michael' # 绑定属性'name'
>>> s.age = 25 # 绑定属性'age'
>>> s.score = 99 # 绑定属性'score'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Student' object has no attribute 'score'

```

### 方法

- `__init__(self, args)`: 对象初始化时执行的函数,对当前对象的一些实例属性进行初始化，无返回值（其实值为 None）

```python
class Student(object):
	def __init__(self):
	    print '__init__'

>>> s = Student
>>> s()
__init__
<__main__.Student object at 0x2264d50>

```

- `__new__`: 创建对象时调用的第一个方法。它的第一个参数是这个类会返回当前对象的一个实例 (在新式类中才能使用)
- `__del__`: 析构函数，释放对象时使用
- `__getattr__(self,attr)`:在调用获取对象属性执行,只查询在不在**dict**中的属性(相当于先在**dict**中查找,找不到再用本函数). 如果调用是对象方法, 处理时返回值是函数才 OK.
- `__setattr__(self,attr,value)`:在对对象属性赋值时执行
- `__delattr__(self,attr)`:在删除属性时执行 del obj.attr.
- `__getattribute__(self,name)`: 在调用获取对象任意属性时执行,和 getattr 比,任意属性都会调用,相当于在**dict**查找前执行.
- `__str__(self)`: 返回一个可以用来表示对象的可打印的友好的字符串,返回值必须为字符串。
- `__repr__(self)`: 是输出和打印出来显示的内容.有时可以和**repr**=**str**解决
- `__len__(self)`: len()函数时返回长度的行为
- `__iter__(self)`: 作为可迭代对象时返回迭代器本身(或转为迭代器).
- `__call__(self)`: 将实例变得可调用 obj().还可以定义参数.具备该方法,可以用 callable(var)来判断一个变量是对象还是一个函数(可调用对象).
- `__lt/le/eq/ne/gt/ge__(self,other)`: 二元比较符时调用,对应于<,<=,==,!=/<>,>,>=,相当于 self<other. 优先于**cmp**
- `__getitem__(self,var)`: 可以使用 obj[n]方式获取值,例如 Fib 函数可以取其中一项.如果使用 list 的切片功能,就要判断 var 是否 slice 对象 isinstance(var,slice).slice 有 start, stop, step 属性,负数处理要另外处理..
- `__setitem__(self,var,value)`: 可以用来对值进行赋值时的操作.
- `__delitem__(self,var)`: 删除某个元素的操作.

```python
class Chain(object):
    def __init__(self,path=''):
        self.path = path

    def __getattr__(self,path):
        return Chain('%s/%s'%(self.path, path))

    def __call__(self,name):
        return Chain('%s/:%s'%(self.path, name))

    def __str__(self):
        return self.path

    __repr__ = __str__

>>> Chain('/usr/list')
/usr/list
>>> print Chain('/usr/list')
/usr/list
>>> Chain().status.user.timeline.list
/status/user/timeline/list
>>> Chain().users('michael').repos
/users/:michael/repos
```

```python
class Fib(object):
    def __init__(self):
        self.a, self.b = 0, 1 # 初始化两个计数器a，b

    def __iter__(self):
        return self # 实例本身就是迭代对象，故返回自己

    def next(self):
        self.a, self.b = self.b, self.a + self.b # 计算下一个值
        if self.a > 10: # 退出循环的条件
            raise StopIteration();
        return self.a # 返回下一个值

>>> for n in Fib():
...   print n
...
1
1
2
3
5
8
```

```python
class Fib(object):
    def __getitem__(self, n):
        a, b = 1, 1
        for x in range(n):
            a, b = b, a + b
        return a

>>> f = Fib()
>>> f[0]
1
>>> f[10]
89
>>> f[100]
573147844013817084101L
```

```python
class storage(dict):
#通过使用__setattr__, __getattr__, __delattr__
#可以重写dict，使之通过“.”调用
    def __setattr__(self, key, value):
        self[key] = value
    def __getattr__ (self, key):
        try:
            return self[key]
        except KeyError, k:
            return None
    def __delattr__ (self, key):
        try:
            del self[key]
        except KeyError, k:
            return None

    # __call__方法用于实例自身的调用
    #达到()调用的效果
    def __call__ (self, key):
        try:
            return self[key]
        except KeyError, k:
            return None

s = storage()
s.name = "hello"    # 这是__setattr__起的作用
print s("name") # 这是__call__起的作用
print s["name"] # dict默认行为
print s.name    # 这是__getattr__起的作用
del s.name  # 这是__delattr__起的作用
```

### 模组

- `__name__`: 模组名

判断对象是否有指定属性:

- hasattr(obj,attr): 返回真假(通过 getattr 异常与否来实现)
- dir(obj): 列出对象现有属性

通过 try: obj.attr; except AttributeError: pass

## 元类

> 元类就是类的类. 实际上,我们用 `class` 关键词创建的类也是一个对象也就是我们常说的类其实也是通过一个底层的类来构建的,这个类就是元类(`metaclass`).

经典类的类叫`classobj`, 而新式类的类叫`type`. 经典类对象的类是熟知的`instance`, 而新式类的对象的类则是创建该类的类对象`__main__.CC`. 打印出来的效果也是,新式类才是真的类,其对象也才是真的`object`对象.

新式类本事其实也是一个对象, 可以用变量接收, 可以作为函数参数传递甚至返回, 可以拷贝, 可以添加新属性, 可以创造对象(类的特性). 例如上述例子用 BB 接收类,用 BB 同样可以创造 CC 类的对象.

新式类的类叫`type`, 这个`type`就是元类. 可以用元类来创建我们所熟知的新式类.

### type 函数利用元类创建新式类

要创建一个 class 对象，type()函数依次传入 3 个参数：

1. class 的名称；
1. 继承的父类集合，注意 Python 支持多重继承，如果只有一个父类，别忘了 tuple 的单元素写法；
1. class 的方法名称与函数绑定。

`type(类名,父类的元组(针对继承的情况,可以为空),包含属性的字典(名称和值))`

```python
def fn(self, name='world'):     # 先定义函数
	print('Hello, %s.' % name)

Hello = type('Hello', (object,), dict(hello=fn)) # 创建Hello class

>>> type(Hello)
<type 'type'>
>>> Hello().hello()
Hello, world.
```

`__metaclass__`类属性

> `__metaclass__`属性用于指明该类创建时使用的元类. 如果没有该属性,则使用`type`来创建. 注意, 这个过程是逐层搜的, 首先搜索该类的定义, 再搜索继承的父类, 要是还找不到就在模块里面找, 模块级别都找不到该属性, 就用 type 来创建. 决定了`__metaclass__`以后, 则用其来创建一个类对象. 那么, 这个元类怎么创建类对象呢…怎么定义自己的元类呢..

自定义元类

> 修改元类是在创建类对象前进行拦截从而改变其特性的,用于修改类, 并且可以返回类对象. 例如,要把所有属性/方法名变成大写,下面一个列子是给自定义的 MyList 增加一个 add 方法。

使用类的方法就是要使用`type`作父类, 再覆盖`__new__`方法并返回相应的 type 类的`__new__`方法结果.

```python
# metaclass是创建类，所以必须从`type`类型派生：
class ListMetaclass(type):
    def __new__(cls, name, bases, attrs):
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(cls, name, bases, attrs)

class MyList(list):
    __metaclass__ = ListMetaclass # 指示使用ListMetaclass来定制类

>>> L = MyList()
>>> L.add(1)
>>> L
[1]
>>> L.add(2)
>>> L
[1, 2]

```

type 中 `__new__()`方法接收到的参数依次是：

1. `cls`, 当前准备创建的类的对象；

1. `name`, 类的名字；

1. `bases`, 类继承的父类集合；

1. `attrs`, 类的方法集合。

### 典型应用: 编写 ORM 框架

> ORM 全称“Object Relational Mapping”，即对象-关系映射，就是把关系数据库的一行映射为一个对象，也就是一个类对应一个表，这样，写代码更简单，不用直接操作 SQL 语句。要编写一个 ORM 框架，所有的类都只能动态定义，因为只有使用者才能根据表的结构定义出对应的类来。

```python
# 负责保存数据库表的字段名和字段类型

class Field(object):
    def __init__(self, name, column_type):
        self.name = name
        self.column_type = column_type

    def __str__(self):
        return '<%s:%s>' % (self.__class__.__name__, self.name)


# 定义字符串字段类型

class StringField(Field):
    def __init__(self, name):
        super(StringField, self).__init__(name, 'varchar(100)')


# 定义整型字段类型

class IntegerField(Field):
    def __init__(self, name):
        super(IntegerField, self).__init__(name, 'bigint')


class ModelMetaclass(type):
    def __new__(cls, name, bases, attrs):

        # 如果是基类，直接返回
        if name == 'Model':
            return type.__new__(cls, name, bases, attrs)

        # 用于保存字段名称和字段类型的映射关系
        mappings = dict()
        for k, v in attrs.iteritems():
            if isinstance(v, Field):
                print('Found mapping: %s==>%s' % (k, v))
                mappings[k] = v

        # 不要把实例属性和类属性使用相同的名字。
        # ModelMetaclass会删除掉User类的所有类属性，目的就是避免造成混淆。
        for k in mappings.iterkeys():
            attrs.pop(k)

        attrs['__table__'] = name  # 假设表名和类名一致
        attrs['__mappings__'] = mappings  # 保存属性和列的映射关系
        return type.__new__(cls, name, bases, attrs)


# 基类

class Model(dict):
    __metaclass__ = ModelMetaclass

    def __init__(self, **kw):
        super(Model, self).__init__(**kw)

    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Model' object has no attribute '%s'" % key)

    def __setattr__(self, key, value):
        self[key] = value

    def save(self):
        fields = []
        params = []
        args = []

        # __mappings__属性由元类创建,对应于列.
        for k, v in self.__mappings__.iteritems():
            fields.append(v.name)   # 列名
            value = getattr(self, k, None)  # 值
            params.append(value)
            args.append(value)

        params = str(params).replace('[', '').replace(']', '')
        sql = 'insert into %s (%s) values (%s)' % (self.__table__, ','.join(fields), params)
        print 'SQL: %s' % sql
        print 'ARGS: %s' % str(args)



class User(Model):
    # 定义类的属性到列的映射：
    id = IntegerField('id')
    name = StringField('username')
    email = StringField('email')
    password = StringField('password')

# 创建一个实例：
u = User(id=12345, name='Michael', email='test@orm.org', password='my-pwd')
# 保存到数据库：
u.save()


-----
Found mapping: email==><StringField:email>
Found mapping: password==><StringField:password>
Found mapping: id==><IntegerField:id>
Found mapping: name==><StringField:username>
SQL: insert into User (password,email,username,id) values ('my-pwd', 'test@orm.org', 'Michael', 12345)
ARGS: ['my-pwd', 'test@orm.org', 'Michael', 12345]

```

## 上下文管理器

> 上下文管理器(context manager)是 Python2.5 开始支持的一种语法，用于规定某个对象的使用范围。一旦进入或者离开该使用范围，会有特殊操作被调用 (比如为对象分配或者释放内存)。它的语法形式是`with...as...`

###　经典用例

```python
with open("new.txt", "w") as f:
    f.write("Hello World!")

>>> print f.closed
True

```

### 自定义上下文管理器

任何定义了`__enter__()`和`__exit__()`方法的对象都可以用于上下文管理器。

- `__enter__(self)`： 进入上下文管理器时调用此方法，其返回值将被放入 with-as 语句中 as 说明符指定的变量中。
- `__exit__(self,type,value,tb)`:离开上下文管理器调用此方法。如果有异常出现，type、value、tb 分别为异常的类型、值和追踪信息。如果没有异常，3 个参数均设为 None。此方法返回值为 True 或者 False，分别指示被引发的异常得到了还是没有得到处理。如果返回 False，引发的异常会被传递出上下文。

```python
class MFile(object):
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        self.f = file(self.filename, self.mode)
        return self.f  # 作为as说明符指定的变量的值

    def __exit__(self, type, value, tb):
        self.f.close()
        return False  # 异常会被传递出上下文, 为true时忽略异常


with MFile('my_file.txt', 'w') as f:
    f.write('Hello ')
    f.write('World')

```

### contextmanager 装饰器

> contextlib 模块的`contextmanager`装饰器可以更方便的实现上下文管理器

任何能够被`yield`关键词分割成两部分的函数，都能够通过装饰器装饰的上下文管理器来实现。任何在`yield`之前的内容都可以看做在代码块执行前的操作(**enter**)，而任何`yield`之后的操作都可以放在 exit 函数中。

```python
from contextlib import contextmanager

@contextmanager
def mfile(filename, mode):
    f = file(filename, mode)
    yield f
    f.close()

with mfile('my_file.txt', 'w') as f:
    f.write('Hello ')
    f.write('World')
```
