import * as React from 'react';
import { styled } from 'styled-components';
import { connect } from 'react-redux'

import { CATEGORY, CATEGORY_WITH_EXTRAS, MENU } from '../constants/menu';
import MenuButton from '../components/MenuButton';
import Filter from './Filter';
import { addOrder } from '../slice/OrderSlice';

const Panel = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    border: 1px solid #808080;
    width: 90%;
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
    addOrder
};

class MenuPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterBy: "all"
        };
    }

    handleFilter = (filterBy) => {
        this.setState({filterBy});
    }

    handleMenuAdd = (name, price) => {
        this.props.addOrder({name, price});
    }

    render() {
        return <Panel>
            <Filter filterBy={this.state.filterBy} onFilter={this.handleFilter.bind(this)}/>
            {
                Object.keys(CATEGORY).map(id => {
                    if (
                        this.state.filterBy === 'all' || 
                        id === this.state.filterBy ||
                        (CATEGORY[id] === CATEGORY.extras && CATEGORY_WITH_EXTRAS.includes(CATEGORY[this.state.filterBy]))
                    )
                        return <div key={id}>
                            <Title>{CATEGORY[id]}</Title>
                            <Category>
                                {
                                    MENU[CATEGORY[id]].map((sub, subIdx) => {
                                        return <SubCategory key={subIdx}>
                                            {
                                                sub.map((menu, menuIdx) => {
                                                    return <MenuButton
                                                        key={`${menu}-${menuIdx}`}
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