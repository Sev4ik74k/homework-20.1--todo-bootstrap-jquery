"use strict";

var todosWrapper = $(".js--todos-wrapper");
var modalTaskText = $("#modalTaskText");
var loadTodos = function loadTodos() {
  var todos = JSON.parse(localStorage.getItem("todos")) || [];
  todosWrapper.empty();
  todos.forEach(function (todo) {
    return addTodoToDOM(todo.text, todo.completed);
  });
};

var saveTodos = function saveTodos() {
  var todos = [];
  $(".list-group-item").each(function () {
    var text = $(this).find(".todo-item__description").text();
    var completed = $(this).hasClass("todo-item--checked");
    todos.push({
      text: text,
      completed: completed
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};
var addTodo = function addTodo(text) {
  var completed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var todoItem = $("\n        <li class=\"list-group-item ".concat(completed ? "todo-item--checked" : "", "\">\n            <input type=\"checkbox\" ").concat(completed ? "checked" : "", " class=\"form-check-input me-2\">\n            <span class=\"todo-item__description\">").concat(text, "</span>\n            <div>\n                <button class=\"btn btn-info btn-sm me-2 todo-item__view\">\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438</button>\n                <button class=\"btn btn-danger btn-sm todo-item__delete\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n            </div>\n        </li>\n    "));
  todosWrapper.append(todoItem);
};
$(".js--form").on("submit", function (e) {
  e.preventDefault();
  var input = $(".js--form__input");
  var value = input.val().trim();
  if (value) {
    addTodo(value);
    saveTodos();
    input.val("");
  }
});
todosWrapper.on("change", "input[type='checkbox']", function () {
  $(this).closest(".list-group-item").toggleClass("todo-item--checked");
  saveTodos();
});
todosWrapper.on("click", ".todo-item__delete", function () {
  $(this).closest(".list-group-item").remove();
  saveTodos();
});
todosWrapper.on("click", ".todo-item__view", function () {
  var text = $(this).closest(".list-group-item").find(".todo-item__description").text();
  modalTaskText.text(text);
  $("#todoModal").addClass("show").css("display", "block");
});
$(".modal .btn-close, .modal .btn-secondary").on("click", function () {
  $("#todoModal").removeClass("show").css("display", "none");
});
loadTodos();
