I'm doing this work on Linux Mint, but other linux users will likely run into this problem. The jest --watch test would fail to run. The error wasn't very verbose and I couldn't really see why it failed, my syntax was correct. 

This is a linux specific issue. For a technical explanation, see [here](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers)

For the fix, I used the exact same syntax from the comment and technical explanation. See [here](https://github.com/facebook/jest/issues/3254#issuecomment-297869853)


~~~
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
~~~

As soon as I did this, the tests succeeded!

~~~
 PASS  __tests__/test-example-work-modal.js
  ExampleWorkModal, component
    ✓ Should contain a single 'a' element (2ms)
    ✓ Should link to our project

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.491s, estimated 1s
Ran all test suites related to changed files.
~~~



