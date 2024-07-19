import React, { Component } from 'react'
import AddForm from '../AddForm/AddForm'
import Note, {NoteType} from '../Note/Note'

export default class Notes extends Component {
  reloadButton: React.RefObject<HTMLButtonElement>
  id: number
  inputForm: React.RefObject<HTMLInputElement>
  url: string
  references: {}
  state: Readonly<{notes: NoteType[]}>
  
  constructor(props: {}) {
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

  componentDidMount = (): void => {
    this.getNotes()
  }

  textContent = (): string => {
    const content = this.inputForm.current?.value || ''
    if (this.inputForm.current?.value) {
      this.inputForm.current.value = ''
    }
    return content
  }

  updateNoteList = (): void => {
    this.getNotes()
  }

  removeNote = (id: number) => {
    fetch(`${this.url}/notes/${id}`, {
      method: 'DELETE'
    })
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
    const content = this.textContent()
    if (content) {
      fetch(`${this.url}/notes`, {
        method: 'POST',
        body: JSON.stringify({
          "id": ++this.id,
          "content": content
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(() => {
        this.getNotes()
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
  }

  render() {
    return (
      <>
        <div className='title-container'>
          <div className='title'>Notes</div>
          <button className='reset-button' ref={this.reloadButton} onClick={this.updateNoteList}></button>
        </div>
        <div className='notes-container'>
          {this.state.notes.map(note => {
            return(
              <Note 
              key={note.id} 
              items={note} 
              removeHandler={() => this.removeNote(note.id)}
              />
            )
          })}
        </div>
        <AddForm inputRef={this.inputForm} handler={this.postNote}/>
      </>
      
    )
  }
}
