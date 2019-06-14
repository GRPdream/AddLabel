import React from 'react';
import Search from "./Search"
import Edit from "./Edit"
import Create from "./Create"
import Delete from "./Delete"
import {Tag,Button,Icon} from 'antd';
import  {CSSTransition}  from 'react-transition-group'

export default class Addlabel extends React.Component{
  constructor() {
    super()
    this.state =  {
      labelList: [
        //{name: "紧急", color: "purple", close:false},
        //{name: "日常", color: "cyan", close:false, colorId:1},
      ],
      editFlag: false,
      comSwitch: 0,  //为 0 时是搜索界面，为 1 时是编辑界面,为 2 时是创建界面,为 3 时是删除确认界面
      editIndex: 0,  //记录当前正在编辑的标签序号
      leftDis: 0  //记录子界面应该距离左边框的值以实现字界面的移动
    }
  }

  handleclick(e) {  //标签编辑按钮
    e.preventDefault()
    this.setState({
      editFlag: true
    })
  }
 
  delete(index) {  //删除标签
    let tmp = [...this.state.labelList]
    tmp.splice(index,1)
    if(tmp.length === 0) {
      this.setState({
        labelList: tmp,
        editFlag: false,
        leftDis: 0,
      })
    }else {
      this.setState({
        labelList: tmp,
      },() => {
        let left = document.getElementById("Btn").getBoundingClientRect().left
        this.setState({
          leftDis:left,
        })
      })
    }
  }
  
  sonaddlabel(item) {  //添加标签
    let tmp = JSON.parse(JSON.stringify(this.state.labelList))
    tmp.push(item)
    this.setState({
      labelList: tmp
    },() => {
      if(document.getElementById("Btn") !== undefined) {
         let left = document.getElementById("Btn").getBoundingClientRect().left
         this.setState({
           leftDis:left,
         })
      }
    })
  }

  sonDelete(index) {  //删除标签
    this.delete(index)
  }
 
  sonEdit(index,item) {  //编辑标签
    let tmp = JSON.parse(JSON.stringify(this.state.labelList))
    tmp[index] = item
    this.setState({
      labelList: tmp,
    })
  }

  sonChangePage(value,index=-1) {
    let tmp = value
    if(index === -1) {
      this.setState({
        comSwitch: tmp
      })
    }else {
      this.setState({
        comSwitch: tmp,
        editIndex: index,
      })
    }
  }

  sonChangeFlag() {
    let tmp = !this.state.editFlag
    this.setState({
      editFlag: tmp
    })
  }

  mouseIn(index) {
    let tmp = [...this.state.labelList]
    tmp[index].close = true
    this.setState({
      labelList: tmp
    })
  }

  mouseOut(index) {
    let tmp = [...this.state.labelList]
    tmp[index].close = false
    this.setState({
      labelList: tmp
    })
  }

  renderSonPage() {
    const Switch = this.state.comSwitch
    if(Switch === 0) {
      return (<Search 
                labelList={this.state.labelList}
                leftDistance={this.state.leftDis}
                addLabel={this.sonaddlabel.bind(this)}
                changePage={this.sonChangePage.bind(this)} 
              />)
    }else if(Switch === 1) {
      return (<Edit
                leftDistance={this.state.leftDis}
                index={this.state.editIndex}
                item={this.state.labelList[this.state.editIndex]}
                edit={this.sonEdit.bind(this)}
                changePage={this.sonChangePage.bind(this)}
                changeFlag={this.sonChangeFlag.bind(this)}
                />)
    }else if(Switch === 2){
      return (<Create
                leftDistance={this.state.leftDis}
                addLabel={this.sonaddlabel.bind(this)}
                changePage={this.sonChangePage.bind(this)}
                />)
    }else {
      return (<Delete 
                leftDistance={this.state.leftDis}
                index={this.state.editIndex}
                delete={this.sonDelete.bind(this)}
                changePage={this.sonChangePage.bind(this)}
                changeFlag={this.sonChangeFlag.bind(this)}
                />)
    }
  }

  render() {
    return (
      <div className="container">
        {
          this.state.labelList.length===0
            ?
            <a href='https://github.com/' className="defaultLabel" onClick={this.handleclick.bind(this)}>添加标签</a>
            :
            <ul style={{padding:"0",marginBottom:"5px"}}>
            { this.state.labelList.map((items,index) => 
              <Tag 
                color={items.color} 
                key={index} 
                style={{borderRadius:"20px",fontSize:"15px",transition:"all 1s ease"}} 
                onMouseEnter={this.mouseIn.bind(this,index)}
                onMouseLeave={this.mouseOut.bind(this,index)}
                >
                {items.name}
                {items.close && <CSSTransition in={items.close} timeout={1000} classNames="btnAni">
                                  <Button 
                                    type="link" 
                                    icon="close-circle" 
                                    style={{padding:"0 2px",color:"#aaa",height:"20px"}} 
                                    onClick={this.delete.bind(this,index)}/>
                                </CSSTransition>}
              </Tag>
            )}
            <Button id="Btn" type="link" style={{color:"#aaa",padding:"0 5px"}} onClick={this.handleclick.bind(this)}>
              <Icon type="plus-circle" theme="filled" />
            </Button>
            </ul>
        }
        {this.state.editFlag
          && 
          this.renderSonPage()
          }
      </div>
    )
  }
}