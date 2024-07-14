import React, { Component } from 'react'
import AddForm from '../AddForm/AddForm'
import Note from '../Note/Note'

export default class Notes extends Component {
  reloadButton: React.RefObject<unknown>
  id: number
  inputForm: React.RefObject<unknown>
  url: string
  references: {}
  
  constructor(props) {
    super(props)
    this.url = 'http://localhost:7070'
    this.reloadButton = React.createRef()
    this.inputForm = React.createRef()
    this.id = 0
    this.state = {
      notes: []
    }
    this.references = {}
  }

  componentDidMount(): void {
    this.getNotes()
  }

  handleSubmit = () => {
    const content = this.inputForm.current?.value
    return content
  }

  updateNoteList = () => {
    this.getNotes()
  }

  removeNote = (element) => {
    fetch(`${this.url}/notes/${element.id}`, {
      method: 'DELETE'
    })
    .then((response) => response)
    .then(() => {
      this.getNotes()
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  getNotes = () => {
    fetch(`${this.url}/notes`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        notes: data
      })
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  postNote = () => {
    fetch(`${this.url}/notes`, {
      method: 'POST',
      body: JSON.stringify({
        "id": ++this.id,
        "content": this.handleSubmit()
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then((response) => response)
    .then((data) => {
      this.getNotes()
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  render() {
    return (
      <>
        <div className='title-container'>
          <div className='title'>Notes</div>
          <button className='reset-button' ref={this.reloadButton} onClick={this.updateNoteList}></button>
        </div>

        <div className='notes-container'>
          {this.props.children}
          {this.state.notes.map(note => {
            return(
              <Note 
              key={note.id} 
              items={note} 
              ref={ref => this.references[note.id] = ref}
              removeHandler={() => this.removeNote(this.references[note.id])}
              />
            )
          })}
        </div>
        <AddForm inputRef={this.inputForm} handler={this.postNote}/>
      </>
      
    )
  }
}
