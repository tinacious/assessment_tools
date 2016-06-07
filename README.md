# Assessment Tools

Tools for assessing student projects for web development.

## Setup

Download project dependencies:

```
npm install
```

## HTML Validation

Create a root directory, e.g. `project_1`.

Put each project in a directory with the student's name:

```
├── Student\ Name
    ├── images
    │   ├── facebook-icon.png
    │   ├── glass-cactus-banner.png
    │   ├── instagram-icon.png
    │   └── twitter-icon.png
    ├── index.html
    ├── media
    │   └── song.mp3
    └── style.css
```

To validate HTML, run:

```
gulp validate_html path=path/to/project_1
```

You can drag the folder into the terminal to get the path.

A directory called `validation_output` will be created. You should have a file like `Student Name.txt` for each student.
