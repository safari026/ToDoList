const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: false,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate.",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: false,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor.",
  },
];

(function (arrOfTasks) {
  const objOfTask = arrOfTasks.reduce((acc, task) => {
    task["active"] = false;
    acc[task._id] = task;
    return acc;
  }, {});
  //Elem UI
  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  const buttonActiveTask = document.querySelector(".btn-primary");
  const buttonNoActiveTask = document.querySelector(".btn-secondary");
  const buttonAllTask = document.querySelector(".btn-danger");

  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];
  //Events
  renderAllTasks(objOfTask);
  checkArrTask(objOfTask);
  form.addEventListener("submit", onFormSubmitHandler);
  listContainer.addEventListener("click", onDeleteHandler);
  listContainer.addEventListener("click", changeActiveTaskHandler);
  buttonActiveTask.addEventListener("click", onActiveTaskHandler);
  buttonNoActiveTask.addEventListener("click", noActiveTaskHandler);
  buttonAllTask.addEventListener("click", allTask);
  function renderAllTasks(taskList) {
    if (!taskList) {
      console.log("Передайте список задача");
    }
    const fragment = document.createDocumentFragment();
    Object.values(taskList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.append(li);
    });
    listContainer.append(fragment);
  }
  function changeActiveTask(id) {
    Object.values(objOfTask).forEach((elem) => {
      if (elem._id === id) {
        elem.completed = !elem.completed;
        elem.active = !elem.active;
      }
    });
  }

  function changeActiveTaskHandler({ target }) {
    if (target.classList.contains("task-active")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      changeActiveTask(id);
      console.log();
      listContainer.textContent = "";
      renderAllTasks(objOfTask);
      console.log(objOfTask);
    }
  }

  function checkArrTask(task) {
    if (Object.values(task).length === 0) {
      const div = document.createElement("div");
      div.textContent = "Заполните массив с задачами";
      listContainer.append(div);
    }
  }

  function listItemTemplate({ _id, title, body, active }) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    li.setAttribute("data-task-id", _id);
    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";
    const taskActive = document.createElement("button");
    taskActive.textContent = "Task active";
    if (active === true) {
      taskActive.classList.add("btn", "btn-warning", "ml-auto", "task-active");
    } else {
      taskActive.classList.add("btn", "btn-danger", "ml-auto", "task-active");
    }
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Task";
    deleteButton.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");
    const article = document.createElement("p");
    article.textContent = body;
    article.classList.add("mt-2", "w-100");
    li.append(span);
    li.append(taskActive);
    li.append(deleteButton);
    li.append(article);
    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert("Пожалуйста введите  body and title");
      return;
    }
    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement("afterbegin", listItem);
    form.reset();
  }
  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      active: false,
      _id: `${Math.random()}`,
    };
    objOfTask[newTask._id] = newTask;
    console.log(objOfTask);
    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = objOfTask[id];
    const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTask[id];
    return isConfirm;
  }
  function deleteTaskFromHTML(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }
  function onDeleteHandler({ target }) {
    if (target.classList.contains("delete-btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHTML(confirmed, parent);
      checkArrTask(objOfTask);
    }
  }
  function onActiveTaskHandler() {
    const activeTask = Object.values(objOfTask).filter(
      (elem) => elem.completed === true
    );
    //удаляем содержимое записываем нвовое
    listContainer.textContent = "";
    renderAllTasks(activeTask);
  }
  function noActiveTaskHandler() {
    const noActiveTask = Object.values(objOfTask).filter(
      (elem) => elem.completed === false
    );
    listContainer.textContent = "";
    renderAllTasks(noActiveTask);
  }
  function allTask() {
    const activeTask = Object.values(objOfTask);
    //удаляем содержимое записываем нвовое
    listContainer.textContent = "";
    renderAllTasks(activeTask);
  }
})(tasks);
