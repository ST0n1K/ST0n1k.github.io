/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/


class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element {
    constructor(name, buildYear, area, trees) {
        super(name, buildYear);
        this.trees = trees;
        this.area = area;
    }

    Density() {
        const density = this.trees / this.area;
        console.log(`Density of park ${this.name} is ${density}`);
    }
}

class Street extends Element {
    constructor(name, buildYear, classification, length = 3) {
        super(name, buildYear);
        this.length = length;
        this.classification = classification;
    }

    Classificate() {
        const type = new Map();
        type.set(1, 'tiny');
        type.set(2, 'small');
        type.set(3, 'normal');
        type.set(4, 'big');
        type.set(5, 'huge');
        console.log(`Street ${this.name} is classified as ${type.get(this.length)}`);
    }
}

const Parks = [new Park('Park1', 1990, 120, 800), new Park('Park2', 2000, 180, 1200), new Park('Park3', 2012, 300, 2400)];

const Streets = [new Street('Street1', 1820, 400, 2), new Street('Street2', 1843, 100, 1), new Street('Street3', 1932, 1400, 4), new Street('Street4', 1967, 900)];

function calculate(arr) {
    const sum = arr.reduce((cur, prev, index) => cur + prev, 0);
    return [sum, sum / arr.length];
}

function reportParks(parks) {
    console.log('PARKS REPORT');

    // Density
    parks.forEach(el => el.Density());

    // Average age
    const [averageAge, totalAge] = calculate(parks.map(el => new Date().getFullYear() - el.buildYear));
    console.log(`Average year for all parks is ${averageAge}`);

    // Park with > 1000 trees
    const trees = parks.map(el => el.trees);
    for(let tree of trees) {
        if(tree > 1000) {
            console.log(`Tree ${tree} has more than 1000 trees`);
        }
    }
}

function reportStreets(streets) {
    console.log('STREETS REPORT');

    // Average and total length
    const [totalLength, averageLength] = calculate(streets.map(el => el.length));
    console.log(`Total length of streets is ${totalLength} and average is ${averageLength}`);

    // Size class of all
    streets.forEach(el => el.Classificate());

}

reportParks(Parks);
reportStreets(Streets);

