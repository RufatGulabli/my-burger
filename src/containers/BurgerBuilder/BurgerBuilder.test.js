import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import BurgerBuilder from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

describe('<BurgerBuilder>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
    });

    it('should render BuildingControls if ingredients exists', () => {
        wrapper.setProps({ ingredients: { salad: 1, bacon: 1, meat: 1, cheese: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });


});