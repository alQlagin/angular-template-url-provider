/**
 * Created by alex on 19.05.16.
 */
'use strict';

angular.module('templateUrlProvider', [])
    .provider('TemplateUrl', [
        function () {
            var aliases = {};
            return {
                replace: function (id, templateUrl) {
                    aliases[id] = templateUrl;
                },
                $get: [
                    '$http',
                    '$templateCache',
                    function ($http, $templateCache) {
                        for (var id in aliases) {
                            $templateCache.put(id, $http.get(aliases[id]));
                        }
                        return {
                            provide: function (templateUrl) {
                                var tpl = $templateCache.get(templateUrl);
                                if (tpl)
                                    return tpl;
                                else
                                    return $http.get(templateUrl);
                            }
                        }
                    }
                ]
            }
        }
    ]);
