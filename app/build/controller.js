var TodoCtrl, a,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TodoCtrl = (function(_super) {

  __extends(TodoCtrl, _super);

  TodoCtrl.prototype.events = {
    "keypress #new-todo": "onCreate",
    "click #clear-completed": "onClearCompleted",
    "click #filters li a": "onFilter"
  };

  TodoCtrl.prototype.elements = {
    "#new-todo": "input",
    "#todo-count strong": "pending",
    "#clear-completed strong": "completed",
    "#clear-completed": "clear",
    "ul#todo-list": "items",
    "#filters li a": "filters"
  };

  function TodoCtrl() {
    this.filterTodos = __bind(this.filterTodos, this);

    this.bindChange = __bind(this.bindChange, this);
    TodoCtrl.__super__.constructor.apply(this, arguments);
    __Model.Todo.bind("create", this.filterTodos);
    __Model.Todo.bind("change", this.bindChange);
    __Model.Todo.bind("error", this.bindError);
    this.bindChange();
  }

  TodoCtrl.prototype.bindError = function(todo, error) {
    return alert(error);
  };

  TodoCtrl.prototype.bindChange = function(todo) {
    this.pending.text(__Model.Todo.active().length);
    this.completed.text(__Model.Todo.completed().length);
    if (__Model.Todo.completed().length > 0) {
      return this.clear.show();
    } else {
      return this.clear.hide();
    }
  };

  TodoCtrl.prototype.onCreate = function(event) {
    if (event.keyCode === 13) {
      __Model.Todo.create({
        name: this.input.val()
      });
      return this.input.val("");
    }
  };

  TodoCtrl.prototype.onClearCompleted = function(event) {
    __Model.Todo.clearCompleted();
    return this.filterTodos();
  };

  TodoCtrl.prototype.onFilter = function(event) {
    var filter;
    this.filters.removeClass("selected");
    filter = this.filterName(Monocle.Dom(event.currentTarget).addClass("selected"));
    return this.filterTodos(filter);
  };

  TodoCtrl.prototype.filterTodos = function() {
    var filter, todo, _i, _len, _ref, _results;
    this.items.html(" ");
    filter = this.filterName(this.filters.filter(".selected"));
    _ref = __Model.Todo[filter]();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      todo = _ref[_i];
      _results.push(this.appendTodo(todo));
    }
    return _results;
  };

  TodoCtrl.prototype.appendTodo = function(todo) {
    var view;
    view = new __View.Task({
      model: todo
    });
    return view.append(todo);
  };

  TodoCtrl.prototype.filterName = function(el) {
    return el.html().toLowerCase();
  };

  return TodoCtrl;

})(Monocle.Controller);

__Controller.Todos = new TodoCtrl('section#todoapp');

a = __Model.Todo.findBy("name", "pepe");

console.error(a);
