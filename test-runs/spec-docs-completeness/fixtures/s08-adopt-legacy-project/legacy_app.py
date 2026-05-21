users = []


def add_user(name):
    users.append({"name": name})


def list_users():
    return list(users)