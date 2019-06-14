import React from 'react';
import {Button} from 'antd';

export default class Delete extends React.Component{
  backBtn() {
    this.props.changePage(1,this.props.index)
  }
  
  closeBtn() {
    this.props.changeFlag()
    this.props.changePage(0)
  }

  delete() {
    this.props.delete(this.props.index)
    this.props.changePage(0)
  }

  render() {
    return (
      <div className="wrap" style={{marginLeft:this.props.leftDistance}}>
        <p className="header">
          <Button type="link"  icon="left" style={{color:"#aaa"}} onClick={this.backBtn.bind(this)}/>
          <span>删除标签</span>
          <Button type="link"  icon="close" style={{color:"#aaa"}} onClick={this.closeBtn.bind(this)}/>
        </p>
        <hr style={{margin:"5px 0 5px 0"}}/>
        <p style={{padding:"10px 0 0 10px",marginBottom:"35px"}}>确认删除标签？</p>
        <Button type="danger" block style={{backgroundColor:"red",color:"white"}} onClick={this.delete.bind(this)}>删除</Button>
      </div>
    )
  }
}