import Taro, { Component } from '@tarojs/taro'
import { View,Text,Picker, PickerView, PickerViewColumn,AtButton  } from '@tarojs/components'
import { AtImagePicker,AtInput,AtMessage,AtModal,
   AtModalHeader, AtModalContent, AtModalAction, AtToast } from 'taro-ui'
import ProductList from './productlist/index';
import {connect} from '@tarojs/redux';
import * as actions from '../store/actionCreators';
import {getAuthInfo} from './../../../utils/storage';
var productIds = [];
var uploadImage = require('./../../../utils/uploadFile.js');
var util = require('../../../utils/util.js');
import './index.scss'

@connect(state=>state.user,actions)
export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      files:[],
      selector: [['请选择', '美国', '中国', '巴西', '日本'], ['请选择', '美国', '中国', '巴西', '日本       ']],
      selectorChecked: '请选择',
      groupItemChecked:'请选择',
      groupItem:[],
      dateStart: '请选择',
      dateEnd: '请选择',
      products:[],
      activeName: '',
      weChatNumber:'',
      isOpened:false,
      location:[]
    };
    this.init();
  }

  componentWillMount () {
    var productList = [];

    console.log('this.$router.params.ids',this.$router.params.ids);
    if(this.$router.params.ids != undefined){
       productIds = this.$router.params.ids.split(',');
    }
      
    if(productIds.length>0){

        productIds.map((item,index)=>{
          console.log('item',item);
          var payload = {
            productId:item
          };
          this.props.dispatchQueryProductInfo(payload).then((res)=>{
            if(res.result === "success"){
              console.log('res.content',res.content);

              productList.push(res.content);

              this.setState({
                products:productList
              })
            }
          })
        });

    }
  }

  componentDidMount(){
    // const result = await getAuthInfo();
    // this.setState({
    //   weChatNumber:result.wechatId
    // })
  }

  init(){
    this.initGroup();
  }

  initGroup(){
    var groups = [];
    for(var i =1; i<15; i++){
      groups.push(i);
    }
    this.setState({
      groupItem: groups
    });
  }

  HandlePickerChange (files){
    console.log('files',files);
    
    if(files.length > 0){
      // this.handleUploadLoader(files);
    }
  }

  choose(){
    var that = this;
    wx.chooseImage({
        count: 1, // 默认最多一次选择9张图
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res){
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          var nowTime = util.formatTime(new Date());

          //支持多图上传
          for (var i = 0; i < res.tempFilePaths.length; i++) {
              //显示消息提示框
              wx.showLoading({
                title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
                mask: true
              });

              let file = res.tempFilePaths[i];

              var payload ={
                documentType:'ACTIVITY',
                fileName:'ACTIVITY.png'
              };

              that.props.dispatchUploadConfig(payload).then((response)=>{
                console.log('dispatchUploadConfig',response.content.location);
                  //上传图片
                  //图片路径可自行修改
                  uploadImage(file, response.content.location,
                    function (result) {
                      that.setState({
                        location:[result]
                      });
                      console.log("======上传成功图片地址为：", result);
                      wx.hideLoading();
                    }, function (result) {
                      console.log("======上传失败======", result);
                      wx.hideLoading()
                    }
                  )
              });
          }
        }
    })
  }

  handleUploadLoader = () =>{

    var payload = {
      documentType:'PRODUCT',
      fileName:'name'
    };

    this.props.dispatchUploadFile(payload).then((res)=>{
      console.log('res',res);
    })
    return;
  }

  handlePickerViewChange(e){
    const val = e.detail.value;
    console.log("val",val);
  }

  handlePickerChange(e){
    let selectedValue = `${this.state.selector[0][e.detail.value[0]] } / ${this.state.selector[0][e.detail.value[1]]}`;
    this.setState({
      selectorChecked:selectedValue
    });
  }

  handlePickerSelectGroupChange(e){
    this.setState({
      groupItemChecked:parseInt(e.detail.value)+1
    })
  }

  handlePickerColumnChange(e){
    console.log('e',e);
  }

  handleToUpload(){
    console.log('handleToUpload');
  }

  onDateStartChange = e =>{
    this.setState({
      dateStart:e.detail.value
    })
  }

  handleAlert(type,message){
    Taro.atMessage({
      'message': message,
      'type': type
    });
  }

  async onPublish(e){
    const {activeName,groupItemChecked,dateStart,dateEnd,location,weChatNumber} = this.state;

    if(activeName === ''){
      this.handleAlert('error','请填写活动名称')
      return;
    }
    if(groupItemChecked === '请选择'){
        this.handleAlert('error','请选择成团人数')
        return;
    }
    if(dateStart == '请选择'){
      this.handleAlert('error','请选择开始时间')
      return;
    }
    if(dateEnd == '请选择'){
      this.handleAlert('error','请选择结束时间')
      return;
    }
    if(location.length <= 0){
      this.handleAlert('error','请选择上传主图')
      return;
    }

    var fileArray = [];
    
    const result = await getAuthInfo();

    let payload =  {
      "areaCode": "string",
      "docLocations": this.state.location,
      "endD":dateEnd,
      "id": 0,
      "name": activeName,
      "people": groupItemChecked,
      "productIds": productIds,
      "startD": dateStart,
      "userId": result.id,
      "wechatId": weChatNumber
    };

    if(result.wechatId === 0 || result.wechatId === null){
      this.setState({
        isOpened:true
      })
      return;
    }

    console.log('payload',payload);

    this.props.dispatchCreateActive(payload).then((res)=>{
      console.log('res',res);
      if(res && res.result === "success"){
        Taro.navigateTo({
          url:'/pages/active/share/index'
        })
      }else{
        this.handleAlert('error','发布活动失败');
      }
    })
  }

  handleActiveChange(activeName){
    this.setState({
      activeName
    })
    return activeName
  }

  onDateEndChange = e => {
    this.setState({
      dateEnd: e.detail.value
    });
  }

  createProduct(){
    Taro.navigateTo({
      url:'/pages/product/add'
    })
  }

  handleWeChatChange(weChatNumber){
    this.setState({
      weChatNumber
    })
    return weChatNumber
  }

  handleCancel(){
    this.setState({
      isOpened:false
    })
  }

  handleConfirm(){
    this.setState({
      isOpened:false
    })
  }

  config = {
    navigationBarTitleText: '新增活动'
  }

  render () {
    const {activeName,dateEnd,dateStart,products,weChatNumber,isOpened} = this.state;

    return (
      <View className="mp-active">
        <AtMessage/>
        <View className="item">
            <Text>活动名称</Text>
            <AtInput border={false} 
            value={activeName}
            onChange={this.handleActiveChange.bind(this)}
            placeholder="请输入活动名称" />
        </View> 

        <View className="item">
            <Picker mode='selector' range={this.state.groupItem} 
            onChange={this.handlePickerSelectGroupChange}>
                  <View className='picker'>
                    <Text className="mp-publish mp-icon-arrow" ></Text> <Text>成团人数</Text> 
                    <Text className="time"> {this.state.groupItemChecked} </Text>  
                  </View>
            </Picker>
        </View>

        <View className="item">
            <Picker mode='date' onChange={this.onDateStartChange}>
                <View className='picker'>
                  <Text className="mp-publish mp-icon-arrow" ></Text> <Text>开始时间</Text> 
                  <Text className="time">{dateStart}</Text>  
                </View>
            </Picker>
        </View>

        <View className="item">
            <Picker mode='date' onChange={this.onDateEndChange}>
                <View className='picker'>
                 <Text className="mp-publish mp-icon-arrow" ></Text> <Text>结束时间</Text>  
                 <Text className="time">  {dateEnd}</Text>  
                </View>
            </Picker>
        </View>

        <AtImagePicker
          className="uploadImage"
           files={this.state.files}
           onChange={this.HandlePickerChange.bind(this)}
        />

       <AtButton type='primary' onClick={this.choose}>上传图片</AtButton>

       
        <ProductList products={products}/>

        <View className="publish">
            <View onClick={this.onPublish}>立即发布</View>
        </View>

      <AtModal isOpened={isOpened}>
        <AtModalHeader>完善信息</AtModalHeader>
        <AtModalContent>
            <AtInput  placeholder='请输入微信号'   onChange={this.handleWeChatChange.bind(this)} value={weChatNumber}/>
        </AtModalContent>
        <AtModalAction> 
          <Button onClick={this.handleCancel}>取消</Button> 
          <Button onClick={this.handleConfirm}>确定</Button>
        </AtModalAction>
      </AtModal>

      </View>
    )
  }
}
