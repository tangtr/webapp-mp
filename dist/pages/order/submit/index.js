"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class, _class2, _temp2;

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../npm/@tarojs/redux/index.js");

var _actionCreators = require("../store/actionCreators.js");

var actions = _interopRequireWildcard(_actionCreators);

var _lodash = require("../../../npm/lodash/lodash.js");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubmitOrder = (_dec = (0, _index3.connect)(function (state) {
  return state.user;
}, actions), _dec(_class = (_temp2 = _class2 = function (_BaseComponent) {
  _inherits(SubmitOrder, _BaseComponent);

  function SubmitOrder() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SubmitOrder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SubmitOrder.__proto__ || Object.getPrototypeOf(SubmitOrder)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["imgUrl", "activityName", "product", "appointmentDate", "activityProductId", "dispatchCreateOrder", "dispatchQueryProductInfo", "dispatchDownLoadUrl"], _this.config = {
      navigationBarTitleText: '发起订单'
    }, _this.handleAlert = function (type, message) {
      _index2.default.atMessage({
        'message': message,
        'type': type
      });
    }, _this.onDateChange = function (e) {
      _this.setState({
        appointmentDate: e.detail.value
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SubmitOrder, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(SubmitOrder.prototype.__proto__ || Object.getPrototypeOf(SubmitOrder.prototype), "_constructor", this).apply(this, arguments);
      this.state = {
        imgUrl: '',
        appointmentDate: '',
        activityProductId: '',
        product: {}
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "handleSubmitOrder",
    value: function handleSubmitOrder() {
      var _state = this.state,
          activityProductId = _state.activityProductId,
          appointmentDate = _state.appointmentDate;

      if (_lodash2.default.isEmpty(appointmentDate)) {
        this.handleAlert('error', '请选择预约时间!');
        return;
      }
      var payload = {
        activityProductId: activityProductId,
        appointmentDate: appointmentDate
      };
      this.props.dispatchCreateOrder(payload).then(function (response) {
        console.log(response);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var payload = {
        productId: this.$router.params.productId
      };
      this.setState({
        activityProductId: this.$router.params.productId,
        activityName: this.$router.params.activityName
      });

      this.props.dispatchQueryProductInfo(payload).then(function (response) {
        _this2.setState({
          product: response.content
        });
        console.log('response.content.location', response.content.location);
        _this2.getImgUrl(response.content.location).then(function (response) {
          console.log('response getImgUrl', response);
          _this2.setState({
            imgUrl: response
          });
        });
      });
      console.log('productList', this.props);
      // console.log('this.$router.params.productId componentDidMount',this.$router.params.productId);
    }
  }, {
    key: "getImgUrl",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(location) {
        var payload, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = {
                  location: location
                };
                _context.next = 3;
                return this.props.dispatchDownLoadUrl(payload);

              case 3:
                result = _context.sent;
                return _context.abrupt("return", result.content);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getImgUrl(_x) {
        return _ref2.apply(this, arguments);
      }

      return getImgUrl;
    }()
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __runloopRef = arguments[2];
      ;

      var _state2 = this.__state,
          product = _state2.product,
          activityName = _state2.activityName,
          imgUrl = _state2.imgUrl;

      Object.assign(this.__state, {
        activityName: activityName
      });
      return this.__state;
    }
  }]);

  return SubmitOrder;
}(_index.Component), _class2.properties = {
  "dispatchCreateOrder": {
    "type": null,
    "value": null
  },
  "dispatchQueryProductInfo": {
    "type": null,
    "value": null
  },
  "dispatchDownLoadUrl": {
    "type": null,
    "value": null
  }
}, _class2.$$events = ["onDateChange", "handleSubmitOrder"], _temp2)) || _class);
exports.default = SubmitOrder;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(SubmitOrder, true));