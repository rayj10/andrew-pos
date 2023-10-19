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
        let {filterBy, onFilter, extraFilter = []} = this.props;

        return <Container>
            <FilterButton 
                name='All' 
                selected={filterBy === 'All'}
                onClick={() => onFilter && onFilter('All')}
            />
            {
                Object.keys(CATEGORY).map(id => {
                    return <FilterButton 
                        key={id}
                        name={CATEGORY[id]} 
                        selected={filterBy === CATEGORY[id]}
                        onClick={onFilter}
                    />
                })
            }
            {
                extraFilter.map(filter => {
                    return <FilterButton 
                        key={filter}
                        name={filter} 
                        selected={filterBy === filter}
                        onClick={onFilter}
                    />
                })
            }
        </Container>
    }
}