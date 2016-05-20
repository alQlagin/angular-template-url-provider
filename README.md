# templateUrlProvider
Allows to override templates loaded via ui-router state.templateUrl

# Get Started
install via bower

```bash
bower install angular-template-url-provider
```

Add 'ui.router.templateProvider' to your app dependencies

```js
    var myApp = angular.module('myApp', ['templateUrlProvider']);
```

# Usage
module allows override state templates in your dependency modules without thinking about $templateCache

## Configuring

In config phase add TemplateUrlProvider and assign replaces  
```js
    /**
    * first is url to override, second is your template url
    */
    angular.module('app', ['templateUrlProvider'])
    .config(['TemplateUrlProvider', function(TemplateUrlProvider){
        TemplateUrlProvider.replace('vendor/my-module/views/template.html', 'my-theme/views/my.module.template.html')
    }])
```

This can be useful when need to overload 3rd party templates:

```js
    /**
    *  replace default bootstrap alert template with own  
    */
    TemplateUrlProvider.replace('uib/template/alert/alert.html', 'views/bootstrap/alert.html')
```

Also this can be used for [ui.router'](https://github.com/angular-ui/ui-router) when state template mey be overridden

Configure your states with templateProvider instead of templateUrl like so
```js
$stateProvider
    .state('stateName', {
            url: '/',
            templateProvider: [
                'TemplateUrl', 
                function (TemplateUrl) {
                    return TemplateUrl.provide('bower_components/vendor/my-module/views/template.html')
                        .then(function (r) {
                            return r.data
                        })
                }
            ],
    })
```

and reassign template `bower_components/vendor/my-module/views/template.html` in main application
```js
    /**
    * first is url to override, second is your template url
    */
    TemplateUrlProvider.replace('bower_components/vendor/my-module/views/template.html', 'my-theme/views/my.module.template.html')
``` 
 