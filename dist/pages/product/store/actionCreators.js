"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchActiveInfo = exports.dispatchDownLoadUrl = exports.dispatchUploadConfig = exports.dispatchCreateProduct = exports.dispatchProductList = undefined;

var _constants = require("./constants.js");

var _redux = require("../../../utils/redux.js");

var _api = require("../../../constants/api.js");

var dispatchProductList = exports.dispatchProductList = function dispatchProductList(payload) {
  return (0, _redux.createAction)({
    type: _constants.ACTION_PRODUCT_LIST,
    url: _api.API_PRODUCT_OWNER,
    fetchOptions: {
      method: 'GET'
    },
    payload: payload
  });
};

var dispatchCreateProduct = exports.dispatchCreateProduct = function dispatchCreateProduct(payload) {
  return (0, _redux.createAction)({
    type: _constants.ACTION_PRODUCT_CREATE,
    url: _api.API_PORDUCT_CREATE,
    fetchOptions: {
      method: 'POST'
    },
    payload: payload
  });
};

var dispatchUploadConfig = exports.dispatchUploadConfig = function dispatchUploadConfig(payload) {
  return (0, _redux.createAction)({
    type: _constants.ACTION_UPLOAD_CONFIG,
    url: _api.API_UPLOAD_CONFIG,
    fetchOptions: {
      method: 'GET'
    },
    payload: payload
  });
};

var dispatchDownLoadUrl = exports.dispatchDownLoadUrl = function dispatchDownLoadUrl(payload) {
  return (0, _redux.createAction)({
    type: _constants.ACTION_UPLOAD_DOWN,
    url: _api.API_UPLOAD_FILE,
    fetchOptions: {
      method: 'GET'
    },
    payload: payload
  });
};

var dispatchActiveInfo = exports.dispatchActiveInfo = function dispatchActiveInfo(payload) {
  return (0, _redux.createAction)({
    type: _constants.ACTIVE_INFO_ACTION,
    url: _api.API_ACTIVE_INFO,
    fetchOptions: {
      method: 'GET'
    },
    payload: payload
  });
};