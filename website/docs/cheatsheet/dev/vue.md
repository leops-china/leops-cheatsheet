## 引用

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
```

## 循环

```javascript
// 列表

<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>

// 列表索引
<ul id="example-1">
  <li v-for="(item, index) in items">
    {{ index }} - {{ item.message }}
  </li>
</ul>

---
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

```javascript
// 对象

<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>


<div v-for="(value, name) in object">
  {{ name }}: {{ value }}
</div>

<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>

---
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})
```

```javascript
// 模板

<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>

```

```javascript
// 组件
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

```javascript
//v-for 与 v-if 一同使用

<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>

// 当v-for 与 v-if处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。
// 不建议使用, 可将v-if放置外部

<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```
