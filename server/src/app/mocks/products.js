module.exports = [
    {
        name: 'Supreme T-Shirt', 
        brand: 'Supreme', 
        price: 99.99, 
        // options: [ 
        //     { color: 'blue' }, 
        //     { size: 'XL' } 
        // ],
        reviews: JSON.stringify([
            {
                id: 1,
                message: 'awesome t-shirt',
                grade: '5'
            },
            {
                id: 2,
                message: 'size is smaller than it was marked',
                grade: '3'
            }
        ])
    },
    {
        name: 'Addidas Shoues', 
        brand: 'Addias', 
        price: 135.99, 
        // options: [ 
        //     { color: 'black' }, 
        //     { size: '8.5' } 
        // ],
        reviews: JSON.stringify([
            {
                id: 1,
                message: 'best shoes which I have ever bought',
                grade: '5'
            }
        ])
    },
    {
        name: 'Asics Running Shoes', 
        brand: 'Asics', 
        price: 89.99, 
        // options: [ 
        //     { color: 'blue' }, 
        //     { size: '7.5' } 
        // ],
        reviews: JSON.stringify([
            {
                id: 1,
                message: 'awesome soft shoes',
                grade: '5'
            }
        ])
    },
];
