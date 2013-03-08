var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

__View.Task = (function(_super) {

  __extends(Task, _super);

  function Task() {
    return Task.__super__.constructor.apply(this, arguments);
  }

  Task.prototype.container = "ul#todo-list";

  Task.prototype.template = "<li class=\"{{#done}}completed{{/done}}\">\n    <div class=\"view\">\n        <input class=\"toggle\" type=\"checkbox\" {{#done}}checked{{/done}} />\n        <label>{{name}}</label>\n        <button class=\"destroy\"></button>\n    </div>\n    <input class=\"edit\" value=\"{{name}}\" />\n</li>";

  Task.prototype.events = {
    "dblclick .view": "onEdit",
    "click .destroy": "onDestroy",
    "click .toggle": "onToggle",
    "keypress .edit": "onChange"
  };

  Task.prototype.elements = {
    "input.toggle": "toggle",
    "input.edit": "input"
  };

  Task.prototype.onEdit = function() {
    return this.el.addClass("editing");
  };

  Task.prototype.onChange = function(event) {
    if (event.keyCode === 13) {
      this.el.removeClass("editing");
      this.model.updateAttributes({
        name: this.input.val()
      });
      return this.refresh();
    }
  };

  Task.prototype.onToggle = function() {
    var done;
    done = (this.toggle.attr("checked")) === "" ? false : true;
    this.model.updateAttributes({
      done: done
    });
    return this.refresh();
  };

  Task.prototype.onDestroy = function() {
    return this.remove();
  };

  return Task;

})(Monocle.View);
