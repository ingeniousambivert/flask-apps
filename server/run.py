import app.routes
from app import app

ENV = "dev"

if ENV == "dev":
    app.debug = True
else:
    app.debug = False


if __name__ == "__main__":
    app.run()
