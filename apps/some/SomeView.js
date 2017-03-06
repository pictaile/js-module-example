/**
 * Created by WOXAPP on 08.04.2016.
 */
/**
 * Created by kostya ochotnik on 08.04.2016.
 */
(function (grains, $, window) {
    "use strict";

    grains
        .application("ES")
        .createNameSpace("modules.some")
        .module("SomeView", (function () {

            /**
             * Конструктор
             *
             * @constructor SomeView
             * @param opts {Object} - object with a module configure
             * @return {Object}
             */
            function SomeView(opts) {
                var elements = {
                        $module: null,
                        $btn: null
                    },
                    callbacksCollection = {
                        updateData: $.Callbacks()
                    },
                    helpers,
                    dependencies;


                /**
                 * Метод инициализации конфигурации модуля
                 *
                 * @method initSettings
                 * @returns {void}
                 */
                function initSettings() {
                    opts = $.extend(true, $.extend(true, {}, SomeView.prototype.defaultSettings), opts || {});
                    dependencies = opts.dependencies;
                    helpers = new dependencies.Helpers();
                }

                /**
                 * method gets all the
                 * necessary elements for the
                 * operation of this module
                 *
                 * @method initElementsOfThisModule
                 * @returns {void}
                 */
                function initElementsOfThisModule() {
                    helpers.initElementsForModule(elements, $.extend(true, {}, opts.identifiers));
                }

                /**
                 * @method setEventHandler
                 * @returns {void}
                 */
                function setEventHandler() {
                    elements.$btn.on('click', function () {

                        callbacksCollection.updateData.fire();
                    })
                }

                this.render = function(data) {

                };

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
                    initElementsOfThisModule();
                    setEventHandler();
                }());
            }

            /**
             * Св-во содержит настройки модуля
             * по умолчанию
             *
             * @property defaultSettings
             * @type {Object}
             */
            SomeView.prototype.defaultSettings = {
                dependencies: {},
                identifiers: {
                    module: ".some-wrapper",
                    btn: '.some-btn'

                },
                classes: {}
            };

            return SomeView;
        }()));
}(this.grains, this.jQuery, this));
