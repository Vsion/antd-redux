import * as Messages from 'svc2Src/components/Message/Message';
import * as Notification from 'svc2Src/components/Notification/Notification';

const changeActiveKey = (activeKey, state)  =>  {
  var openKeys = [], thisKey = "", breadCrumb = {};
  for(var i = 0;i < state.panes.length;i ++){
    const pane = state.panes[i];
    if(activeKey === pane.key){
        thisKey = pane.menuKey;
        activeKey = pane.menuKey;
        break;
    }
  }
  if(thisKey != ""){
    let tempRes = getBreadCrumb(state.nodes, activeKey);
    breadCrumb = tempRes.breadCrumb;
    openKeys = tempRes.openKeys
  }
  return Object.assign({} ,state, {activeKey: activeKey, openKeys: openKeys, breadCrumb: breadCrumb});
}
const getBreadCrumb = (nodes, activeKey) => {
  var items = [],_node = null, thisKey = activeKey, openKeys = [];
  while(!!!_node || (_node.level >0 && _node.pkey != "")){
    _node = _.filter(nodes, { key: thisKey })[0] || {};
    if(thisKey == ""){ break; }
    openKeys.push(_node.pkey);
    items.unshift({title: _node.title,url: "#"});
    thisKey = _node.pkey;
  }
  return {
    breadCrumb: {key: activeKey, items : items},
    openKeys: openKeys,
  };
}
export default (state = {
  isPack:false,
  nodes:[],
  openKeys:[],
  panes: [
    { title: 'React版模态选择框', url: './RModalSelect', key: 'RModalSelect', menuKey: 'RModalSelect' },
    //{ title: 'tab2复刻', url: './tab2', key: 'tab2123', menuKey: 'tab2' },
    //{ title: 'tab2下钻', url: './tab2', key: 'tab21232', menuKey: '' },
  ],
  activeKey: "RModalSelect",
  breadCrumb: {key: "RModalSelect", items:[{title: "首页", url: "#"}]},
}, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return Object.assign({} ,state,
          { isPack : action.state.isPack }
        );
    case 'SET_OPENKEYS':
      return Object.assign({} ,state,
          { openKeys : action.state.openKeys }
        );
    case 'SET_ACTIVEKEY':
      var panes = state.panes,pane = {},b = true,breadCrumb = state.breadCrumb;
      for(var i = 0; i < panes.length; i++){
        pane = panes[i];
        if(pane.menuKey == action.state.activeKey){
          b = false;
          break;
        }
      }
      state.nodes.map(function(node) {
        if(node.key == action.state.activeKey){
          var date = new Date();
          const key = node.key + date.getTime().toString();
          if(b){
            panes.push({ title: node.title, url: node.url, key: key, menuKey: node.key });
          }
          var items = [],thisKey = action.state.activeKey,_node = null;
          while(!!!_node || (_node.level >0 && _node.pkey != "")){
            _node = _.filter(state.nodes, { key: thisKey })[0] || {};
            if(thisKey == ""){ break; }
            items.unshift({title: _node.title,url: "#"});thisKey = _node.pkey;
          }
          breadCrumb = {key: key, items : items};
        }
      })
      return Object.assign({} ,state,
          { activeKey : action.state.activeKey, panes: panes, breadCrumb: breadCrumb }
        );
    case 'CHANGE_ACTIVEKEY':
      return changeActiveKey(action.state.activeKey, state);
    case 'REMOVE_TAB':
      return Object.assign({} ,state, action.state);
    case 'SELECT_NODE':debugger;
      var allNodes = _.clone(state.nodes),
      node = _.filter(allNodes, { title: action.state })[0] || {},
      openKeys = [],
      _node = _.clone(node),
      res = null;
      //获取openKeys
      while(_node.level > 0 && _node.pkey != ""){
        _node = _.filter(allNodes, { key: _node.pkey })[0] || {};
        openKeys.push(_node.key);
      }
      //判断是否存在node.url 确定是多级菜单/子页面链接菜单
      //todo
      if(!!node.url){
        var arrPanes = _.filter(state.panes, { title: action.state }),panes = state.panes;
        if(arrPanes.length > 0){
          res = Object.assign({} ,state,{activeKey: node.key, openKeys: openKeys});
        }else{
          allNodes.map(function(node) {
            if(node.title == action.state){
              panes.push({ title: node.title, url: node.url, key: node.key, menuKey: node.key })
            }
          })
          res = Object.assign({} ,state,{activeKey: node.key, openKeys: openKeys, panes: panes, breadCrumb: getBreadCrumb(allNodes, node.key).breadCrumb});
        }
      }
      else{//多级菜单 展开菜单即可
        openKeys.push(node.key);
        res = Object.assign({} ,state,{openKeys: openKeys});
      }
      return res;
    case 'SET_BREADCRUMB':
      return Object.assign({} ,state, action.state);
    case 'DEEP_LINKTO':
      var items = state.breadCrumb.items, key = action.state, title = "", url = "";
      for(var i = 0;i < state.nodes;i ++){
        var node = state.nodes[i];
        if(node.key == key){
          title = node.title;url = node.url;
          items.push({title: node.title, url: "#"});
          break;
        }
      }
      return Object.assign({} ,state,
        {
          panes: { title: title, url: title, key: key, menuKey: '' },
          breadCrumb: {key: key, items:items},
        });
    case 'LOG_OUT':
      window.location.href = "./login";
      //return Object.assign({} ,state, action.state);
    case 'INIT':
      return Object.assign({} ,state, action.state);
    case 'INFO_MESSAGE':
      Messages.infoMessage(action.state);
      return state;
    case 'OPEN_NOTIFICATION':
      Notification.openNotificationWithIcon(action.state.type, action.state.description, action.state.message);
      return state;
    case 'OPEN_NOTIFICATIONNOCLOSE':
      Notification.openNotification(action.state.message, action.state.description, action.state.func);
      return state;
    default:
      return state;
  }
};
