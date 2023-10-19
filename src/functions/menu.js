import { MENU_STRUCT } from '../constants/menu';
import { getMenu } from '../functions/firebase';
import { updateMenuList } from '../slice/MenuSlice';


export function formatMenu(menu = []){
    let formattedMenu = {};

    menu.forEach(item => {
        //if category doesn't exists
        if (!formattedMenu[item.category])
            formattedMenu[item.category] = {};

        //if subcategory doesn't exists
        if (!formattedMenu[item.category][item.sub])
         formattedMenu[item.category][item.sub] = [];

        formattedMenu[item.category][item.sub].push(item);
    });

    return formattedMenu;
}

export function categoryExists(catId){
    return Object.keys(MENU_STRUCT).includes(catId);
}

export function subExists(catId, subId){
    return MENU_STRUCT[catId] && MENU_STRUCT[catId].includes(subId)
}

export function getExtraFilters(categoriesFromDB = []){
    let extras = [];

    categoriesFromDB.forEach(catId => {
        if (!categoryExists(catId))
            extras.push(catId);
    });

    return extras;
}

export function getMenuFromFB(){
    return dispatch => {
        return getMenu()
            .then(menu => {
                let formattedMenu = formatMenu(menu);
                dispatch(updateMenuList(formattedMenu));
            })
            .catch(e =>
                alert(JSON.stringify(e))
            );
    }
}