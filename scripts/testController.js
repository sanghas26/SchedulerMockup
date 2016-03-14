(function () {
    'use strict';

    angular
        .module('testApp')
        .controller('testController', testController);

    testController.$inject = ['$scope', '$sce'];

    function testController($scope, $sce) {
        var vm = $scope;

        //preset values
        vm.frequencies = [{
            value: 'once',
            price: 'from 14,90 €/h'
        }, {
            value: 'weekly',
            price: 'from 13,90 €/h'
        }, {
            value: 'every 2 weeks',
            price: 'from 13,90 €/h',
            bestseller: true
        }, {
            value: 'every 4 weeks',
            price: 'from 13,90 €/h'
        }];

        vm.priceOffers = [{
            name: 'Economy',
            value: '13,90 €/h'
        }, {
            name: 'Economy Plus',
            value: '14,90 €/h'
        }, {
            name: 'Premium',
            value: '15,90 €/h'
        }, {
            name: 'Premium Plus',
            value: '18,90 €/h'
        }];

        vm.times = [{
            time: '9:00'
        }, {
            time: '10:00'
        }, {
            time: '11:00'
        }, {
            time: '12:00'
        }, {
            time: '13:00'
        }, {
            time: '14:00'
        }, {
            time: '15:00'
        }, {
            time: '16:00'
        }, {
            time: '17:00'
        }, {
            time: '18:00'
        }]

        vm.calendar = { opened: false };
        vm.step = 1;

        vm.nextStep = function (form) {
            (form || {}).submitted = true;
            if (form && form.$valid && vm.step < 2)
                vm.step++;
        }

        vm.previousStep = function () {
            if (vm.step > 1)
                vm.step--;
        }

        vm.onSelectFrequency = function (freq) {
            vm.frequency = freq;
        }

        vm.onSelectPriceOffer = function (offer) {
            vm.offer = offer;
        }

        vm.onFocusFrequency = function () {
            var el = document.getElementById('ddlFrequency');
            console.dir(el);
            showDropdown(el);
        }

        vm.openCalendar = function () {
            vm.calendar.opened = true;
        }

        function showDropdown(element) {
            var event;
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('mousedown', true, true, window);
            element.dispatchEvent(event);
        };

        vm.getFrequencyDisplayText = function (frequency) {
            var displayText = '<strong>' + frequency.frequency + '</strong> ' + frequency.price;
            return $sce.trustAsHtml(displayText);
        }

        vm.setOffer = function (priceOffer) {
            vm.offer = priceOffer;
        }

        vm.isOfferSelected = function (_offer) {
            return vm.offer && (_offer.name === vm.offer.name && _offer.value === vm.offer.value);
        }
    }
})();