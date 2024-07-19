import { Component } from 'react'

export type NoteType = {
  content: string
  id: number
}

type NotePropsType = {
  items: NoteType
  removeHandler: () => void
}

export default class Note extends Component<NotePropsType> {
  id: number
  content: string
  removeHandler: () => void

  constructor(props: NotePropsType) {
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
