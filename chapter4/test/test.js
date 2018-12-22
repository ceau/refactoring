let Province = require('../js/province');
let assert = require('assert');

function sampleProvinceData() {
    return {
        name: "Asia",
        producers: [
            {
                name: "Byzantium",
                cost: 10,
                production: 9
            },
            {
                name: "Attalia",
                cost: 12,
                production: 10
            },
            {
                name: "Sinope",
                cost: 10,
                production: 6
            }
        ],
        demand: 30,
        price: 20
    };
}

describe('province', function () {
    let asia;
    beforeEach(function () {
        asia = new Province(sampleProvinceData());
    });
    it('shortfall', function () {
        assert.equal(asia.shortfall, 5);
    });
    it('profit', function () {
        assert.equal(asia.profit, 230);
    });
});

describe('no producers', function () {
    let noProducers;
    beforeEach(function () {
        const data = {
            name: "No proudcers",
            producers: [],
            demand: 30,
            price: 20
        };
        noProducers = new Province(data);
    });
    it('shortfall', function () {
        assert.equal(noProducers.shortfall, 20);
    });
});


