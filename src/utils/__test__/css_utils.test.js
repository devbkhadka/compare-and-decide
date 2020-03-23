import { joinClss } from '../css_utils'

it('should return space seperated class names', ()=>{
    let result = joinClss('clss1', 'clss2', 'clss3')
    expect(result).toEqual('clss1 clss2 clss3')

    result = joinClss('clss1')
    expect(result).toEqual('clss1')

    result = joinClss()
    expect(result).toEqual('')

})