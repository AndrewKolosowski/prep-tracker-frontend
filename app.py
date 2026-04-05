from flask import Flask, render_template, request, jsonify
import requests
import os
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

app = Flask(__name__)

BACKEND_URL = os.environ.get("BACKEND_URL")
if not BACKEND_URL:
    raise ValueError("Please set the BACKEND_URL environment variable")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add_entry_proxy", methods=["POST"])
def add_entry_proxy():
    data = request.json
    try:
        # Create a request adapter for identity token
        auth_req = google_requests.Request()
        # Fetch identity token for backend URL
        token = id_token.fetch_id_token(auth_req, BACKEND_URL)

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

        # Forward the request to backend
        resp = requests.post(f"{BACKEND_URL}/add_entry", json=data, headers=headers)

        return (resp.content, resp.status_code, resp.headers.items())

    except Exception as e:
        # Return error to frontend as JSON
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)