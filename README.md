# ALoE (aloe)
Angular Library for Enterprise

Features
------------
* **Offline Cache** - Allow your users to work offline or with limited connectivity.

* **Logger** - Supports local and remote logging of exceptions and informations.

* **Services** - Provides a unified layer to handle the remote service calls. Supports `GET`, `POST`, `PUT`, `DELETE` operations.

* **Store** - Provides a unified data communication layer using Flux pattern, supporting actions, stores and the dispatcher.

* **Dialogs** - Provides dialogs as per scenarios. Supports your own NgModule or Container. Default dialogs include, `ConfirmationDialog`, `PlainDialog` and `MessageDialog` 

* **Loading Containers** - Containers with loading indicators are extremely useful and brings in more responsiveness to the application work. 

## Uses

- [angular 2.3](http://angular.io)
- [pouchdb](https://pouchdb.com/)
- [log4javascript](http://log4javascript.org/)
- [moment](http://momentjs.com/)
- [rxjs](https://github.com/Reactive-Extensions/RxJS)

## Motivation
When we use a specific framework, the quality and capabilities of our application are strongly limited by it. This inversion of control is a major impediment in building a testable, scalable, maintainable application that can stand the test of time. But, whereas a sound architecture and libraries are used, the libraries can be swapped out when they're updated or a better one is available. Technologies like AngularJS provides a framework to build application, but that itself is not enough to build scalable, maintainable enterprise wide applications. Factors such as data communication, data binding, remote exception handling, offline caching of data, style association are very important. So it is atmost important to build libraries instead to address these operational concerns.

## Codename
The project is codenamed `ALoE` - Angular Libraries for Building Enterprise Applications.

## Installation

```bash
$ npm install --save @aloe
```
## API Reference

Design docs are available in project git repo. Please refer the same. 

## Tests

Describe and show how to run the tests with code examples.

## Contributors
`@aloe` library was built by [Arun](mailto: sna.arun@gmail.com). 

## Bugs
All bugs should be reported to [Bug Tracker](mailto:sna.arun@gmail.com)

Permission is hereby granted, to any person obtaining a copy of this software to use, publish and distribute or redistribute, subject to the following conditions:
 * Code change / modification is not allowed, unless you know what you are doing.
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
THE SOFTWARE IS PROVIDED  "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
