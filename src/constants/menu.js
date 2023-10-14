export const CATEGORY = {
    special: "Special Burgers",
    standard: "Standard Burgers",
    souvlaki: "Souvlakis",
    extras: "Extras",
    sides: "Sides",
    drinks: "Drinks"
}

export const MENU = {
    [CATEGORY.special]: [
        [
            {
                name: "Lot Beef",
                price: 18
            },
            {
                name: "Lot Chicken",
                price: 18.5
            },
            {
                name: "Lot Steak",
                price: 19
            },
            {
                name: "Lot Veg",
                price: 17
            }
        ],
        [
            {
                name: "Mex Beef",
                price: 17
            },
            {
                name: "Mex Chicken",
                price: 18
            },
            {
                name: "Mex Steak",
                price: 18
            },
            {
                name: "Mex Veg",
                price: 16
            }
        ],
        [
            {
                name: "Haw Beef",
                price: 17
            },
            {
                name: "Haw Chicken",
                price: 18
            },
            {
                name: "Haw Steak",
                price: 18
            },
            {
                name: "Haw Veg",
                price: 16
            }
        ],
        [
            {
                name: "Rusty Beef",
                price: 17
            },
            {
                name: "Rusty Chicken",
                price: 18
            },
            {
                name: "Rusty Steak",
                price: 18
            },
            {
                name: "Rusty Veg",
                price: 16
            }
        ],
        [
            {
                name: "Smokey Beef",
                price: 17
            },
            {
                name: "Smokey Chicken",
                price: 18
            },
            {
                name: "Smokey Steak",
                price: 18
            }
        ],
        [
            {
                name: "Kids",
                price: 10
            }
        ]
    ],
    [CATEGORY.standard]: [
        [
            {
                name: "Beef",
                price: 12.5
            },
            {
                name: "Chicken",
                price: 15
            },
            {
                name: "Steak",
                price: 16
            },
            {
                name: "Veg",
                price: 15
            }
        ]
    ],
    [CATEGORY.souvlaki]: [
        [
            {
                name: "Chicken Souv",
                price: 16
            },
            {
                name: "Lamb Souv",
                price: 17.5
            },
            {
                name: "Veg Souv",
                price: 16
            }
        ]
    ],
    [CATEGORY.extras]: [
        [
            {
                name: "+ Egg/Bacon",
                price: 2
            },
            {
                name: "+ Other",
                price: 1.5
            }
        ],
        [
            {
                name: "GF",
                price: 4
            }
        ],
        [
            {
                name: "+ Patty",
                price: 5
            },
            {
                name: "+ Chicken",
                price: 7
            },
            {
                name: "+ Steak",
                price: 10
            }
        ]
    ],
    [CATEGORY.sides]: [
        [
            {
                name: "Small Chips",
                price: 6
            },
            {
                name: "Reg Chips",
                price: 8
            },
            {
                name: "Large Chips",
                price: 10
            }
        ],
        [
            {
                name: "Potato Cake",
                price: 2
            },
            {
                name: "Steamed Dimsim",
                price: 2
            },
            {
                name: "Fried Dimsim",
                price: 2
            }
        ]
    ],
    [CATEGORY.drinks]: [
        [
            {
                name: "Cans",
                price: 3.5
            },
            {
                name: "600ml",
                price: 4
            },
            {
                name: "Glass",
                price: 4
            }
        ],
        [
            {
                name: "Water",
                price: 3.5
            },
            {
                name: "Sparkling",
                price: 4.5
            }
        ],
        [
            {
                name: "Jarritos",
                price: 5
            },
            {
                name: "Bickfords & Bundaberg",
                price: 4
            },
            {
                name: "Juice",
                price: 3.5
            },
            {
                name: "Imported Cans",
                price: 4.5
            }
        ]
    ],
}

export const COLOR_CODE = {
    [CATEGORY.special]: "#FF3232",
    [CATEGORY.standard]: "#00CC00",
    [CATEGORY.souvlaki]: "#016064",
    [CATEGORY.extras]: "#FCD12A",
    [CATEGORY.sides]: "#FF7900",
    [CATEGORY.drinks]: "#95C8D8"
};

export const CATEGORY_WITH_EXTRAS = [
    CATEGORY.special,
    CATEGORY.standard,
    CATEGORY.souvlaki
]