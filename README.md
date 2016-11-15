# Assessment Tools

Tools for assessing student projects for web development.

## Setup

Download project dependencies:

```
npm install
```

## Perfect Paddles

Perfect Paddles Project 1 assessment tools include:

- HTML and CSS Validation
- Acceptance tests for HTML and CSS requirements

### HTML and CSS Validation

You will need the URLs to the HTML file and the main stylesheet. Run the script with the HTML file path as the first argument and the CSS file path as the second argument:

```
node perfect_paddles/perfect_paddles_validation.js HTML_URL CSS_URL
```

E.g.:

```
node perfect_paddles/perfect_paddles_validation.js http://username.github.io/perfect_paddles http://username.github.io/perfect_paddles/style.css
```

This should output both HTML and CSS validation results in the console.

### Acceptance tests

Acceptance tests use JSDom and jQuery to verify that the acceptance criteria are met.

Run the acceptance tests with Mocha and pass the `HTML` and `CSS` URLs as environment variables to Mocha, as follows:

```
env HTML=HTML_URL CSS=CSS_URL mocha perfect_paddles/perfect_paddles_test.js
```

E.g.:
```
env HTML=http://username.github.io/perfect_paddles CSS=http://username.github.io/perfect_paddles/style.css mocha perfect_paddles/perfect_paddles_test.js
```

## Project 1 (deprecated)

Validation instructions for project 1.

### HTML and CSS Validation

jQ is required for Project 1 CSS validation. Download jQ with [Homebrew](http://brew.sh):

```
brew install jq
```

Create a root directory, e.g. `project_1`.

Put each project in a directory with the student's name:

```
├── Student\ Name
    ├── images
    │   ├── facebook-icon.png
    │   ├── band-banner.png
    │   ├── instagram-icon.png
    │   └── twitter-icon.png
    ├── index.html
    ├── media
    │   └── song.mp3
    └── style.css
```

#### HTML

To validate HTML, run:

```
gulp validate_html --path=path/to/project_1
```

You can drag the folder into the terminal to get the path.

A directory called `validation_output` will be created. You should have a file like `Student Name.txt` for each student.

#### CSS

To validate CSS, run:

```
gulp validate_css --path=path/to/project_1
```

To quickly parse the file and copy the errors to the clipboard, run:

```
cat validation_output/Student \Name-css.txt | jq .errors | pbcopy
```
