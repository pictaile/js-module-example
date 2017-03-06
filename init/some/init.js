/**
 * Created by kostya ochotnik on 12.04.2016.
 */

(function (grains, $, window) {
    "use strict";

    $(function () {
        var ES = grains.application("ES");


        ES.factory({
            nameSpace: "modules.some",
            createNameSpace: "initModules.some",
            moduleName: "SomeView",
            initModuleName: "SomeView",
            settings: {
                dependencies: ES.dependencyInjection([
                    {nameSpace: "modules.generalModules", moduleName: "Helpers", alias: "Helpers"},
                ]),
                identifiers: {},
                classes: {}
            }
        });


        ES.factory({
            nameSpace: "modules.some",
            createNameSpace: "initModules.some",
            moduleName: "SomeFacade",
            initModuleName: "SomeFacade",
            settings: {
                dependencies: ES.dependencyInjection([
                    {nameSpace: "modules.generalModules", moduleName: "Helpers", alias: "Helpers"},
                    {nameSpace: "initModules.some", moduleName: "SomeView", alias: "View"},
                ]),
                identifiers: {},
                classes: {}
            }
        });


        ES.factory({
            nameSpace: "modules.some",
            createNameSpace: "initModules.some",
            moduleName: "Some",
            initModuleName: "Some",
            settings: {
                dependencies: ES.dependencyInjection([
                    {nameSpace: "modules.generalModules", moduleName: "Helpers", alias: "Helpers"},
                    {nameSpace: "initModules.some", moduleName: "SomeFacade", alias: "Facade"},
                ]),
                identifiers: {},
                classes: {}
            }
        });

    });

}(this.grains, this.jQuery, window));
