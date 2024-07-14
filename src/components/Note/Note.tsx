import { Component } from 'react'

export default class Note extends Component {
  content: string
  id: number
  removeHandler: any

  constructor(props) {
    super(props)
    this.id = props.items.id
    this.content = props.items.content
    this.removeHandler = props.removeHandler
  }

  render() {
    return (
      <>
        <div className='note'>
          <div className='note-text'>{this.content}</div>
          <button 
          className='close-button'
          type='button'
          onClick={this.removeHandler}></button>
        </div>
        
      </>
    )
  }
}
