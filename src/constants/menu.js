export const CATEGORY = {
    special: "Special Burgers",
    standard: "Standard Burgers",
    souvlaki: "Souvlakis",
    extras: "Extras",
    sides: "Sides",
    rolls: "Rolls",
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
        SUBCATEGORY.lot,
        SUBCATEGORY.mex,
        SUBCATEGORY.haw,
        SUBCATEGORY.rusty,
        SUBCATEGORY.smokey,
        SUBCATEGORY.kids,
    ],
    [CATEGORY.standard]: [
        SUBCATEGORY.standard
    ],
    [CATEGORY.souvlaki]: [
        SUBCATEGORY.souvlaki
    ],
    [CATEGORY.extras]: [
        SUBCATEGORY.topping,
        SUBCATEGORY.modifier,
        SUBCATEGORY.patty
    ],
    [CATEGORY.sides]: [
        SUBCATEGORY.chips,
        SUBCATEGORY.snack
    ],
    [CATEGORY.rolls]: [
        SUBCATEGORY.standard,
    ],
    [CATEGORY.drinks]: [
        SUBCATEGORY.basicDrink,
        SUBCATEGORY.water,
        SUBCATEGORY.otherDrink
    ],
}

export const COLOR_CODE = {
    [CATEGORY.special]: "#FF3232",
    [CATEGORY.standard]: "#00CC00",
    [CATEGORY.souvlaki]: "#016064",
    [CATEGORY.extras]: "#FCD12A",
    [CATEGORY.sides]: "#FF7900",
    [CATEGORY.rolls]: '#D0B49F',
    [CATEGORY.drinks]: "#95C8D8"
};

export const CATEGORY_WITH_EXTRAS = [
    CATEGORY.special,
    CATEGORY.standard,
    CATEGORY.souvlaki
];

export const MENU_FIELD_ID = {
    id: 'id',
    name: 'name',
    price: 'price',
    category: 'category',
    customCategory: 'customCategory',
    sub: 'sub',
    customSub: 'customSub',
}

export const MENU_FIELDS = [
    {
        id: MENU_FIELD_ID.id,
        label: 'Item ID',
        helper: "Can't contain forward slash (/)"
    },
    {
        id: MENU_FIELD_ID.name,
        label: 'Item Name'
    },
    {
        id: MENU_FIELD_ID.price,
        label: 'Price'
    },
    {
        id: MENU_FIELD_ID.category,
        label: 'Category',
        select: CATEGORY,
        helper: 'Select where to group this item'
    },
    {
        id: MENU_FIELD_ID.customCategory,
        label: 'Custom Category',
        helper: 'Required if no Category selected'
    },
    {
        id: MENU_FIELD_ID.sub,
        label: 'Subcategory',
        select: SUBCATEGORY,
        helper: 'Select where in the category this item will be displayed in'
    },
    {
        id: MENU_FIELD_ID.customSub,
        label: 'Custom Sub',
        helper: 'Required if no Subcategory selected'
    },
]