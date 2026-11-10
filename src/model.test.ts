import { describe, it, expect } from 'vitest';
import { demoServices, filterServices, summarize } from './model';
describe('dashboard model',()=>{
  it('summarizes all synthetic services',()=>expect(summarize(demoServices)).toEqual({total:5,healthy:3,incidents:2}));
  it('combines case-insensitive search and status',()=>expect(filterServices(demoServices,'  PLATFORM ','healthy').map(s=>s.id)).toEqual(['api','jobs']));
  it('returns an empty list for no match',()=>expect(filterServices(demoServices,'missing','all')).toEqual([]));
  it('filters down services',()=>expect(filterServices(demoServices,'','down').map(s=>s.id)).toEqual(['warehouse']));
});
