import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import list from '../../list.js'

import Word from '../Word/Word'
import Pair from './Pair'
import PairButton from './PairButton'
import GapContainer from '../Gap/GapContainer'
import checkmarkIcon from "../icons/checkmark.svg";
import editIcon from "../icons/edit.svg";

configure({adapter: new Adapter});

let wrapper

beforeEach(() => {
    wrapper = shallow(<Pair pair={list[0]}/>);

})


describe('<Pair />', () => {
    it('should rener 2 words', () => {
       // const wrapperWord = shallow(<Word/>);
        expect(wrapper.find(Word)).toHaveLength(2);

    })

    it('should rener 2 buttons', () => {
        expect(wrapper.find(PairButton)).toHaveLength(2);
    })
    it('should have one element with class', () => {
        wrapper.setProps({edit: true})
        expect(wrapper.find('.type-switcher')).toHaveLength(1);
    })

    it('should rener checkmark buttons', () => {
        expect(wrapper.contains(<PairButton
            alt={'edit'}
        />)).toHaveLength(1);
    })
});