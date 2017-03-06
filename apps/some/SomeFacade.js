/**
 * Created by kostya ochotnik on 08.04.2016.
 */
(function (grains, $, window) {
    "use strict";

    grains
        .application("ES")
        .createNameSpace("modules.some")
        .module("SomeFacade", (function () {

            /**
             * Конструктор
             *
             * @constructor SomeFacade
             * @param opts {Object} - object with a module configure
             * @return {Object}
             */
            function SomeFacade(opts) {
                var elements = {
                        $module: null
                    },
                    callbacksCollection = {
                        getData: $.Callbacks()
                    },
                    ids = [],
                    helpers,
                    dependencies;

                /**
                 * Метод инициализации конфигурации модуля
                 *
                 * @method initSettings
                 * @returns {void}
                 */
                function initSettings() {
                    opts = $.extend(true, $.extend(true, {}, SomeFacade.prototype.defaultSettings), opts || {});
                    dependencies = opts.dependencies;
                    helpers = new dependencies.Helpers();
                }

                /**
                 * method delegate render view
                 *
                 * @param data
                 * @returns {void}
                 */
                function render(data){
                    dependencies.View.render(data);
                }

                /**
                 * handler for subscribe
                 *
                 * @returns {void}
                 */
                function getData() {
                    callbacksCollection.getData.fire(render);
                }

                /**
                 * method has all subscribers of View
                 *
                 * @returns {void}
                 */
                function subscriber() {
                    dependencies.View.subscribe('updateData', getData)
                }

                /**
                 * public method that ads callbacksCollection
                 *
                 *
                 * @param event
                 * @param callback
                 * @returns {SomeView}
                 */
                this.subscribe = function (event, callback) {
                    if (callbacksCollection[event]) {
                        helpers.registeringCallbacks(callbacksCollection, event, callback);
                    }

                    return this;
                };

                /**
                 * Метод инициализации модуля
                 *
                 * @method init
                 * @return {void}
                 */
                (function init() {
                    initSettings();
                    subscriber();
                }());
            }

            /**
             * Св-во содержит настройки модуля
             * по умолчанию
             *
             * @property defaultSettings
             * @type {Object}
             */
            SomeFacade.prototype.defaultSettings = {
                dependencies: {},
                identifiers: {},
                classes: {},
                urls: {}
            };

            return SomeFacade;
        }()));
}(this.grains, this.jQuery, this));
