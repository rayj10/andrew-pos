import * as React from 'react';
import { styled } from 'styled-components';
import { connect } from 'react-redux'

import { CATEGORY, CATEGORY_WITH_EXTRAS, MENU_STRUCT } from '../constants/menu';
import MenuButton from '../components/MenuButton';
import Filter from './Filter';
import { addOrder } from '../slice/OrderSlice';
import { updateMenuList } from '../slice/MenuSlice';
import { getMenu } from '../functions/firebase';
import { formatMenu } from '../functions/menu';

const Panel = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    border: 1px solid #808080;
    width: 70%;
    margin-inline: ${window.innerWidth >= 750 ? '20px' : '10px'};
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

const mapStateToProps = state => ({
    menuList: state.menu.menuList
});

class MenuMgmt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterBy: "all",
            formattedMenu: {}
        };
    }

    componentDidMount(){
        let menuLength = Object.keys(this.props.menuList).length;
        if (menuLength === 0){
            getMenu()
                .then(menu => {
                    let formattedMenu = formatMenu(menu);
                    this.setState({formattedMenu});
                    this.props.updateMenuList(formattedMenu);
                })
                .catch(e =>
                    alert(JSON.stringify(e))
                );
        }
        if (menuLength > 0)
            this.setState({formattedMenu: this.props.menuList});
    }

    handleFilter = (filterBy) => {
        this.setState({filterBy});
    }

    handleMenuEdit = (menu) => {
       alert(JSON.stringify(menu))
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
                                                        menu={menu}
                                                        onClick={this.handleMenuEdit.bind(this)}
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
export default connect(mapStateToProps, mapDispatchToProps)(MenuMgmt)