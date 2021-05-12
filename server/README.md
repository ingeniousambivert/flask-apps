# Create Your Ad Task 

Minimal Search Page

## Server

>Flask Server

## Getting Started

Getting up and running is simple.

1. Make sure you have [Python3](https://www.python.org/), [pip](https://pip.pypa.io/en/stable/) installed.

2. Create a vitual environment for the server.

    ```bash
    python3 -m venv serverEnv
    source ./serverEnv/bin/activate
    ```

3. Install your dependencies.

    ```bash
    pip3 install -r requirements.txt
    ```

4. Start your server.

    ```bash
    python3 run.py
    ```


Local URL :  `http://localhost:5000`

## Routes

**GET** `/api/universities` 
  *response*

  ```python
    {
    "limit": 5,
    "next": {
        "limit": 5,
        "start": 6
    },
    "previous": "",
    "results": [
        {
            "alpha_code": "IN",
            "country": "India",
            "domain": "ac.in",
            "name": "Indian Institute of Technology Bombay",
            "web_page": "https://www.iitb.ac.in"
        },
        ...
    ],
    "start": 1,
    "total": 20
    }
  ```

**GET** `/api/universities/<university_name>`
   *response*

  ```python
    {
      "alpha_code": "IN",
      "country": "India",
      "domain": "ac.in",
      "name": "Indian Institute of Technology Bombay",
      "web_page": "https://www.iitb.ac.in"
    }
  ```
  
  
**POST** `/api/universities` 
 *request*

  ```python
    {
        "alpha_code":"TS",
        "country":"Test Country",
        "domain":"test.domain",
        "name":"Test University",
        "web_page":"http://www.testpage.test/"
    }
  ```

 *response*

  ```python
    [
        {
            "alpha_code": "IN",
            "country": "India",
            "domain": "ac.in",
            "name": "Indian Institute of Technology Bombay",
            "web_page": "https://www.iitb.ac.in"
        },

        ...

        {
        "alpha_code":"TS",
        "country":"Test Country",
        "domain":"test.domain",
        "name":"Test University",
        "web_page":"http://www.testpage.test/"
    }

    ],
  ```

**PATCH** `/api/universities/<university_name>`  
  
  *request*

  ```python
    {
        "alpha_code":"Check"
    }
  ```

 *response*

  ```python
  {
    "alpha_code": "Check",
     ...
  }
  ```

**DELETE** `/api/universities/<university_name>`  
 *response*

  ```python
  [
    {
        "alpha_code": "IN",
        "country": "India",
        "domain": "ac.in",
        "name": "Indian Institute of Technology Bombay",
        "web_page": "https://www.iitb.ac.in"
    },
    ...
    # returns a filtered list of dictionaries 
  ]
  ```

