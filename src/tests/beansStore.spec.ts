import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useBeansStore } from '../stores/beans';
import { Bean } from '../types';

describe('Beans Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should return correct cost ranges', () => {
    const store = useBeansStore();

    const beans: Bean[] = [
      { id: '1', index: 0, isBOTD: false, name: 'Bean 1', country: 'Country 1', colour: 'Colour 1', cost: 5, image: '', description: '' },
      { id: '2', index: 1, isBOTD: false, name: 'Bean 2', country: 'Country 2', colour: 'Colour 2', cost: 15, image: '', description: '' },
      { id: '3', index: 2, isBOTD: false, name: 'Bean 3', country: 'Country 3', colour: 'Colour 3', cost: 25, image: '', description: '' },
      { id: '4', index: 3, isBOTD: false, name: 'Bean 4', country: 'Country 4', colour: 'Colour 4', cost: 35, image: '', description: '' },
    ];

    const expectedRanges = [
      { label: '£0 - £10', value: '0-10' },
      { label: '£10 - £20', value: '10-20' },
      { label: '£20 - £30', value: '20-30' },
      { label: '£30 - £40', value: '30-40' },
    ];

    const ranges = store.getFilteredBeansCostRanges(beans);
    expect(ranges).toEqual(expectedRanges);
  });

  it('should return empty array if no beans are provided', () => {
    const store = useBeansStore();

    const beans: Bean[] = [];

    const expectedRanges: { label: string; value: string }[] = [];

    const ranges = store.getFilteredBeansCostRanges(beans);
    expect(ranges).toEqual(expectedRanges);
  });

  it('should return all beans when no filters are applied', () => {
    const store = useBeansStore();

    const beans: Bean[] = [
      { id: '1', index: 0, isBOTD: false, name: 'Bean 1', country: 'Country 1', colour: 'Colour 1', cost: 5, image: '', description: '' },
      { id: '2', index: 1, isBOTD: false, name: 'Bean 2', country: 'Country 2', colour: 'Colour 2', cost: 15, image: '', description: '' },
      { id: '3', index: 2, isBOTD: false, name: 'Bean 3', country: 'Country 3', colour: 'Colour 3', cost: 25, image: '', description: '' },
      { id: '4', index: 3, isBOTD: false, name: 'Bean 4', country: 'Country 4', colour: 'Colour 4', cost: 35, image: '', description: '' },
    ];

    store.$state.beans = beans;

    const filters = { country: '', colour: '', cost: '' };
    const filteredBeans = store.getFilteredBeans(filters);

    expect(filteredBeans).toEqual(beans);
  });

  it('should filter beans by country', () => {
    const store = useBeansStore();

    const beans: Bean[] = [
      { id: '1', index: 0, isBOTD: false, name: 'Bean 1', country: 'Country 1', colour: 'Colour 1', cost: 5, image: '', description: '' },
      { id: '2', index: 1, isBOTD: false, name: 'Bean 2', country: 'Country 2', colour: 'Colour 2', cost: 15, image: '', description: '' },
      { id: '3', index: 2, isBOTD: false, name: 'Bean 3', country: 'Country 1', colour: 'Colour 3', cost: 25, image: '', description: '' },
      { id: '4', index: 3, isBOTD: false, name: 'Bean 4', country: 'Country 4', colour: 'Colour 4', cost: 35, image: '', description: '' },
    ];

    store.$state.beans = beans;

    const filters = { country: 'Country 1', colour: '', cost: '' };
    const filteredBeans = store.getFilteredBeans(filters);

    const expectedBeans = [
      { id: '1', index: 0, isBOTD: false, name: 'Bean 1', country: 'Country 1', colour: 'Colour 1', cost: 5, image: '', description: '' },
      { id: '3', index: 2, isBOTD: false, name: 'Bean 3', country: 'Country 1', colour: 'Colour 3', cost: 25, image: '', description: '' },
    ];

    expect(filteredBeans).toEqual(expectedBeans);
  });

  it('should filter beans by colour', () => {
    const store = useBeansStore();

    const beans: Bean[] = [
      { id: '1', index: 0, isBOTD: false, name: 'Bean 1', country: 'Country 1', colour: 'Colour 1', cost: 5, image: '', description: '' },
      { id: '2', index: 1, isBOTD: false, name: 'Bean 2', country: 'Country 2', colour: 'Colour 2', cost: 15, image: '', description: '' },
      { id: '3', index: 2, isBOTD: false, name: 'Bean 3', country: 'Country 3', colour: 'Colour 1', cost: 25, image: '', description: '' },
      { id: '4', index: 3, isBOTD: false, name: 'Bean 4', country: 'Country 4', colour: 'Colour 4', cost: 35, image: '', description: '' },
    ];

    store.$state.beans = beans;

    const filters = { country: '', colour: 'Colour 1', cost: '' };
    const filteredBeans = store.getFilteredBeans(filters);

    const expectedBeans = [
      { id: '1', index: 0, isBOTD: false, name: 'Bean 1', country: 'Country 1', colour: 'Colour 1', cost: 5, image: '', description: '' },
      { id: '3', index: 2, isBOTD: false, name: 'Bean 3', country: 'Country 3', colour: 'Colour 1', cost: 25, image: '', description: '' },
    ];

    expect(filteredBeans).toEqual(expectedBeans);
  });

  it('should filter beans by cost', () => {
    const store = useBeansStore();

    const beans: Bean[] = [
      { id: '1', index: 0, isBOTD: false, name: 'Bean 1', country: 'Country 1', colour: 'Colour 1', cost: 5, image: '', description: '' },
      { id: '2', index: 1, isBOTD: false, name: 'Bean 2', country: 'Country 2', colour: 'Colour 2', cost: 15, image: '', description: '' },
      { id: '3', index: 2, isBOTD: false, name: 'Bean 3', country: 'Country 3', colour: 'Colour 3', cost: 25, image: '', description: '' },
      { id: '4', index: 3, isBOTD: false, name: 'Bean 4', country: 'Country 4', colour: 'Colour 4', cost: 35, image: '', description: '' },
    ];

    store.$state.beans = beans;

    const filters = { country: '', colour: '', cost: '10-20' };
    const filteredBeans = store.getFilteredBeans(filters);

    const expectedBeans = [
      { id: '2', index: 1, isBOTD: false, name: 'Bean 2', country: 'Country 2', colour: 'Colour 2', cost: 15, image: '', description: '' },
    ];

    expect(filteredBeans).toEqual(expectedBeans);
  });

  it('should filter beans by multiple criteria', () => {
    const store = useBeansStore();

    const beans: Bean[] = [
      { id: '1', index: 0, isBOTD: false, name: 'Bean 1', country: 'Country 1', colour: 'Colour 1', cost: 5, image: '', description: '' },
      { id: '2', index: 1, isBOTD: false, name: 'Bean 2', country: 'Country 2', colour: 'Colour 2', cost: 15, image: '', description: '' },
      { id: '3', index: 2, isBOTD: false, name: 'Bean 3', country: 'Country 1', colour: 'Colour 1', cost: 25, image: '', description: '' },
      { id: '4', index: 3, isBOTD: false, name: 'Bean 4', country: 'Country 1', colour: 'Colour 1', cost: 35, image: '', description: '' },
    ];

    store.$state.beans = beans;

    const filters = { country: 'Country 1', colour: 'Colour 1', cost: '20-30' };
    const filteredBeans = store.getFilteredBeans(filters);

    const expectedBeans = [
      { id: '3', index: 2, isBOTD: false, name: 'Bean 3', country: 'Country 1', colour: 'Colour 1', cost: 25, image: '', description: '' },
    ];

    expect(filteredBeans).toEqual(expectedBeans);
  });
});