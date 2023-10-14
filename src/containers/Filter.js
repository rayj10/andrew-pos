import * as React from 'react';
import { styled } from 'styled-components';
import FilterButton from '../components/FilterButton';
import { CATEGORY } from '../constants/menu';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-block: 10px;
`;

export default class Filter extends React.Component {
    render(){
        let {filterBy, onFilter} = this.props;

        return <Container>
            <FilterButton 
                id='all' 
                name='All' 
                selected={filterBy === 'all'}
                onClick={() => onFilter && onFilter('all')}
            />
            {
                Object.keys(CATEGORY).map(id => {
                    return <FilterButton 
                        key={id}
                        id={id} 
                        name={CATEGORY[id]} 
                        selected={filterBy === id}
                        onClick={onFilter}
                    />
                })
            }
        </Container>
    }
}