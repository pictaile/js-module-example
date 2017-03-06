/**
 * Created by kostya ochotnik on 08.04.2016.
 */
(function (grains, $, window) {
    "use strict";

    grains
        .application("ES")
        .createNameSpace("modules.some")
        .module("Some", (function () {

            /**
             * Конструктор
             *
             * @constructor Some
             * @param opts {Object} - object with a module configure
             * @return {Object}
             */
            function Some(opts) {
                var
                    helpers,
                    dependencies;


                /**
                 * Method has initialisation a module configure
                 *
                 * @method initSettings
                 * @returns {void}
                 */
                function initSettings() {
                    opts = $.extend(true, $.extend(true, {}, Some.prototype.defaultSettings), opts || {});
                    dependencies = opts.dependencies;
                    helpers = new dependencies.Helpers();
                }


                /**
                 * method get data of server
                 *
                 * @param success
                 * @returns {void}
                 */
                function getData(success) {
                    $.ajax({
                        url: opts.urls.getData,
                        dataType: 'json',
                        method: "POST",
                        success: success,
                        error: opts.error
                    });
                }

                /**
                 * method subscribe facade event
                 * @returns {void}
                 */
                function subscriber() {
                    dependencies.Facade.subscribe('getData', getData)
                }

                /**
                 * Метод инициализации модуля
                 *
                 * @method init
                 * @return {void}
                 */
                (function init() {
                    initSettings();
                    subscriber()
                }());
            }

            /**
             * The property includes a module configuration
             * by default
             *
             * @property defaultSettings
             * @type {Object}
             */
            Some.prototype.defaultSettings = {
                dependencies: {},
                identifiers: {},
                classes: {},
                urls: {
                    getData: 'index.php'
                },
                error: function() {
                    alert('error')
                }
            };

            return Some;
        }()));
}(this.grains, this.jQuery, this));
