No real changes here, but these are the static versions of the packages I installed. 

~~~
npm install --save-dev babel-jest@22.4.3 enzyme@3.3.0 jest@22.4.3 babel-preset-env@1.6.1 enzyme-adapter-react-16@1.1.1 react-test-renderer@16.2.0
~~~

I did get these errors:

~~~
npm WARN optional Skipping failed optional dependency /sane/fsevents:
npm WARN notsup Not compatible with your operating system or architecture: fsevents@1.2.9
npm WARN optional Skipping failed optional dependency /chokidar/fsevents:
npm WARN notsup Not compatible with your operating system or architecture: fsevents@1.2.9
~~~


Additionally, the jest tests didn't work as is. I found this github issue which resolved it. Because of dependency updates, you now need to specify a test environment for jest.

I added these lines to my package.json

~~~
  "jest": {
    "verbose": true,
    "testEnvironment": "node"
  },
~~~