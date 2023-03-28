# vue3 中的坑

## autofocus 只有第一次生效

解决办法：
使用 v-focus 即可解决
`<Input v-if="visible" v-focus v-model="field_value" @submit="onEdit" class="pen-table-td-input" />`

## reactive中要是对象属性才是响应式的

如果直接申明数组，不是响应式的，数组需要挂载到对象下的一个属性才是响应式的。