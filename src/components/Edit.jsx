import React from 'react';
import {Input,Button} from 'antd';

export default class Edit extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value: 1,
      colorList: ["#1890ff","lightgreen","#00CDCD","#7B68EE","#FFC125","#FF4500"],
    }
  }

  componentDidMount() {
    let a = "check" + this.props.item.colorId
    document.getElementById(a).setAttribute("checked","true")
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  backBtn() {
    this.props.changePage(0)
  }
  
  closeBtn() {
    this.props.changeFlag()
    this.props.changePage(0)
  }

  deleteBtn() {
    this.props.changePage(3,this.props.index)
  }

  editBtn() {
    if(document.getElementById('inputValue').value !== "") {
      let value = document.getElementById('inputValue').value
      let tmp = JSON.parse(JSON.stringify(this.props.item))
      tmp.name = value
      tmp.colorId = this.state.value
      tmp.color = this.state.colorList[tmp.colorId-1]
      this.props.edit(this.props.index,tmp)
      this.props.changePage(0)
    }else{
      alert("标签名不能为空")
    }
  }

  render(){
    return (
      <div className="wrap" style={{marginLeft:this.props.leftDistance}}>
        <p className="header">
          <Button type="link"  icon="left" style={{color:"#aaa"}} onClick={this.backBtn.bind(this)}/>
          <span>编辑标签</span>
          <Button type="link"  icon="close" style={{color:"#aaa"}} onClick={this.closeBtn.bind(this)}/>
        </p>
        <hr style={{margin:"2px 0"}}/>
        <div className="createPage">
          <Input defaultValue={this.props.item.name} autoFocus="autofocus" id="inputValue"/>
          <span className="checkBox" onChange={this.onChange} value={this.props.value}>
            <input type="radio"className="Checkbox" name="radio" id="check1" value={1}/>
            <label htmlFor="check1" style={{backgroundColor:"#1890ff",left:"0px"}}></label>
            <input type="radio"className="Checkbox" name="radio" id="check2" value={2}/>
            <label htmlFor="check2" style={{backgroundColor:"lightgreen",left:"30px"}}></label>
            <input type="radio"className="Checkbox" name="radio" id="check3" value={3}/>
            <label htmlFor="check3" style={{backgroundColor:"#00CDCD",left:"60px"}}></label>
            <input type="radio"className="Checkbox" name="radio" id="check4" value={4}/>
            <label htmlFor="check4" style={{backgroundColor:"#7B68EE",left:"100px"}}></label>
            <input type="radio"className="Checkbox" name="radio" id="check5" value={5}/>
            <label htmlFor="check5" style={{backgroundColor:"#FFC125",left:"130px"}}></label>
            <input type="radio"className="Checkbox" name="radio" id="check6" value={6}/>
            <label htmlFor="check6" style={{backgroundColor:"#FF4500",left:"160px"}}></label>
          </span>
          <span>
            <Button type="danger" ghost="true" onClick={this.deleteBtn.bind(this)}>删除</Button>
            <Button type="primary" onClick={this.editBtn.bind(this)} style={{marginLeft: "20px"}}>完成</Button>
          </span>
        </div>
      </div>
    )
  }
}