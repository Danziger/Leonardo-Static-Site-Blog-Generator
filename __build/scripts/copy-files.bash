#!/bin/bash

# Copy HTML pages:

cp ./dist/about.html ./_pages/
cp ./dist/contact.html ./_pages/
cp ./dist/index.html ./_pages/


# Copy inline CSS:

cp ./dist/about.inline.css ./includes/
cp ./dist/contact.inline.css ./includes/
cp ./dist/index.inline.css ./includes/


# Copy assets (included CSS and JS):

cp ./dist/styles.css ./css/

cp ./dist/about.js ./js/
cp ./dist/contact.js ./js/
cp ./dist/index.js ./js/