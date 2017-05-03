# authorized-roles

[AngularJS](https://github.com/angular/angular.js) directive for layout control to show or remove elements based on the logged user roles.

### Install

Choose your flavour

* `npm install authorized-roles`
* `bower install authorized-roles`
    
and add dynamic-table.js (or .min version) to your index.html

### Usage

* Add the `alpez.authorizedroles` directive to your application module: 

```javascript
angular.module('sampleApp',['alpez.authorizedroles']).config(AppConfig);
```

* Inject `authorizedRolesService` to populate its `roles` array with the roles of the currently authenticated user. It makes sense to do this at the very beginning of your app initialization, in your main controller:

```javascript
angular.module('sampleApp').controller('MainControler', MainControler);

MainControler.$inject = ['authorizedRolesService'];
function MainControler(authorizedRolesService){

    function saveUserRoles(loggedUserRoles){
        authorizedRolesService.roles = loggedUserRoles;
    }
}
```
> Note that "authorizedRolesService.roles" has to be populated with an array of (one or more) strings.

* Use the authorized-roles attribute on the HTML elements that you want to show/remove based on the roles previously inserted

This button will be visible for users with the role "ADMIN" (or to put it in other words, the directive will remove the button element if no role "ADMIN" is found among the user roles):

```html
<button authorized-roles="['ADMIN']"></button>
```

As soon as one the roles set in the attribute matches any of the logged user roles, the element won't be removed from the DOM.

```html
<label authorized-roles="['ADMIN','LEVEL_A','LEVEL_B']">I am visible for any of these roles</label>
```
    
### Dependency

Note that authorized-roles depends on [AngularJS](https://angularjs.org/) and therefore it must be added to the project, as well as its corresponding `<script>` tags before `dynamic-table`'s one
