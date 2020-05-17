from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
db = SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(250), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return "<Task %r>" % self.id


@app.route("/", methods=["POST", "GET"])
def index():
    if request.method == 'POST':
        todo_content = request.form['content']
        new_todo = Todo(content=todo_content)

        try:
            db.session.add(new_todo)
            db.session.commit()
            return redirect("/")
        except:
            return "<p>There was an error. Please try again</p>"
    else:
        todos = Todo.query.order_by(Todo.date).all()
        return render_template("index.html", todos=todos)


@app.route("/delete/<int:id>")
def delete(id):
    todo_delete = Todo.query.get_or_404(id)

    try:
        db.session.delete(todo_delete)
        db.session.commit()
        return redirect("/")
    except:
        return "<p>There was an error. Please try again</p>"


@app.route("/edit/<int:id>", methods=["POST", "GET"])
def edit(id):
    todo = Todo.query.get_or_404(id)
    if request.method == 'POST':
        try:
            todo.content = request.form['content']
            db.session.commit()
            return redirect("/")
        except:
            return "<p>There was an error. Please try again</p>"
    else:
        return render_template("edit.html", todo=todo)


if __name__ == "__main__":
    app.run(debug=True)
