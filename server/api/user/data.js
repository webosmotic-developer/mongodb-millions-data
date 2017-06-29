'use strict';

/*
 * Get users mock data.
 * http://www.json-generator.com/
 * [
     '{{repeat(10000, 10000)}}',
     {
         _id: '{{objectId()}}',
         isActive: '{{bool()}}',
         balance: '{{floating(1000, 4000, 2)}}',
         picture: 'http://placehold.it/32x32',
         age: '{{integer(20, 40)}}',
         eyeColor: '{{random("blue", "brown", "green")}}',
         name: '{{firstName()}} {{surname()}}',
         gender: '{{gender()}}',
         company: '{{company().toUpperCase()}}',
         email: '{{email()}}',
         phone: '+1 {{phone()}}',
         address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
         about: '{{lorem(1, "paragraphs")}}',
         registered: '{{date(new Date(2014, 0, 1), new Date())}}',
         latitude: '{{floating(-90.000001, 90)}}',
         longitude: '{{floating(-180.000001, 180)}}'
     }
 ]
 * */
exports.mock = function () {
    return []
};
