export default (state = {
  isPack:false,
  nodes:[],
  openKeys:[],
  panes: [
    { title: '首页', url: './main', key: 'tab1', menuKey: 'tab1' },
    //{ title: 'tab2复刻', url: './tab2', key: 'tab2123', menuKey: 'tab2' },
    //{ title: 'tab2下钻', url: './tab2', key: 'tab21232', menuKey: '' },
  ],
  activeKey: "tab1",
  breadCrumb: {key: "", items:[]},
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
      var activeKey = action.state.activeKey,openKeys = [], thisKey = "", breadCrumb = {};
      for(var i = 0;i < state.panes.length;i ++){
        const pane = state.panes[i];
        if(activeKey === pane.key){
            thisKey = pane.menuKey;
            activeKey = pane.menuKey;
            break;
        }
      }
      if(thisKey != ""){
        var items = [],_node = null;
        while(!!!_node || (_node.level >0 && _node.pkey != "")){
          _node = _.filter(state.nodes, { key: thisKey })[0] || {};
          if(thisKey == ""){ break; }
          openKeys.push(_node.pkey);
          items.unshift({title: _node.title,url: "#"});
          thisKey = _node.pkey;
        }
        breadCrumb = {key: action.state.activeKey, items : items};
      }
      return Object.assign({} ,state, {activeKey: activeKey, openKeys: openKeys, breadCrumb: breadCrumb});
    case 'REMOVE_TAB':
      return Object.assign({} ,state, action.state);
    case 'SELECT_NODE':
      var tempNodes = state.nodes;
      var node = _.filter(tempNodes, { title: action.state })[0] || {};
      var openKeys = [];
      var _node = node;
      while(_node.level >0 && _node.pkey != ""){
        _node = _.filter(tempNodes, { key: _node.pkey })[0] || {};
        openKeys.push(_node.key);
      }
      if(!!node.url){
        var arrPanes = _.filter(state.panes, { title: action.state }),panes = state.panes;

        if(arrPanes.length > 0){
          return Object.assign({} ,state,{activeKey: node.key, openKeys: openKeys});
        }else{
          tempNodes.map(function(node) {
            if(node.title == action.state){
              panes.push({ title: node.title, url: node.url, key: node.key })
            }
          })
          return Object.assign({} ,state,{activeKey: node.key, openKeys: openKeys, panes: panes});
        }
      }else{
        openKeys.push(node.key);
        return Object.assign({} ,state,{openKeys: openKeys});
      }
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
      alert("退出");
      window.location.href = "http://www.baidu.com";
      //return Object.assign({} ,state, action.state);
    case 'INIT':
      return Object.assign({} ,state, action.state);
    default:
      return state;
  }
};
