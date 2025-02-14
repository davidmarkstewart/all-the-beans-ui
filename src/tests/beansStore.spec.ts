import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useBeansStore } from '../stores/beans';
import { Bean } from '../types';

const beans: Bean[] = [
  { id: '1', index: 0, isBOTD: false, name: 'TURNABOUT', country: 'Peru', colour: 'dark roast', cost: 5, image: '', description: '' },
  { id: '2', index: 1, isBOTD: false, name: 'ISONUS', country: 'Vietnam', colour: 'golden', cost: 15, image: '', description: '' },
  { id: '3', index: 2, isBOTD: false, name: 'ZILLAN', country: 'Colombia', colour: 'green', cost: 25, image: '', description: '' },
  { id: '4', index: 3, isBOTD: false, name: 'RONBERT', country: 'Brazil', colour: 'light roast', cost: 35, image: '', description: '' },
];

describe('Beans Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should calculate correct cost ranges for select box', () => {
    const store = useBeansStore();

    const expectedRanges = [
      { label: '£0 - £10', value: '0-10' },
      { label: '£10 - £20', value: '10-20' },
      { label: '£20 - £30', value: '20-30' },
      { label: '£30 - £40', value: '30-40' },
    ];

    const ranges = store.getFilteredBeansCostRanges(beans);
    expect(ranges).toEqual(expectedRanges);
  });

  it('should return all beans when no filters are applied', () => {
    const store = useBeansStore();

    store.$state.beans = beans;

    const filters = { country: '', colour: '', cost: '' };
    const filteredBeans = store.getFilteredBeans(filters);

    expect(filteredBeans).toEqual(beans);
  });

  it('should filter beans by country', () => {
    const store = useBeansStore();

    const beansWithDuplicateCountry: Bean[] = [...beans,
      { id: '5', index: 4, isBOTD: false, name: 'ZILLAN', country: 'Peru', colour: 'green', cost: 25, image: '', description: '' },
    ];

    store.$state.beans = beansWithDuplicateCountry;

    const filters = { country: 'Peru', colour: '', cost: '' };
    const filteredBeans = store.getFilteredBeans(filters);

    const expectedBeans = [
      { id: '1', index: 0, isBOTD: false, name: 'TURNABOUT', country: 'Peru', colour: 'dark roast', cost: 5, image: '', description: '' },
      { id: '5', index: 4, isBOTD: false, name: 'ZILLAN', country: 'Peru', colour: 'green', cost: 25, image: '', description: '' },
    ];

    expect(filteredBeans).toEqual(expectedBeans);
  });

  it('should filter beans by colour', () => {
    const store = useBeansStore();

    const beansWithDuplicateColour: Bean[] = [...beans,
      { id: '5', index: 4, isBOTD: false, name: 'ZANITY', country: 'Colombia', colour: 'dark roast', cost: 25, image: '', description: '' }
    ];

    store.$state.beans = beansWithDuplicateColour;

    const filters = { country: '', colour: 'dark roast', cost: '' };
    const filteredBeans = store.getFilteredBeans(filters);

    const expectedBeans = [
      { id: '1', index: 0, isBOTD: false, name: 'TURNABOUT', country: 'Peru', colour: 'dark roast', cost: 5, image: '', description: '' },
      { id: '5', index: 4, isBOTD: false, name: 'ZANITY', country: 'Colombia', colour: 'dark roast', cost: 25, image: '', description: '' },
    ];

    expect(filteredBeans).toEqual(expectedBeans);
  });

  it('should filter beans by cost', () => {
    const store = useBeansStore();

    store.$state.beans = beans;

    const filters = { country: '', colour: '', cost: '10-20' };
    const filteredBeans = store.getFilteredBeans(filters);

    const expectedBeans = [
      { id: '2', index: 1, isBOTD: false, name: 'ISONUS', country: 'Vietnam', colour: 'golden', cost: 15, image: '', description: '' },
    ];

    expect(filteredBeans).toEqual(expectedBeans);
  });

  it('should filter beans by multiple criteria', () => {
    const store = useBeansStore();

    const beans: Bean[] = [
      { id: '1', index: 0, isBOTD: false, name: 'TURNABOUT', country: 'Peru', colour: 'dark roast', cost: 5, image: '', description: '' },
      { id: '2', index: 1, isBOTD: false, name: 'ISONUS', country: 'Vietnam', colour: 'golden', cost: 15, image: '', description: '' },
      { id: '3', index: 2, isBOTD: false, name: 'ZILLAN', country: 'Peru', colour: 'dark roast', cost: 25, image: '', description: '' },
      { id: '4', index: 3, isBOTD: false, name: 'RONBERT', country: 'Peru', colour: 'dark roast', cost: 35, image: '', description: '' },
    ];

    store.$state.beans = beans;

    const filters = { country: 'Peru', colour: 'dark roast', cost: '20-30' };
    const filteredBeans = store.getFilteredBeans(filters);

    const expectedBeans = [
      { id: '3', index: 2, isBOTD: false, name: 'ZILLAN', country: 'Peru', colour: 'dark roast', cost: 25, image: '', description: '' },
    ];

    expect(filteredBeans).toEqual(expectedBeans);
  });
});