"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["imgSrc", "imgList", "mask"], _this.config = {
      navigationBarTitleText: '广告预览'
    }, _this.onClick = function (e, item) {
      var imgUrl = item.currentTarget.dataset.eTapAA.url;
      _this.setState({
        imgSrc: imgUrl
      });
      _this.showMask(imgUrl);
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).apply(this, arguments);

      this.state = {
        imgSrc: 'http://invitecard-1253442168.image.myqcloud.com/sharecard_tmp/2019-4-5/1554468983_1a277fade9b09ff199d377880f04137f.jpg',
        imgList: [{
          'url': 'http://invitecard-1253442168.image.myqcloud.com/sharecard_tmp/2019-4-5/1554475555_14221cb40de9b78da775602fc2f19d48.jpg',
          isShow: true
        }, {
          'url': 'http://invitecard-1253442168.image.myqcloud.com/sharecard_tmp/2019-4-5/1554475567_79b0ebcd29004061dc0511df55fe44d1.jpg',
          isShow: false
        }, { 'url': 'http://invitecard-1253442168.image.myqcloud.com/sharecard_tmp/2019-4-5/1554475577_3bd0b2fbc81292154d5e2c8e3fc9c6e1.jpg',
          isShow: false }],
        mask: ''
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "showMask",
    value: function showMask(imgUrl) {
      this.state.imgList.map(function (item, index) {
        item.url === imgUrl ? item.isShow = true : item.isShow = false;
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __runloopRef = arguments[2];
      ;

      var _state = this.__state,
          imgSrc = _state.imgSrc,
          imgList = _state.imgList,
          mask = _state.mask;


      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {}, _class.$$events = ["onClick"], _temp2);
exports.default = Index;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));