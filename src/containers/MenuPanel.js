import * as React from 'react';
import { styled } from 'styled-components';
import { connect } from 'react-redux'

import { CATEGORY, CATEGORY_WITH_EXTRAS, MENU_STRUCT } from '../constants/menu';
import MenuButton from '../components/MenuButton';
import Filter from '../components/Filter';
import { addOrder } from '../slice/OrderSlice';
import { updateMenuList } from '../slice/MenuSlice';
import { categoryExists, getExtraFilters, getMenuFromFB, subExists } from '../functions/menu';
import { objectsEqual } from '../functions/util';

const Panel = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    border: 1px solid #808080;
    width: ${window.innerWidth >= 750 ? '70%' : '90%'};
    height: 90%;
    align-items: start;
    padding: 5px;
`;

const Category = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const SubCategory = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Title = styled.h4`
    margin-left: 5px;
    margin-block: 10px;
`;

const mapDispatchToProps = { 
    addOrder,
    getMenuFromFB,
    updateMenuList
};

const mapStateToProps = state => ({
    menuList: state.menu.menuList
});

class MenuPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterBy: "All",
            formattedMenu: {}
        };
    }

    componentDidMount(){
        let menuLength = Object.keys(this.props.menuList).length;
        if (menuLength === 0){
            this.props.getMenuFromFB();
        }
        if (menuLength > 0)
            this.setState({formattedMenu: this.props.menuList});
    }

    componentDidUpdate(prevProps){
        if (this.props.menuList && !objectsEqual(prevProps.menuList, this.props.menuList)){
            let menuLength = Object.keys(this.props.menuList).length;

            menuLength > 0 && this.setState({formattedMenu: this.props.menuList});
        }
    }

    handleFilter = (filterBy) => {
        this.setState({filterBy});
    }

    handleMenuAdd = ({name, price}) => {
        this.props.addOrder({name, price});
    }

    renderSubcategory(catId, subId){
        let { formattedMenu } = this.state;

        return <SubCategory key={subId}>
            {
                Object.keys(formattedMenu).length > 0 &&
                formattedMenu[catId][subId].map(menu => {
                    return <MenuButton
                        key={menu.id}
                        menu={menu}
                        onClick={this.handleMenuAdd.bind(this)}
                    />
                })
            }
        </SubCategory>
    }

    renderCategory(catId){
        let { formattedMenu, filterBy } = this.state;

        if (
            filterBy === 'All' || 
            catId === filterBy ||
            (catId === CATEGORY.extras && CATEGORY_WITH_EXTRAS.includes(filterBy))
        )
            return <div key={catId}>
                <Title>{catId}</Title>
                <Category>
                    {
                        //render all sub registered in MENU_STRUCT
                        MENU_STRUCT[catId].map(subId => {
                            return this.renderSubcategory(catId, subId);
                        })
                    }
                    {
                        //render all sub NOT registered in MENU_STRUCT
                        Object.keys(formattedMenu).length > 0 &&
                        Object.keys(formattedMenu[catId]).map(subId => {
                            if (!subExists(catId, subId))
                                return this.renderSubcategory(catId, subId);
                            return null;
                        })
                    }
                </Category>
            </div>
        return null;
    }

    render() {
        let { formattedMenu, filterBy } = this.state;

        return <Panel className='menu-panel'>
            <Filter 
                filterBy={filterBy} 
                onFilter={this.handleFilter.bind(this)} 
                extraFilter={getExtraFilters(Object.keys(formattedMenu))}
            />
            {
                Object.values(CATEGORY).map(catId => {
                    return this.renderCategory(catId)
                })
            }
            {
                 Object.keys(formattedMenu).length > 0 &&
                 Object.keys(formattedMenu).map(catId => {
                    if (!categoryExists(catId))
                        return this.renderCategory(catId);
                    return null;
                 })
            }
        </Panel>
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuPanel)