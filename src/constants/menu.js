export const CATEGORY = {
    special: "Special Burgers",
    standard: "Standard Burgers",
    souvlaki: "Souvlakis",
    extras: "Extras",
    sides: "Sides",
    drinks: "Drinks"
}

export const SUBCATEGORY = {
    lot: "Lot",
    mex: "Mex",
    haw: "Haw",
    rusty: "Rusty",
    smokey: "Smokey",
    kids: "Kids",
    standard: "Standard",
    souvlaki: "Souvlaki",
    topping: "Topping",
    modifier: "Modifier",
    patty: "Patty",
    chips: "Chips",
    snack: "Snack",
    basicDrink: "Basic drinks",
    water: "Water",
    otherDrink: "Other drinks"
}

export const MENU_STRUCT = {
    [CATEGORY.special]: [
        [SUBCATEGORY.lot],
        [SUBCATEGORY.mex],
        [SUBCATEGORY.haw],
        [SUBCATEGORY.rusty],
        [SUBCATEGORY.smokey],
        [SUBCATEGORY.kids],
    ],
    [CATEGORY.standard]: [
        [SUBCATEGORY.standard]
    ],
    [CATEGORY.souvlaki]: [
        [SUBCATEGORY.souvlaki]
    ],
    [CATEGORY.extras]: [
        [SUBCATEGORY.topping],
        [SUBCATEGORY.modifier],
        [SUBCATEGORY.patty]
    ],
    [CATEGORY.sides]: [
        [SUBCATEGORY.chips],
        [SUBCATEGORY.snack]
    ],
    [CATEGORY.drinks]: [
        [SUBCATEGORY.basicDrink],
        [SUBCATEGORY.water],
        [SUBCATEGORY.otherDrink]
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