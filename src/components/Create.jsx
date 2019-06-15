import React from 'react';
import {Input,Button,Icon} from 'antd';

export default class Create extends React.Component{
  constructor(){
    super()
    this.state = {
      value: 1,
      colorList: ["#1890ff","lightgreen","#00CDCD","#7B68EE","#FFC125","#FF4500"],
    }
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  create() {
    if(document.getElementById("inputValue").value !== "") {
      let tmp = {
        name: document.getElementById("inputValue").value,
        colorId: this.state.value,
        color: this.state.colorList[this.state.value-1],
        close: false
      }
      this.props.addLabel(tmp)
      this.props.changePage(0)
    }else{
      alert("标签名称不能为空")
    }
  }

  render() {
    return (
      <div className="wrap" style={{marginLeft:this.props.leftDistance}}>
        <Input
          id="inputValue"
          autoFocus="autofocus"
          placeholder="创建标签"
          suffix={
            <Icon type="plus-circle" style={{ color: '#1E90FF' }} />
          }
        />
        <hr style={{margin:"10px 0 0 0"}}/>
        <div className="createPage">
          <span className="checkBox" onChange={this.onChange} value={this.state.value}>
            <input type="radio"className="Checkbox" name="radio" id="check1" value={1} defaultChecked/>
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
          <Button type="primary" style={{width:"100%"}} onClick={this.create.bind(this)}>创建</Button>
        </div>
      </div>
    )
  }
}