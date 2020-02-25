import React, { Component } from 'react'
import Dialog from '../components/Dialog.js'

export default class DialogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false
    }
  }


  render() {
    const { showDialog } = this.state;

    return (
      <div>
        <h3>DialogPage</h3>
        <button onClick={() => this.setState({ showDialog: !showDialog })}>弹窗</button>`

        {
          showDialog && <Dialog>
            我是一段文本信息
          </Dialog>
        }
      </div>
    )
  }
}
