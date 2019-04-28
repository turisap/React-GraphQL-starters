function Person (food, name) {
    this.food = food;
    this.name = name;
}

Person.prototype.fetchFavFood = function() {
    return (
        new Promise((resolve, rej) => {
            // simulating fetching an API
            setTimeout(() => resolve(this.food), 2000)
        })
    )
}


describe('mocking learning', () => {
    it('mocks a regular function', () => {
        const fetchDogs = jest.fn();
        fetchDogs('sneakers');
        expect(fetchDogs).toHaveBeenCalled();
        expect(fetchDogs).toHaveBeenCalledWith('sneakers');
        fetchDogs('hugo');
        expect(fetchDogs).toHaveBeenCalledTimes(2);
    })

    it('can create a person', () => {
        const me = new  Person(['serradura', 'chocolates'], 'Kirill');
        expect(me.name).toBe('Kirill');
    })

    it('can fetch foods', async () => {
        const me = new  Person(['serradura', 'chocolates'], 'Kirill');
        // mock the favFood() function
        me.fetchFavFood = jest.fn().mockResolvedValue(['sushi', 'ramen']);
        const favFood = await me.fetchFavFood();
        expect(favFood).toContain('sushi');
    })
})