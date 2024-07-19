import React, { Component } from 'react'

type typeFormProps = {
  inputRef: React.RefObject<HTMLInputElement>
  handler: () => void
}

export default class AddForm extends Component<typeFormProps> {
  inputRef: React.RefObject<HTMLInputElement>
  handler: () => void

  constructor(props: typeFormProps) {
    super(props)
    this.inputRef = props.inputRef
    this.handler = props.handler
  }

  render() {
    return (
      <>
        <div className='form-container'>
          <input 
          type='text'
          className='add-form'
          placeholder={'Введите текст'}
          ref={this.inputRef}>
          </input>
          <button type='submit' className='submit-button' onClick={this.handler}></button>
        </div>
      </>
    )
  }
}
