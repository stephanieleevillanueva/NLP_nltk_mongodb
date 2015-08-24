from flask import Flask
app = Flask(__name__)

@app.route("/vegas")
def vegas():
    """
    Homepage: serve our visualization page, image_mb.html
    """
    with open("vegas.html", 'r') as vegas:
        return vegas.read()


if __name__ == '__main__':
	app.debug = True #allows for app refresh and implement changes without needing to restart server
	app.run(host="0.0.0.0", port=80)  #allows other users to see app
