import React from 'react';
import {Input,Icon,Button} from 'antd';

export default class Search extends React.Component{
  constructor(props) {
    super(props)
    this.state =  {
      list: this.props.labelList,
      //   [
      //   {name: "紧急", color: "#7B68EE",close:false,colorId:4},
      // ],
      value: 1,
      leftDis: 0,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      list: this.props.labelList
    })
  }

  editBtn(index,e) {
    e.stopPropagation()
    this.props.changePage(1,index)
  }

  liClick(index) {
    this.props.addLabel(this.state.list[index])
  }

  inputChange() {
    this.props.changePage(2)
  }

  strHandel(str) {
    if(str.length > 2) {
      return (str.slice(0,2) + "···")
    }else {
      return str
    }
  }

  render() {
    return (
      <div className="wrap" style={{marginLeft:this.props.leftDistance}}>
        <Input
          onChange={this.inputChange.bind(this)}
          placeholder="搜索标签"
          suffix={
            <Icon type="plus-circle" style={{ color: '#1E90FF' }} />
          }
        />
        <ul className="expandUl">
          { this.state.list.map((items,index) => 
              <li key={index} onClick={this.liClick.bind(this,index)}>
                <div style={{display:"inline-block",width:"10px",height:"10px",borderRadius:"50%",backgroundColor:items.color}}></div>
                <span style={{paddingLeft:"5px"}}>{this.strHandel(items.name)}</span>
                <Button type="link"  icon="edit" style={{marginLeft:"75px"}} onClick={this.editBtn.bind(this,index)}/>
              </li>
            )}
        </ul>
      </div>
    )
  }
}