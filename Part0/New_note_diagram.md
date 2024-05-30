```mermaid
  sequenceDiagram
    participant browser
    participant server

    browser->>server:POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server-->>browser: Redirect URL(302)
    browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser:HTML 200 OK
    brower->>server:GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser:main.css 200 OK
    browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>brower:main.js 200 OK
    browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser:data.json 200 OK
```
