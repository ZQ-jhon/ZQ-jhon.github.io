---
title: Projects 
date: 2018-01-31 16:32:37
---
<h4 style="text-align:left;"> <button class="project-btn" id="dora"> 1.  电影 --- 绘制多啦A梦  点击在本页查看 >> </button>
github:  [Fork this project online-resume on Github](https://github.com/ZQ-jhon/draw-a-dora-A-mon-online/blob/master/README.md)
</h4>
<h4 style="text-align:left;"> <button class="project-btn" id="resume"> 2.  多动症简历  点击在本页查看 >> </button>
github:  [Fork this project dynamic-resume on Github](https://github.com/ZQ-jhon/draw-a-dora-A-mon-online/blob/master/README.md)
</h4>
<h4  style="text-align:left;"> <button class="project-btn" id="vTodo"> 3.  Vue  --- TodoList  点击在本页查看 >> </button>
github:  [Fork this project TodoList-by-Vue on Github](https://github.com/ZQ-jhon/TodoList-by-vue/tree/master)
</h4>
<h4  style="text-align:left;"> <button class="project-btn" id="ngTodo"> 4.  ng6  --- TodoList  点击在本页查看 >> </button>
github:  [Fork this project ng6-todolist on Github](https://github.com/ZQ-jhon/ng6-todolist)
</h4>
<h4  style="text-align:left;"> <button class="project-btn" id="reactTodo"> 5.  react  --- TodoList  点击在本页查看 >> </button>
github:  [Fork this project react-todolist on Github](https://github.com/ZQ-jhon/react-todolist)
</h4>

<style>
.project-btn {
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
}
</style>

<iframe class="iframes"  id="iframe" src="https://zq-jhon.github.io/draw-a-dora-A-mon-online/" width="1000" height="700"></iframe>

<script type="text/javascript">
const $ele = (ID) => document.getElementById(ID);

const iframe = $ele('iframe');
const dora = $ele('dora');
const resume = $ele('resume');
const vTodo = $ele('vTodo');
const ngTodo = $ele('ngTodo');
const reactTodo = $ele('reactTodo');


const linkTo = (link) => iframe.setAttribute('src', link);

dora.onclick = function() { linkTo('https://zq-jhon.github.io/draw-a-dora-A-mon-online/'); }
resume.onclick = function() { linkTo('https://zq-jhon.github.io/resume/'); }
vTodo.onclick = function() { linkTo('https://zq-jhon.github.io/TodoList-by-vue/'); }
ngTodo.onclick = function() { linkTo('https://zq-jhon.github.io/ng6-todolist/dist/ngTodolist/index.html'); }
reactTodo.onclick = function() { linkTo('https://zq-jhon.github.io/react-todolist/build/index.html'); }

</script>