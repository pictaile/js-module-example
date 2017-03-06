/**
 * Created by valera on 31.08.15.
 */
(function (grains, $, window) {
    "use strict";

    grains
        .application("ES")
        .createNameSpace("modules.generalModules")
        .module("Helpers", (function () {
            var
                /**
                 * Св-во содержит инициализированный объект
                 * модуля фасада для конструктора компаний
                 *
                 * @property instance
                 * @type {Helpers}
                 */
                instance;

            /**
             * Конструктор модуля для
             * вспомогательного функционала, общего
             * для всех модулей
             *
             * @constructor Helpers
             * @return {Object}
             */
            function Helpers() {
                var self = this,
                    /**
                     * property contains values
                     * type of sale for product
                     *
                     * @property typesOfSale
                     * @type {{retail: string, wholesale: string, all: string}}
                     */
                    typesOfSale = {
                        retail: "retail",
                        wholesale: "wholesale",
                        all: "allTypes"
                    },
                    /**
                     * Объект содержит
                     * коды основных валт
                     *
                     * @property currency
                     * @type {Object}
                     */
                    currency = {
                        "980": "Грн",
                        "840": "Дол",
                        "978": "Евро",
                        "643": "Руб"
                    },
                    /**
                     * Св-во содержит url префикс
                     * текущего окружения
                     *
                     * @property environment
                     * @type {String}
                     */
                    environment = "",
                    /**
                     * Св-во содержит
                     * значение скорости анимации
                     *
                     * @property animSpeed
                     * @type {number}
                     */
                    animSpeed = 400;

                if (instance) {
                    return instance;
                }

                /**
                 * Method returns sub string
                 *
                 * @method getSubString
                 * @param str {String} original string
                 * @param start {Number} start position for loop
                 * @param breakSymbols {Array} - array symbols for break of iterations
                 * @returns {string}
                 */
                function getSubString(str, start, breakSymbols) {
                    var count = str.length,
                        subStr = "",
                        symb;

                    start = start || 0;
                    breakSymbols = $.isArray(breakSymbols) ? breakSymbols : [];

                    for (start; start < count; start += 1) {
                        symb = str.charAt(start);

                        if (breakSymbols.indexOf(symb) !== -1) {
                            break;
                        }

                        subStr += symb;
                    }

                    return subStr;
                }

                /**
                 * Метод отображает сообщения
                 * об ошибках валидации
                 *
                 * @method showErrorMessages
                 * @param errors {Array} - массив объектов с ошибками валидации
                 * @param [$parent] {Object} - jQ elem for local search
                 * @returns {void}
                 */
                function showErrorMessages(errors, $parent) {
                    errors.forEach(function (error) {
                        var $elements,
                            errorDescription,
                            selector,
                            prop;

                        for (prop in error) {
                            if (error.hasOwnProperty(prop)) {
                                errorDescription = error[prop].error;
                                selector = errorDescription.selector;

                                $elements = !$parent ? $(selector) : $parent.find(selector);
                                $elements.html(errorDescription.message).slideDown(animSpeed);
                            }
                        }
                    });
                }

                /**
                 * А тут было очень много
                 * матов, епт!
                 * //todo hardCode for fix bug (exclude relative position)
                 *
                 * @method fixRelativePosition
                 * @returns {void}
                 */
                function fixRelativePosition() {
                    if (!fixRelativePosition.$elems) {
                        fixRelativePosition.$elems = $(".pos-relative");
                    }

                    fixRelativePosition.$elems.toggleClass("pos-relative");
                }

                fixRelativePosition.$elems = null;

                /**
                 * Метод заполняется объект elements
                 * элементами, согласно указанным идентификаторам
                 * в объекте identifiers
                 *
                 * @method initElementsForModule
                 * @param elements {Object}
                 * @param identifiers {Object}
                 * @returns {Object} - объект экземпляра модуля
                 */
                this.initElementsForModule = function (elements, identifiers) {
                    var $module,
                        prop;

                    if ($.isPlainObject(elements) && $.isPlainObject(identifiers)) {
                        $module = elements.$module = $(identifiers.module);

                        for (prop in identifiers) {
                            if (identifiers.hasOwnProperty(prop) && prop !== "module") {
                                elements["$" + prop] = $module.find(identifiers[prop]);
                            }
                        }
                    }

                    return this;
                };

                /**
                 * Метод проверяет, отображается ли
                 * элемент на странице или нет
                 *
                 * @method isVisibleElement
                 * @param elements {Object} - объект с элментами в обертке jQ
                 * @param name {String} - имя элемента
                 * @returns {Boolean} - true - элемент учавствует в потоке отображения
                 * и видимый, если не установлен css стиль visible: hidden
                 */
                this.isVisibleElement = function (elements, name) {
                    var $elem = elements[name],
                        elem = $elem && $elem[0];

                    return Boolean(elem && elem.offsetHeight > 0 && elem.offsetWidth > 0);
                };

                /**
                 * Метод отображает или скрывает
                 * указанныйэлемент в зависимости от параметра
                 * status
                 *
                 * @method displayedElement
                 * @param elements {Object} - объект с элментами в обертке jQ
                 * @param name {String} - имя элемента
                 * @param status {Boolean} - true - элемент отображается
                 * @returns {Object} - объект экземпляра модуля
                 */
                this.displayedElement = function (elements, name, status) {
                    if (elements && elements.hasOwnProperty(name)) {
                        elements[name].css("display", status ? "block" : "none");
                    }

                    return this;
                };

                /**
                 * Метод получает текстовый формат
                 * валюты по коду
                 *
                 * @method getCurrency
                 * @param code {String|Number} - код валюты
                 * @returns {String|undefined} - Текстовый формат валюты в соответствии с указанным кодом
                 */
                this.getCurrency = function (code) {
                    return currency[code] || 'Грн';
                };

                /**
                 * Метод проверяет, является ли
                 * указанное значние null или нет
                 *
                 * @method isNullObject
                 * @param value {*}
                 * @returns {boolean} - true - значение содержит null
                 */
                this.isNullObject = function (value) {
                    return value === null;
                };

                /**
                 * Метод осуществляет регистрацию колбеков
                 * в коллекции
                 *
                 * @method registeringCallbacks
                 * @param callbacksCollection {Object} - объект коллекции колбеков
                 * @param collection {String} - имя необходимой коллекции
                 * @param callback {Function} - регистрируемый колбек
                 * @returns {Object} - объект экземпляра модуля
                 */
                this.registeringCallbacks = function (callbacksCollection, collection, callback) {
                    var callbacks = callbacksCollection[collection];

                    if (self.isNullObject(callbacks)) {
                        callbacks = callbacksCollection[collection] = $.Callbacks();
                    }

                    if ($.isFunction(callback)) {
                        callbacks.add(callback);
                    }

                    return this;
                };

                /**
                 * Method inclines names depending on the number
                 *
                 * @param number
                 * @param array
                 * @returns {*}
                 */
                this.plural = function (number, array) {
                    var cases = [2, 0, 1, 1, 1, 2];
                    return array[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)]];
                };


                /**
                 * Метод реализовывет
                 * поиск необходимого объекта
                 * в коллекции по его св-ву и значению
                 *
                 * @method findObjectInCollection
                 * @param collection {Array} - массив коллекции данных
                 * @param prop {String} - св-во объекта, значение которого
                 * используется для сравнения
                 * @param value {*} - сравниваемое значение
                 * @returns {Object|undefined} - найденный объект или undefined
                 */
                this.findObjectInCollection = function (collection, prop, value) {
                    var len = (collection && collection.length) || 0,
                        item,
                        findItem,
                        i;

                    for (i = 0; i < len; i += 1) {
                        item = collection[i];

                        if (item.hasOwnProperty(prop) && item[prop] === value) {
                            findItem = item;
                            break;
                        }
                    }

                    return findItem;
                };

                /**
                 * Метод форматирует числа:
                 * 1000 -> 1 000; 1000000 -> 1 000 000
                 *
                 * @method formattingNumber
                 * @param value {Number|String} - число для форматирования
                 * @returns {number|value} - отформатированная строка с числом или переданный аргумент
                 */
                this.formattingNumber = function (value) {
                    var number = Number(value);

                    if (number) {
                        number = (number.toLocaleString());
                    }

                    return number || value;
                };

                this.formattingLongNumber = function (value, max, r) {
                    var maxValue = max || 9999,
                        ret = r || '10K+',
                        number = parseInt(value);
                    if (number <= maxValue) {
                        return self.formattingNumber(number);
                    } else {
                        return ret;
                    }
                };

                /**
                 * Метод обновляет элемент
                 * selectBox, который привязн к
                 * указанному элементу $select
                 *
                 * @method updateSelectBox
                 * @param $select {Object} - элмент select в обертке jQ
                 * @returns {Object} - объект экземпляра модуля
                 */
                this.updateSelectBox = function ($select) {
                    if ($select.selectBox) {
                        $select.selectBox("refresh");
                    }

                    return this;
                };

                /**
                 * Метод отображает/скрывает
                 * сообщения об ошибках валидации
                 *
                 * @method toggleValidateErrors
                 * @param validationReport {Object} - объект с данными по валидации полей
                 * @param [$parent] {Object} - jQ elem for local search
                 * @returns {Object} - объект экземпляра модуля
                 */
                this.toggleValidateErrors = function (validationReport, $parent) {
                    var selector = (validationReport.irrelevantErrors || []).join(","),
                        $elements = !$parent ? $(selector) : $parent.find(selector);

                    $elements.slideUp(animSpeed);

                    if (validationReport.hasError()) {
                        showErrorMessages(validationReport.errors || [], $parent);
                    }

                    return this;
                };

                this.setErrors = function (validationReport, $parent) {

                    validationReport.errors.forEach(function (error) {
                        var $elements,
                            errorDescription,
                            selector,
                            prop;

                        for (prop in error) {
                            if (error.hasOwnProperty(prop)) {
                                errorDescription = error[prop].error;
                                selector = errorDescription.selector;

                                $elements = $parent.find(selector);
                                $elements.html(errorDescription.message).addClass('active');
                            }
                        }
                    });


                    return this;
                };

                /**
                 * Метод подсвечивает
                 * невалидное поле с помощью установку
                 * указанного класса.
                 *
                 * @method highlightingInvalidField
                 * @param $field {Object} - элемент поля в обертке jQ
                 * @param errorClass {String} - добавляемый/удаляемый класс
                 * @param isValid {Boolean} - флаг, true - поле валидно
                 * @returns {Object} - объект экземпляра модуля
                 */
                this.highlightingInvalidField = function ($field, errorClass, isValid) {
                    var method = isValid ? 'removeClass' : 'addClass';
                    $field.parent()[method](errorClass);

                    return this;
                };

                /**
                 * Метод подсвечивает
                 * список невалидных полей.
                 *
                 * @method highlightingInvalidFields
                 * @param opts {Object} - конфигурационный объект вида:
                 *
                 * {
                 *      report: {Array},        - отчет валидации
                        elements: {Object},     - список элементов для подсветки
                        errorCls: {String},     - класс для подсветки
                        prefix: {String},       - префикс к имени поля
                        fields: {Object}        - список имен элементов которые должны быть подсвечены
                 * }
                 *
                 * @returns {void}
                 */
                this.highlightingListOfInvalidFields = function (opts) {
                    var errors = (opts.report && opts.report.errors) || [],
                        fields = opts.fields || {},
                        elements = opts.elements || {},
                        prefix = opts.prefix || "",
                        errorCls = opts.errorCls || "",
                        property,
                        name,
                        $elem;

                    errors.forEach(function (error) {
                        var prop;

                        for (prop in error) {
                            if (error.hasOwnProperty(prop)) {
                                name = prefix ? prefix + prop.charAt(0).toUpperCase() + prop.slice(1) : name;
                                $elem = elements[name];

                                if ($elem) {
                                    self.highlightingInvalidField($elem, errorCls, false);
                                    delete fields[name];
                                }
                            }
                        }
                    });

                    for (property in fields) {
                        if (fields.hasOwnProperty(property)) {
                            self.highlightingInvalidField(elements[property], errorCls, true);
                        }
                    }
                };

                /**
                 * Метод удаляет
                 * со всех найденных элементов
                 * валидационные маркеры
                 *
                 * @method removeMarkerValidationError
                 * @param selector {String} - селектор для элементов, содержащих
                 * валидационные маркеры
                 * @param cls {String} - class маркера, который необходимо убрать
                 * @returns {Helpers}
                 */
                this.removeMarkerValidationError = function (selector, cls) {
                    $(selector).removeClass(cls);

                    return this;
                };

                /**
                 * Метод преобразует
                 * url адрес заменяю в нем все
                 * указанные переменные вида "{template}"
                 *
                 * @method replaceUrl
                 * @param url {String} - url строка вида: "companies/{companyId}/shops"
                 * @param data {Object} - объект с данными для url адреса вида: {companyId: 123}
                 * @returns {String} url address "companies/{companyId}/shops" -> "companies/123/shops"
                 */
                this.replaceUrl = function (url, data) {
                    var newUrl = url,
                        prop;

                    for (prop in data) {
                        if (data.hasOwnProperty(prop)) {
                            newUrl = newUrl.replace("{" + prop + "}", data[prop]);
                        }
                    }

                    return newUrl;
                };

                /**
                 * Method adding new get parameters
                 * for url
                 *
                 * @method addGetParameters
                 * @param url {String} - string of url
                 * @param parameters {Object} - object with GET parameters
                 * @returns {String} - new URL
                 */
                this.addGetParameters = function (url, parameters) {
                    var len = url.length,
                        startParams = url.indexOf("?"),
                        startHash = url.indexOf("#"),
                        path = getSubString(url, 0, ["#", "?"]),
                        params = getSubString(url, startParams !== -1 ? startParams : len, ["#"]),
                        hash = getSubString(url, startHash !== -1 ? startHash : len, ["?"]),
                        separator = "&",
                        prop;

                    params = !params ? "?" : params + separator;

                    for (prop in parameters) {
                        if (parameters.hasOwnProperty(prop) && (parameters[prop] !== undefined)) {
                            params += prop + "=" + parameters[prop] + separator;
                        }
                    }

                    return path + params.slice(0, -1) + hash;
                };

                /**
                 * Возвращает
                 * строку-префикс части url адреса,
                 * характеризующую текущее окржуение
                 *
                 * @method getPrefixOfEnvironment
                 * @returns {String}
                 */
                this.getPrefixOfEnvironment  = function () {
                    var prefix;

                    if (!environment) {
                        prefix = window.document.location.pathname.split('/')[1];
                        environment = '/' + prefix + '/';

                        if (prefix !== 'front_dev.php' && prefix !== 'front.php' && prefix !== 'app_dev.php' && prefix !== 'app.php') {
                            environment = '/';
                        }
                    }

                    return environment;
                };

                /**
                 * Метод заменяет
                 * в строке все теги <script>, </script>
                 * на пустую строку
                 *
                 * @method replaceScriptTags
                 * @param str {String}
                 * @returns {string} - модифицированная строка
                 */
                this.replaceScriptTags = function (str) {
                    var pattern = /<\/?script>/gim,
                        newStr = str;

                    while (newStr.search(pattern) !== -1) {
                        newStr = newStr.replace(pattern, "");
                    }

                    return newStr;
                };

                /**
                 * Метод возвращет
                 * токен, если он есть или undefined
                 *
                 * use method of Authorization module
                 *
                 * @method getToken
                 * @deprecated
                 * @returns {String|undefined}
                 */
                this.getToken = function () {
                    return $.cookie("token");
                };


                this.setCookie = function (name, value, options) {
                    options = options || {};

                    var expires = options.expires;

                    if (typeof expires == "number" && expires) {
                        var d = new Date();
                        d.setTime(d.getTime() + expires * 1000);
                        expires = options.expires = d;
                    }
                    if (expires && expires.toUTCString) {
                        options.expires = expires.toUTCString();
                    }

                    value = encodeURIComponent(value);

                    var updatedCookie = name + "=" + value;

                    for (var propName in options) {
                        updatedCookie += "; " + propName;
                        var propValue = options[propName];
                        if (propValue !== true) {
                            updatedCookie += "=" + propValue;
                        }
                    }

                    document.cookie = updatedCookie;
                };

                this.deleteCookie = function (name) {
                    self.setCookie(name, "", {
                        expires: -1
                    })
                };

                /**
                 * Метод проверяет,
                 * авторизован ли пользователь
                 * или нет.
                 *
                 * @method isAuthorized
                 * @deprecated
                 * @returns {boolean} - true - авторизован
                 */
                this.isAuthorized = function () {
                    return Boolean(self.getToken());
                };

                /**
                 * Метод осуществляет
                 * отправку запроса для получения
                 * информации о клиенте
                 *
                 * use method isAuthorization of Authorization module
                 *
                 * @method getUserInfo
                 * @deprecated
                 * @param url {String} - url адрес запроса
                 * для получения информации о клиенте
                 * @returns {Object} - объект с promise
                 */
                this.getUserInfo = function (url) {
                    return $.ajax({
                        url : url,
                        type : 'json',
                        method: "GET"
                    });
                };

                /**
                 * Метод получает
                 * шаблон модуля
                 *
                 * @method getTemplate
                 * @param url {String} - request url
                 * @param callback {Function} - callback function
                 * @returns {Helpers}
                 */
                this.getTemplate = function (url, callback) {
                    var $template = null,
                        jQxhr;

                    $.get(url)
                        .done(function (data) {
                            $template = $("<div/>", {html: data}).children().first();
                        })
                        .fail(function (xhr) {
                            jQxhr = xhr;
                        })
                        .always(function () {
                            if ($.isFunction(callback)) {
                                callback($template, jQxhr);
                            }
                        });

                    return this;
                };

                /**
                 * Method show or hide elements interface
                 * by value type of sale
                 *
                 * @method toggleDisplayPriceByTypeOfSale
                 * @param elements {Object}
                 * @param type {String}
                 * @returns {Object}
                 */
                this.toggleDisplayPriceByTypeOfSale = function (elements, type) {
                    var all = typesOfSale.all,
                        visibleWholesale = type === typesOfSale.wholesale || type === all;

                    this
                        .displayedElement(elements, "$wrapRetailPrice", type === typesOfSale.retail || type === all)
                        .displayedElement(elements, "$wrapWholesalePrice", visibleWholesale)
                        .displayedElement(elements, "$wrapMinimumQuantity", visibleWholesale);

                    return this;
                };

                /**
                 * method convert boola parameter to int
                 *
                 * @param param
                 * @returns {number}
                 */
                this.parseBoolToInt = function (param) {
                    return Number(param);
                };

                /**
                 * method convert object data to string.
                 * for get params
                 *
                 * @param data
                 * @returns {string}
                 */
                this.objToString = function (data) {
                    var arr = [],
                        start;
                    for (start in data) {
                        if (data.hasOwnProperty(start)) {
                            arr.push(data[start].id + "=on");
                        }
                    }
                    return arr.join('&');
                };

                /**
                 * Method gets url search param values
                 *
                 * @param sParam
                 * @returns {*}
                 */
                this.getUrlParameter = function getUrlParameter(sParam) {
                    var sPageURL = decodeURIComponent(window.location.search.slice(1)),
                        sURLVariables = sPageURL.split('&'),
                        sParameterName,
                        i;

                    for (i = 0; i < sURLVariables.length; i += 1) {
                        sParameterName = sURLVariables[i].split('=');

                        if (sParameterName[0] === sParam) {
                            return sParameterName[1];
                        }
                    }
                };


                /**
                 * Method exclude class, witch
                 * set relative position
                 *
                 * @method excludeRelativePosition
                 * @returns {Helpers}
                 */
                this.excludeRelativePosition = function () {
                    fixRelativePosition();

                    return this;
                };

                /**
                 * Метод валидации номера
                 * карты согласно алгоритма Луна
                 *
                 * @method validateCardNumber
                 * @param cardNumber {String}
                 * @returns {Boolean} - true - номер карты валиден по алгоритму Луна
                 */
                this.validateCardNumber = function (cardNumber) {
                    function luhnValidate(cardNumber) {
                        var delta = [0, 1, 2, 3, 4, -4, -3, -2, -1, 0],
                            sum = 0,
                            len = cardNumber.length,
                            mod,
                            i,
                            j;

                        for (i = 0; i < len; i += 1) {
                            sum += +cardNumber.substring(i, i + 1);
                        }

                        for (j = 0; j < len; j += 2) {
                            sum += delta[+cardNumber.substring(j, j + 1)];
                        }

                        mod = 10 - sum % 10;

                        if (mod === 10) {
                            mod = 0;
                        }

                        return mod;
                    }

                    return (function (cardNumber) {
                        var len = cardNumber.length,
                            luhnDigit = Number(cardNumber.substring(len - 1, len)),
                            luhnLess = cardNumber.substring(0, len - 1);

                        return luhnValidate(luhnLess) === luhnDigit;
                    }(cardNumber));
                };

                /**
                 * Method activate
                 * lib for resize frames
                 *
                 * @method initIframeResizer
                 * @returns {Helpers}
                 */
                this.initIframeResizer = function () {
                    window.iFrameResize({
                        log: false,
                        checkOrigin: false,
                        enablePublicMethods: true
                    });

                    return this;
                };

                /**
                 * Method sets mask to phone input
                 *
                 * @param element {Object} - JQ wrapped DOM element
                 * @param [mask] {String}
                 * @param [placeholder] {String}
                 * @method initPhoneInputMask
                 * @returns {Object} - jQ wrap
                 */
                this.initPhoneInputMask = function (element, mask, placeholder) {
                    return element.inputmask(mask || '+38(999) 999-99-99', {
                        "placeholder": placeholder || "+38(___) ___-__-__",
                        showMaskOnHover: false,
                        showMaskOnFocus: true
                    });
                };

                /**
                 * Method gets all search params
                 * for current url
                 *
                 * @method getAllGetParameters
                 * @returns {Object} - data of query params
                 */
                this.getAllGetParameters = function () {
                    var paramsString = decodeURI(window.location.search.slice(1)),
                        params = (paramsString && paramsString.split("&")) || [],
                        result = {};

                    params.forEach(function (param) {
                        var paramCollection = param.split("=");

                        result[paramCollection[0]] = paramCollection[1];
                    });

                    return result;
                };

                this.toggleLoader = function (state, $elem) {
                    var $block = $elem || $('.loader-wrapper');
                    $block[state ? 'show' : 'hide']();

                    return state;
                };

                /**
                 * Method set location
                 *
                 * @method datepickerLocationRu
                 * @returns {void}
                 */
                this.datepickerLocationRu = function () {
                    $.datepicker.regional['ru'] = {
                        closeText: 'Закрыть',
                        prevText: '&#x3c;Пред',
                        nextText: 'След&#x3e;',
                        currentText: 'Сегодня',
                        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
                            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
                            'Июл','Авг','Сен','Окт','Ноя','Дек'],
                        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
                        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
                        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
                        dateFormat: 'dd.mm.yy',
                        firstDay: 1,
                        isRTL: false
                    };
                    $.datepicker.setDefaults($.datepicker.regional['ru']);
                };

                this.daterangepickerLocale = function (obj) {
                    var loc = {
                        locale: {
                            applyLabel: 'Ок',
                            cancelLabel: 'Отмена',
                            daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                            monthNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
                        }

                    };

                    return $.extend(true, {}, loc, obj );
                };

                /**
                 * @method alert
                 * @param data
                 * @returns {Helpers}
                 */
                this.showAlert = function (data) {
                    data.$elem.find('.alert-modal-title').text(data.header || '');
                    data.$elem.find('.alert-modal-body').html(data.body || '');
                    if (data.btn) {
                        data.$elem.find('.my-btn-primary').val(data.btn);
                    }
                    data.$elem.modal(true);
                    return this;
                };


                this.dConfirm = function (data) {
                    var str = '<div id="confirm1" class="modal fade in" role="dialog">' +
                        '<div class="vertical-align-center">' +
                        '<div class="modal-dialog alert-modal-dialog">' +
                        '<div class="modal-content">' +
                        '<div class="modal-header alert-modal-header">' +
                        '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                        '<h4 class="modal-title alert-modal-title"></h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        '<div class="alert-modal-body">' +
                        '<p></p>' +
                        '</div>' +
                        '<div class="alert-modal-for__submit">' +
                        '<input type="button" class="my-btn-primary alert-modal-success" data-dismiss="modal" value="Ок"/>' +
                        '<input type="button" class="my-btn-close alert-modal-cancel" data-dismiss="modal" value="Отмена"/>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    if ($('#confirm1').length <= 0) {
                        $('body').append(str);
                    }
                    $('#confirm1').find('.alert-modal-title').html(data.header);
                    $('#confirm1').find('.alert-modal-body').html(data.body);
                    $('#confirm1').find('.alert-modal-success').val(data.yes || 'Ок').unbind().click(data.success);
                    $('#confirm1').find('.alert-modal-cancel').val(data.no || 'Отмена');
                    $('#confirm1').modal();

                };



                this.renderPresentMeals = function (resp) {

                    var str = '', checked;
                    resp.products.forEach(function (item, i) {
                        checked =  i == 0 ? 'checked' : '';

                        str += "<div class='present-product-item'>" +
                            "<input type='radio' name='present-product' id='id_" + item.stock_id + "' class='custom-radio' value='" + item.stock_id + "'  " + checked +" />" +
                            "<label for='id_" + item.stock_id  + "' >" + item.product_name + "</label>" +
                            "</div>";
                    });
                    return str;
                }

                this.getOffer = function(response) {
                    this.showPopup({
                        $elem: $('#show-popup3'),
                        header: 'Выберите подарок',
                        body: this.renderPresentMeals(response),
                        success: function () {
                            $.ajax({
                                url: 'index.php?route=api/cart/addGift',
                                dataType: 'json',
                                method: "POST",
                                data: {
                                    'restaurant_id': response.restaurant_id,
                                    'stock_id': $('[name=present-product]:checked').val()
                                },
                                success: function (json) {
                                    location.reload();
                                }
                            });
                        }

                    });
                }

                this.showPopup = function (data) {
                    var $popup = data.$elem || $('#show-popup');
                    $popup.fadeIn(400);
                    $('.cont-wrapper').css({
                        height: '100%',
                        overflow: 'hidden',
                    });
                    $popup.find('.body-popup >div').html(data.body);
                    $popup.find('.payment-back-cart-title').html(data.header || '');

                    $('.popup-layout').val(data.yes || 'Да').unbind().click(function (e) {
                        if($(e.target).hasClass('popup-layout') || $(e.target).hasClass('popup-table') || $(e.target).hasClass('popup-table-cell')) {

                            $('.cont-wrapper').css({
                                height: 'auto',
                                overflow: 'auto',
                            });
                            $popup.fadeOut(400);
                        }
                    });

                    $popup.find(' .btn-yes').val(data.yes || 'Да').unbind().click(function () {

                        $('.cont-wrapper').css({
                            height: 'auto',
                            overflow: 'auto',
                        });
                        if(data.success) {
                            data.success();
                        }
                        $popup.fadeOut(400);
                    });

                    $popup.find('.popup-close').unbind().click(function () {
                        $('.cont-wrapper').css({
                            height: 'auto',
                            overflow: 'auto',
                        });

                        $popup.fadeOut(400);
                    });


                    $popup.find('.btn-no').val(data.yes || 'Да').unbind().click(function () {
                        $('.cont-wrapper').css({
                            height: 'auto',
                            overflow: 'auto',
                        });

                        $popup.fadeOut(400);
                    });


                };

                this.dAlert = function (data) {

                    var str = '<div id="d-alert" class="modal fade in" role="dialog">' +
                        '<div class="vertical-align-center">' +
                        '<div class="modal-dialog alert-modal-dialog">' +
                        '<div class="modal-content">' +
                        '<div class="modal-header alert-modal-header">' +
                        '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                        '<h4 class="modal-title alert-modal-title"></h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        '<div class="alert-modal-body">' +
                        '<p></p>' +
                        '</div>' +
                        '<div class="alert-modal-for__submit">' +
                        '<input type="button" class="my-btn-primary alert-modal-success" data-dismiss="modal" value="Ок"/>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    if ($('#d-alert').length <= 0) {
                        $('body').append(str);
                    }
                    $('#d-alert').find('.alert-modal-title').html(data.header);
                    $('#d-alert').find('.alert-modal-body').html(data.body);
                    $('#d-alert').find('.alert-modal-success').val(data.yes || 'Ок');
                    $('#d-alert').modal();

                };

                this.confirm = function (data) {
                    data.$elem.find('.alert-modal-title').text(data.header);
                    data.$elem.find('.alert-modal-body').html(data.body);
                    data.$elem.find('.alert-modal-body').html(data.body);
                    if (data.yes) {
                        data.$elem.find('.alert-modal-success').val(data.yes);
                    }
                    if (data.no) {
                        data.$elem.find('.alert-modal-cancel').val(data.no);
                    }
                    data.$elem.modal(true);
                    $('.alert-modal-success').unbind().click(data.success);
                    $('.alert-modal-cancel').unbind().click(function () { data.$elem.modal(false); });
                    return this;
                };

                this.determinationError = function (xhr) {
                    console.log(xhr);

                    return this;
                };

                /**
                 *
                 * @param elem
                 * @param data
                 * @returns {$.ui.datepicker|{version}|*}
                 */
                this.datePicker = function (elem, data) {
                    var $block;
                    this.datepickerLocationRu();

                    if (typeof elem === 'String') {
                        $block = $(elem);
                    } else {
                        $block = elem;
                    }
                    $block.datepicker({
                        minDate: data.minDate
                    });

                    return $.datepicker;
                };

                /**
                 * Метод инициализации модуля
                 *
                 * @method init
                 * @return {void}
                 */
                (function init() {
                    instance = self;
                }());
            }

            return Helpers;
        }()));
}(this.grains, this.jQuery, this));