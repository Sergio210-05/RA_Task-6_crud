import React, { Component } from 'react'

export default class AddForm extends Component {
  constructor(props) {
    super(props)
    this.inputRef = props.inputRef
    this.handler = props.handler
  }

  componentDidMount(): void {
  }

  render() {
    return (
      <>
        <div className='form-container'>
          <input 
          type='text'
          className='add-form'
          defaultValue={'Some text'}
          ref={this.inputRef}>
          </input>
          <button type='submit' className='submit-button' onClick={this.handler}></button>
          
        </div>
      </>
    )
  }
}
