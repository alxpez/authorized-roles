(function(){
    'use strict';

    angular.module('alpez.authorizedroles',[])
           .service('authorizedRolesService', authorizedRolesService)
           .directive('authorizedRoles', authorizedRoles);

    /*--- SERVICE ---*/
    function authorizedRolesService(){
        /*
            This array should be filled during the app init 
            with the logged user roles.
        */
        this.roles = [];

        /*
            Checks if any of the allowedRoles match any from the "authorizedRolesService.roles" array.
            If so, it returns true with the first match.
            If no match is found (or the logged user has no roles), returns false.
            Also returns true if no allowed roles are defined.
        */
        this.allowed = function(allowedRoles){
            if(!allowedRoles || allowedRoles.length === 0)
                return true;

            if(this.roles && this.roles.length > 0){
                for(var i in allowedRoles){
                    if(this.roles.indexOf(allowedRoles[i]) != -1)
                        return true;
                }
            }
            return false;
        };
    }

    /*--- DIRECTIVE ---*/
    authorizedRoles.$inject = ['authorizedRolesService'];
    function authorizedRoles(authorizedRolesService){
        return{
            restrict: 'A',
            link: function(scope, element, attrs){
                var allowedRoles = scope.$eval(attrs.authorizedRoles);

                if(!authorizedRolesService.allowed(allowedRoles))
                    element.remove();
            }
        };
    }
})();