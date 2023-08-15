```mermaid
    sequenceDiagram
    participant browser
    participant server

    browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>browser: 200 OK spa.html
    browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: 200 OK main.css
    brower->>server:GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>browser: 200 OK spa.js
    browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: 200 OK data.json
    browser->>server:POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    server-->>browser: 201 Created

```
