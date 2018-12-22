let Producer = require('./producer');

class Province {
    constructor(doc) {
        this._name = doc.name;
        this._producers = [];
        this._totalProduction = 0;
        this._demand = doc.demand;
        this._price = doc.price;
        doc.producers.forEach(d => this.addProducer(new Producer(this, d)));
    }

    addProducer(arg)
    {
        this._producers.push(arg);
        this._totalProduction += arg.production;
    }

    get name() {
        return this._name;
    }

    get producers() {
        return this._producers.slice();
    }

    get totalProduction() {
        return this._totalProduction;
    }

    get demand() {
        return this._demand;
    }

    set demand(arg) {
        this._demand = parseInt(arg);
    }

    get price()
    {
        return this._price;
    }

    set price(arg)
    {
        this._price = parseInt(arg);
    }

    get shortfall()
    {
        return this._demand - this._totalProduction;
    }

    get satisfiedDemand()
    {
        return Math.min(this._demand, this._totalProduction);
    }

    get demandValue()
    {
        return this._demand * this._price;
    }

    get profit()
    {
        return Math.min(this.demandValue, this._totalProduction * this._price) - this.demandCost;
    }

    get demandCost()
    {
        let remaningDemand = this.demand;
        let result = 0;

        this.producers.sort((a, b) => a.cost - b.cost).forEach(p => {
            const contribution = Math.min(remaningDemand, p.production);
            remaningDemand -= contribution;
            result += contribution * p.cost;
        });

        return result;
    }
}

module.exports = Province;
