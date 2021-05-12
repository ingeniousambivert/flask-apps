class University(dict):
    def __init__(self, alpha_code, country, domain, name, web_page):
        dict.__init__(self, alpha_code=alpha_code,
                      country=country,
                      domain=domain,
                      name=name,
                      web_page=web_page)
