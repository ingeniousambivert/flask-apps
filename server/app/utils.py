import re


def paginate_result(data, start, limit):
    obj = {}
    total = len(data)
    obj["start"] = start
    obj["limit"] = limit
    obj["total"] = total
    start = int(start)
    limit = int(limit)

    if start == 1:
        obj["previous"] = ""
    else:
        temp_start = max(1, start - limit)
        temp_limit = start - 1
        obj["previous"] = {"start": temp_start, "limit": temp_limit}

    if start + limit > total:
        obj["next"] = ""
    else:
        temp_start = start + limit
        obj["next"] = {"start": temp_start, "limit": limit}
    obj["results"] = data[(start - 1):(start - 1 + limit)]
    return obj


def sanitize_string(string):
    return re.sub('[^A-Za-z0-9]+', '', string).lower()
