import socket
import os
import mimetypes

IP = '0.0.0.0'
PORT = 80
SOCKET_TIMEOUT = 5.0

WEBROOT = 'webroot'
DEFAULT_URL = "index.html"

FORBIDDEN_FILES = {"secret.txt"}
REDIRECTION_DICTIONARY = {"html1.page": "html2.page"}
INTERNAL_ERROR_TRIGGER = {"error500.page"}


def get_file_data(filepath):
    """
    Reads the content of a file in binary mode.

    :param filepath: Path to the file.
    :return: Content of the file in bytes.
    """
    with open(filepath, 'rb') as f:
        return f.read()


def get_content_type(filename):
    """
    Determines the MIME type of a file based on its extension.

    :param filename: Name of the file.
    :return: MIME type as a string.
    """
    ctype = mimetypes.guess_type(filename)[0] or "application/octet-stream"
    return ctype


def build_response(http_version, status_code, reason_phrase, headers=None, body=b""):
    """
    Constructs an HTTP response message.

    :param http_version: HTTP version (e.g., "1.0").
    :param status_code: HTTP status code (e.g., 200).
    :param reason_phrase: Reason phrase corresponding to the status code (e.g., "OK").
    :param headers: Dictionary of HTTP headers.
    :param body: Response body in bytes.
    :return: Full HTTP response message in bytes.
    """
    response_line = f"HTTP/{http_version} {status_code} {reason_phrase}\r\n"
    if headers is None:
        headers = {}
    if "Connection" not in headers:
        headers["Connection"] = "close"
    headers_str = "".join([f"{hname}: {hvalue}\r\n" for hname, hvalue in headers.items()])
    full_response = (response_line + headers_str + "\r\n").encode('utf-8') + body
    return full_response


def handle_client_request(resource, client_socket):
    """
    Handles the client's HTTP request and sends an appropriate response.

    :param resource: Requested resource path.
    :param client_socket: Client socket object.
    """
    if resource == '/':
        resource = DEFAULT_URL
    else:
        resource = resource.lstrip('/')

    filepath = os.path.join(WEBROOT, resource)

    if resource in INTERNAL_ERROR_TRIGGER:
        response = build_response("1.0", 500, "Internal Server Error")
        client_socket.sendall(response)
        return

    if resource in REDIRECTION_DICTIONARY:
        new_location = REDIRECTION_DICTIONARY[resource]
        response = build_response("1.0", 302, "Found", headers={"Location": "/" + new_location}, body=b"")
        client_socket.sendall(response)
        return

    if resource in FORBIDDEN_FILES:
        response = build_response("1.0", 403, "Forbidden")
        client_socket.sendall(response)
        return

    if not os.path.isfile(filepath):
        response = build_response("1.0", 404, "Not Found")
        client_socket.sendall(response)
        return

    try:
        data = get_file_data(filepath)
        file_length = len(data)
        content_type = get_content_type(filepath)
        headers = {
            "Content-Length": str(file_length),
            "Content-Type": content_type
        }
        response = build_response("1.0", 200, "OK", headers=headers, body=data)
        client_socket.sendall(response)
    except Exception:
        response = build_response("1.0", 500, "Internal Server Error")
        client_socket.sendall(response)


def validate_http_request(request):
    """
    Validates an HTTP request.

    :param request: Raw HTTP request string.
    :return: Tuple (is_valid, path) where is_valid is a boolean indicating if the request is valid,
             and path is the requested resource path.
    """
    lines = request.split('\r\n')
    if len(lines) < 1:
        return False, None

    first_line = lines[0].strip()
    parts = first_line.split(' ')
    if len(parts) != 3:
        return False, None

    method, path, version = parts
    if method != 'GET' or not version.startswith('HTTP/'):
        return False, None

    return True, path


def handle_client(client_socket):
    """
    Handles communication with a client.

    :param client_socket: Client socket object.
    """
    try:
        client_socket.settimeout(SOCKET_TIMEOUT)
        data = client_socket.recv(1024)
        if not data:
            client_socket.close()
            return

        request_str = data.decode('utf-8', errors='replace')
        valid_http, resource = validate_http_request(request_str)
        if valid_http:
            print(f"Valid request for: {resource}")
            handle_client_request(resource, client_socket)
        else:
            print("Invalid HTTP request. Sending 500 response.")
            response = build_response("1.0", 500, "Internal Server Error")
            client_socket.sendall(response)
    except Exception as e:
        print(f"Error handling client: {e}")
        response = build_response("1.0", 500, "Internal Server Error")
        client_socket.sendall(response)
    finally:
        print("Closing client connection.")
        client_socket.close()


def main():
    """
    Main function to start the HTTP server.
    """
    print(f"Starting HTTP server on {IP}:{PORT}")
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((IP, PORT))
    server_socket.listen(10)
    print("Server is listening for incoming connections...")
    while True:
        client_socket, client_address = server_socket.accept()
        print(f"Connection from {client_address}")
        handle_client(client_socket)


if __name__ == "__main__":
    main()
