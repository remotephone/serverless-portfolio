This section has some out of date parts. Specifically, 


Many of the consoles have been updated since this course was originally released. I didn't run into any issues unaws til the CodeBuild example in "Create a Codebuild Build."

- You cannot specify a runtime in the console, this needs to be specified in the buildspec.yml instead. Here's an example:

~~~
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 8
  build:
    commands:
      - echo "Nothing to do yet, but this works"
artifacts:
  files:
    - index.html
    - favicon.ico
    - styles/*
    - images/*
~~~