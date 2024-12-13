# SimpleHTTPServer

### Description
SimpleHTTPServer is a lightweight HTTP server implementation in Python. It serves static files from a designated directory (`webroot`) and handles basic HTTP requests. The server supports features like file serving, MIME type detection, 404 Not Found handling, 403 Forbidden access, 302 Redirection, and 500 Internal Server Error simulation.

---

### Features
- **Static File Serving**: Serves files from the `webroot` directory.
- **MIME Type Detection**: Automatically determines the correct MIME type for served files.
- **Error Handling**: Responds with appropriate HTTP error codes for common scenarios:
  - 404: File not found.
  - 403: Forbidden access to certain files.
  - 500: Internal server error simulation.
- **Redirection**: Redirects specific requests to new locations (302 Found).
- **Customizable**: Easily modify forbidden files, redirection rules, and error triggers.

---

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Itay01/SimpleHTTPServer.git
   cd SimpleHTTPServer
   ```
2. Ensure Python 3 is installed on your system.

---

### Usage
1. Create a `webroot` directory in the project folder and add files you want to serve.
2. Run the server:
   ```bash
   python server.py
   ```
3. Access the server in your browser at `http://127.0.0.1:80`.

---

### Configuration
- **IP and Port**: Modify `IP` and `PORT` variables in the script to change the server's IP address and port.
- **Default File**: Update `DEFAULT_URL` for the default page when accessing the root.
- **Forbidden Files**: Add file names to the `FORBIDDEN_FILES` set to restrict access.
- **Redirections**: Update the `REDIRECTION_DICTIONARY` for custom redirection rules.
  
