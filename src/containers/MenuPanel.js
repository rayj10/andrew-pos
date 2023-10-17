import * as React from 'react';
import { styled } from 'styled-components';
import { connect } from 'react-redux'

import { CATEGORY, CATEGORY_WITH_EXTRAS, MENU_STRUCT } from '../constants/menu';
import MenuButton from '../components/MenuButton';
import Filter from './Filter';
import { addOrder } from '../slice/OrderSlice';
import { updateMenuList } from '../slice/MenuSlice';
import { getMenu } from '../functions/firebase';

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
    updateMenuList
};

class MenuPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterBy: "all",
            formattedMenu: {}
        };
    }

    componentDidMount(){
        getMenu()
            .then(menu => {
                let formattedMenu = this.formatMenu(menu);
                this.setState({formattedMenu});
                this.props.updateMenuList(formattedMenu);
            })
            .catch(e =>
                alert(JSON.stringify(e))
            );
    }

    formatMenu(menu = []){
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

    handleFilter = (filterBy) => {
        this.setState({filterBy});
    }

    handleMenuAdd = (name, price) => {
        this.props.addOrder({name, price});
    }

    render() {
        let { formattedMenu, filterBy } = this.state;

        return <Panel className='menu-panel'>
            <Filter filterBy={filterBy} onFilter={this.handleFilter.bind(this)}/>
            {
                Object.keys(CATEGORY).map(id => {
                    if (
                        filterBy === 'all' || 
                        id === filterBy ||
                        (CATEGORY[id] === CATEGORY.extras && CATEGORY_WITH_EXTRAS.includes(CATEGORY[filterBy]))
                    )
                        return <div key={id}>
                            <Title>{CATEGORY[id]}</Title>
                            <Category>
                                {
                                    MENU_STRUCT[CATEGORY[id]].map(subId => {
                                        return <SubCategory key={subId}>
                                            {
                                                Object.keys(formattedMenu).length > 0 &&
                                                formattedMenu[CATEGORY[id]][subId].map(menu => {
                                                    return <MenuButton
                                                        key={menu.id}
                                                        {...menu}
                                                        category={CATEGORY[id]}
                                                        onClick={this.handleMenuAdd.bind(this)}
                                                    />
                                                })
                                            }
                                        </SubCategory>
                                    })
                                }
                            </Category>
                        </div>
                    return null;
                })
            }
        </Panel>
    }
}
export default connect(null, mapDispatchToProps)(MenuPanel)