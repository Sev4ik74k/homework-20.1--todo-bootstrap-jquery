const todosWrapper = $(".js--todos-wrapper");
const modalTaskText = $("#modalTaskText");

const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todosWrapper.empty();
    todos.forEach(todo => addTodoToDOM(todo.text, todo.completed));
};

const saveTodos = () => {
    const todos = [];
    $(".list-group-item").each(function () {
        const text = $(this).find(".todo-item__description").text();
        const completed = $(this).hasClass("todo-item--checked");
        todos.push({ text, completed });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = (text, completed = false) => {
    const todoItem = $(`
        <li class="list-group-item ${completed ? "todo-item--checked" : ""}">
            <input type="checkbox" ${completed ? "checked" : ""} class="form-check-input me-2">
            <span class="todo-item__description">${text}</span>
            <div>
                <button class="btn btn-info btn-sm me-2 todo-item__view">Переглянути</button>
                <button class="btn btn-danger btn-sm todo-item__delete">Видалити</button>
            </div>
        </li>
    `);
    todosWrapper.append(todoItem);
};

$(".js--form").on("submit", function (e) {
    e.preventDefault();
    const input = $(".js--form__input");
    const value = input.val().trim();
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
    const text = $(this).closest(".list-group-item").find(".todo-item__description").text();
    modalTaskText.text(text);
    $("#todoModal").addClass("show").css("display", "block");
});

$(".modal .btn-close, .modal .btn-secondary").on("click", function () {
    $("#todoModal").removeClass("show").css("display", "none");
});

loadTodos();
