---
title: Projects 
date: 2018-01-31 16:32:37
---
<h4  style="text-align:left;"> <a href="javascript:0;" id="dora"> 1.  电影 --- 绘制多啦A梦  点击在本页查看 >> </a>
github:  [Fork this project online-resume on Github](https://github.com/ZQ-jhon/draw-a-dora-A-mon-online/blob/master/README.md)
</h4>

<h4  style="text-align:left;"> <a href="javascript:0;" id="vTodo"> 2.  Vue  --- TodoList  点击在本页查看 >> </a>
github:  [Fork this project TodoList-by-Vue on Github](https://github.com/ZQ-jhon/TodoList-by-vue/tree/master)
</h4>
<h4  style="text-align:left;"> <a href="javascript:0;" id="ngTodo"> 3.  ng6  --- TodoList  点击在本页查看 >> </a>
github:  [Fork this project TodoList-by-Vue on Github](https://github.com/ZQ-jhon/ng6-todolist)
</h4>


<iframe class="iframes"  id="iframe" src="https://zq-jhon.github.io/draw-a-dora-A-mon-online/" width="1000" height="700"></iframe>

<script src="https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js"></script>
<script type="text/javascript">
var iframe = document.getElementById('iframe');

var dora = document.getElementById('dora');

var vTodo = document.getElementById('vTodo');

var ngTodo = document.getElementById('ngTodo');



dora.onclick = function(){
	$('#iframe').attr('src','https://zq-jhon.github.io/draw-a-dora-A-mon-online/');

}

vTodo.onclick = function(){
	$('#iframe').attr('src','https://zq-jhon.github.io/TodoList-by-vue/');
}

ngTodo.onclick = function(){
	$('#iframe').attr('src','https://zq-jhon.github.io/ng6-todolist/dist/ngTodolist/index.html');
}
		
</script>