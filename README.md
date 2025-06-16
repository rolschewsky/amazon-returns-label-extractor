# Installation
In Tampermonkey ein neues Script mit folgendem Header anlegen:

```
// ==UserScript==
// @name         Amazon Retourenlabel Extractor
// @namespace    https://olschewsky.eu/
// @version      0
// @description  Extrahiert das Amazon Retourenlabel passen auf ein DIN A5 Format 
// @author       Rüdiger
// @match        https://www.amazon.de/spr/returns/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.de
// @require      https://code.jquery.com/jquery-3.7.0.min.js
// @updateURL    https://raw.githubusercontent.com/rolschewsky/amazon-returns-label-extractor/master/script.js
// @downloadURL  https://raw.githubusercontent.com/rolschewsky/amazon-returns-label-extractor/master/script.js
// @grant        none
// ==/UserScript==
```

anschließend unter `Einstellungen > Updates` das Script aktualisieren.
